import { ref, computed } from 'vue';
import http from '@/http';
import useAuthStore from './useAuthStore';
import useShowErrorModalStore from './useShowErrorModalStore'; // Import the modal store
import useShowLoadingModalStore from "@/stores/useShowLoadingModalStore";

export default function useTodoStore() {
    const { isAuthenticated } = useAuthStore();
    const { openErrorModal } = useShowErrorModalStore(); // Destructure modal triggering function from useModalStore
    const {  openLoadingModal, closeLoadingModal } = useShowLoadingModalStore();

    const todoItems = ref([]);
    const orderByCompleted = ref(false);
    const newTodoTitle = ref('');

    // Fetch todo items
    const fetchTodoItems = async () => {
        if (!isAuthenticated()) {
            openErrorModal('Authentication Error', 'You must be logged in to view todo items.');
            closeLoadingModal();
            return;
        }

        openLoadingModal();
        try {
            const response = await http.get('/api/TodoItems');
            todoItems.value = response.data;
        } catch (error) {
            openErrorModal('Fetch Error', 'Failed to load todo items. Please try again later.');
        } finally {
            closeLoadingModal();
        }
    };

    // Add a new todo item
    const addTodoItem = async () => {
        if (!newTodoTitle.value.trim()) {
            openErrorModal('Validation Error', 'Please enter a task title.');
            return;
        }

        try {
            const newTodo = { title: newTodoTitle.value, isCompleted: false };
            await http.post('/api/TodoItems', newTodo);
            newTodoTitle.value = '';
            await fetchTodoItems();
        } catch (error) {
            openErrorModal('Add Error', 'Failed to add the new task. Please try again later.');
        }
    };

    // Toggle the completion status of a todo item
    const toggleComplete = async (item) => {
        const updatedItem = { ...item, isCompleted: !item.isCompleted };
        try {
            await http.put(`/api/TodoItems/${item.id}`, updatedItem);
            await fetchTodoItems();
        } catch (error) {
            openErrorModal('Update Error', 'Failed to update the task. Please try again later.');
        }
    };

    // Delete a todo item
    const deleteTodoItem = async (id) => {
        try {
            await http.delete(`/api/TodoItems/${id}`);
            await fetchTodoItems();
        } catch (error) {
            openErrorModal('Delete Error', 'Failed to delete the task. Please try again later.');
        }
    };

    // Sort the todo items based on completion status
    const orderedTodoItems = computed(() => {
        return todoItems.value.slice().sort((a, b) => {
            if (orderByCompleted.value) {
                return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? -1 : 1;
            } else {
                return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
            }
        });
    });

    return {
        todoItems,
        orderByCompleted,
        newTodoTitle,
        fetchTodoItems,
        addTodoItem,
        toggleComplete,
        deleteTodoItem,
        orderedTodoItems,
    };
}
