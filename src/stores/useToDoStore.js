import { ref, computed } from 'vue';
import axios from 'axios';

export default function useTodoStore() {
    const todoItems = ref([]);
    const loading = ref(false);
    const showModal = ref(false);
    const modalTitle = ref('');
    const modalMessage = ref('');
    const orderByCompleted = ref(false);
    const newTodoTitle = ref('');

    const fetchTodoItems = async () => {
        loading.value = true;
        try {
            const response = await axios.get('http://localhost:5000/api/TodoItems');
            todoItems.value = response.data;
        } catch (error) {
            showModal.value = true;
            modalTitle.value = 'Fetch Error';
            modalMessage.value = 'Failed to load todo items. Please try again later.';
        } finally {
            loading.value = false;
        }
    };

    const addTodoItem = async () => {
        if (!newTodoTitle.value.trim()) {
            showModal.value = true;
            modalTitle.value = 'Validation Error';
            modalMessage.value = 'Please enter a task title.';
            return;
        }

        try {
            const newTodo = { title: newTodoTitle.value, isCompleted: false };
            await axios.post('http://localhost:5000/api/TodoItems', newTodo);
            newTodoTitle.value = ''; // Clear input after adding
            await fetchTodoItems(); // Refresh the list after adding
        } catch (error) {
            showModal.value = true;
            modalTitle.value = 'Add Error';
            modalMessage.value = 'Failed to add the new task. Please try again later.';
        }
    };

    const toggleComplete = async (item) => {
        const updatedItem = { ...item, isCompleted: !item.isCompleted };
        try {
            await axios.put(`http://localhost:5000/api/TodoItems/${item.id}`, updatedItem);
            await fetchTodoItems(); // Refresh the list after toggling
        } catch (error) {
            showModal.value = true;
            modalTitle.value = 'Update Error';
            modalMessage.value = 'Failed to update the task. Please try again later.';
        }
    };

    const deleteTodoItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/TodoItems/${id}`);
            await fetchTodoItems(); // Refresh the list after deletion
        } catch (error) {
            showModal.value = true;
            modalTitle.value = 'Delete Error';
            modalMessage.value = 'Failed to delete the task. Please try again later.';
        }
    };

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
        loading,
        showModal,
        modalTitle,
        modalMessage,
        orderByCompleted,
        newTodoTitle,
        fetchTodoItems,
        addTodoItem,
        toggleComplete,
        deleteTodoItem,
        orderedTodoItems,
    };
}
