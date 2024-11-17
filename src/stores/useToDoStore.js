import { defineStore } from 'pinia';
import { ref, computed, watchEffect } from 'vue';
import http from '@/http';
import { useAuthStore } from './useAuthStore';
import { useShowLoadingModalStore } from '@/stores/useShowLoadingModalStore';
import { useShowErrorModalStore } from '@/stores/useShowErrorModalStore';

export const useToDoStore = defineStore('todo', () => {
    // State
    const todoItems = ref([]);
    const newTodoTitle = ref('');
    const newTodoPriority = ref(false);
    const orderByCompleted = ref(false);

    // Modal stores
    const loadingModalStore = useShowLoadingModalStore();
    const errorModalStore = useShowErrorModalStore();
    const authStore = useAuthStore();

    // Computed ordered list of todo items
    const orderedTodoItems = computed(() => {
        return todoItems.value.slice().sort((a, b) => {
            // First, sort by priority (true > false)
            if (a.isPriority !== b.isPriority) {
                return a.isPriority ? -1 : 1;  // Higher priority first
            }

            // If priorities are equal, then sort by completion status
            if (orderByCompleted.value) {
                return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? -1 : 1;
            } else {
                return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
            }
        });
    });

    // Actions
    const fetchTodoItems = async () => {
        if (!authStore.isAuthenticated) {
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Authentication Error';
            errorModalStore.errorModalMessage = 'You must be logged in to view the todo list';
            loadingModalStore.showLoadingModal = false;
            return;
        }

        let loadingTimeout;
        try {
            loadingTimeout = setTimeout(() => {
                loadingModalStore.showLoadingModal = true;
            }, 500);

            const response = await http.get('/api/TodoItems');
            todoItems.value = response.data;
        } catch (error) {
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Fetch Error';
            errorModalStore.errorModalMessage = 'Failed to load todo items';
        } finally {
            if (loadingTimeout) clearTimeout(loadingTimeout);
            loadingModalStore.showLoadingModal = false;
        }
    };

    const addTodoItem = async () => {
        if (!newTodoTitle.value.trim()) {
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Validation Error';
            errorModalStore.errorModalMessage = 'Please enter a valid task title';
            return;
        }

        try {
            const newTodo = { title: newTodoTitle.value, isCompleted: false, isPriority: newTodoPriority };
            await http.post('/api/TodoItems', newTodo);
            newTodoTitle.value = '';
            await fetchTodoItems();
        } catch (error) {
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Add Error';
            errorModalStore.errorModalMessage = 'Failed to add task';
        }
    };

    const toggleComplete = async (item) => {
        const initialStatus = item.isCompleted;
        const updatedItem = { ...item, isCompleted: !initialStatus };

        // Optimistically update the item locally
        const index = todoItems.value.findIndex(todo => todo.id === item.id);
        if (index !== -1) {
            todoItems.value[index].isCompleted = updatedItem.isCompleted;
            // if marking complete, it doesn't need to be priority
            todoItems.value[index].isPriority = updatedItem.isCompleted ? false : updatedItem.isPriority;
        }

        try {
            await http.put(`/api/TodoItems/${item.id}`, updatedItem);
        } catch (error) {
            // Revert the change if API call fails
            if (index !== -1) {
                todoItems.value[index].isCompleted = initialStatus;
            }
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Update Error';
            errorModalStore.errorModalMessage = 'Failed to update task';
        }
    };

    const togglePriority = async (item) => {
        const updatedItem = { ...item, isPriority: item.isPriority };

        const index = todoItems.value.findIndex(todo => todo.id === item.id);
        if (index !== -1) {
            todoItems.value[index].isPriority = updatedItem.isPriority;
        }

        try {
            await http.put(`/api/TodoItems/${item.id}`, updatedItem);
        } catch (error) {
            // Revert the change if API call fails
            if (index !== -1) {
                todoItems.value[index].isPriority = !item.isPriority;
            }
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Update Error';
            errorModalStore.errorModalMessage = 'Failed to update task';
        }
    }

    const deleteTodoItem = async (id) => {
        try {
            await http.delete(`/api/TodoItems/${id}`);
            await fetchTodoItems();
        } catch (error) {
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Delete Error';
            errorModalStore.errorModalMessage = 'Failed to delete task';
        }
    };

    // Automatically keep the ordered list updated
    watchEffect(() => {
        orderedTodoItems.value; // Triggered by computed property `orderedTodoItems`
    });

    return {
        todoItems,
        orderedTodoItems,
        newTodoTitle,
        newTodoPriority,
        orderByCompleted,
        fetchTodoItems,
        addTodoItem,
        toggleComplete,
        togglePriority,
        deleteTodoItem
    };
});
