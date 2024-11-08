import { watchEffect } from 'vue';
import http from '@/http';
import useToDoState from '@/state/useToDoState';
import useAuthStore from './useAuthStore';
import useShowLoadingModalState from "@/state/useShowLoadingModalState";
import useShowErrorModalState from "@/state/useShowErrorModalState";

let todoStore; // Singleton instance

export default function useToDoStore() {
    if (!todoStore) {
        const { todoItems, orderedTodoItems, orderByCompleted, newTodoTitle } = useToDoState();
        const { isAuthenticated } = useAuthStore();
        const { showLoadingModal } = useShowLoadingModalState();
        const { showErrorModal, errorModalTitle, errorModalMessage } = useShowErrorModalState();

        // Fetch todo items
        const fetchTodoItems = async () => {
            if (!isAuthenticated()) {
                showErrorModal.value = true;
                errorModalTitle.value = 'Authentication Error';
                errorModalMessage.value = 'You must be logged in to view the user list';
                showLoadingModal.value = false;
                return;
            }

            let loadingTimeout;
            try {
                loadingTimeout = setTimeout(() => {
                    showLoadingModal.value = true;
                }, 500);

                const response = await http.get('/api/TodoItems');
                todoItems.value = response.data;
            } catch (error) {
                showErrorModal.value = true;
                errorModalTitle.value = 'Fetch Error';
                errorModalMessage.value = 'Failed to load todo items';
            } finally {
                if (loadingTimeout) {
                    clearTimeout(loadingTimeout);
                }
                showLoadingModal.value = false;
            }
        };

        // Add a new todo item
        const addTodoItem = async () => {
            if (!newTodoTitle.value.trim()) {
                showErrorModal.value = true;
                errorModalTitle.value = 'Validation Error';
                errorModalMessage.value = 'Please enter a valid task title';
                return;
            }

            try {
                const newTodo = { title: newTodoTitle.value, isCompleted: false };
                await http.post('/api/TodoItems', newTodo);
                newTodoTitle.value = '';
                await fetchTodoItems();
            } catch (error) {
                showErrorModal.value = true;
                errorModalTitle.value = 'Add Error';
                errorModalMessage.value = 'Failed to add task';
            }
        };

        const toggleComplete = async (item) => {
            const initialStatus = item.isCompleted;
            const updatedItem = { ...item, isCompleted: !initialStatus };

            // Optimistically update the item locally
            const index = todoItems.value.findIndex(todo => todo.id === item.id);
            if (index !== -1) {
                todoItems.value[index].isCompleted = updatedItem.isCompleted;
            }

            try {
                await http.put(`/api/TodoItems/${item.id}`, updatedItem);
            } catch (error) {
                // Revert the change if API call fails
                if (index !== -1) {
                    todoItems.value[index].isCompleted = initialStatus;
                }
                showErrorModal.value = true;
                errorModalTitle.value = 'Update Error';
                errorModalMessage.value = 'Failed to update task';
            }
        };


        // Delete a todo item
        const deleteTodoItem = async (id) => {
            try {
                await http.delete(`/api/TodoItems/${id}`);
                await fetchTodoItems();
            } catch (error) {
                showErrorModal.value = true;
                errorModalTitle.value = 'Delete Error';
                errorModalMessage.value = 'Failed to delete task';
            }
        };

        // Sort the todo items based on completion status
        watchEffect(() => {
            orderedTodoItems.value = todoItems.value.slice().sort((a, b) => {
                if (orderByCompleted.value) {
                    return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? -1 : 1;
                } else {
                    return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
                }
            });
        });

        todoStore = {
            fetchTodoItems,
            addTodoItem,
            toggleComplete,
            deleteTodoItem
        };
    }

    return todoStore;
}
