import { ref } from 'vue';
import axios from 'axios';

export default function useTodoStore() {
    const todoItems = ref([]);
    const loading = ref(false);
    const showModal = ref(false);
    const modalTitle = ref('');
    const modalMessage = ref('');

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

    const addTodoItem = async (newTodoTitle) => {
        if (!newTodoTitle.trim()) {
            showModal.value = true;
            modalTitle.value = 'Validation Error';
            modalMessage.value = 'Please enter a task title.';
            return;
        }

        try {
            const newTodo = { title: newTodoTitle, isCompleted: false };
            await axios.post('http://localhost:5000/api/TodoItems', newTodo);
            await fetchTodoItems();
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
            await fetchTodoItems();
        } catch (error) {
            showModal.value = true;
            modalTitle.value = 'Update Error';
            modalMessage.value = 'Failed to update the task. Please try again later.';
        }
    };

    const deleteTodoItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/TodoItems/${id}`);
            await fetchTodoItems();
        } catch (error) {
            showModal.value = true;
            modalTitle.value = 'Delete Error';
            modalMessage.value = 'Failed to delete the task. Please try again later.';
        }
    };

    const orderedTodoItems = (orderByCompleted) => {
        return todoItems.value.slice().sort((a, b) => {
            if (orderByCompleted) {
                return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
            } else {
                return 0;
            }
        });
    };

    return {
        todoItems,
        loading,
        showModal,
        modalTitle,
        modalMessage,
        fetchTodoItems,
        addTodoItem,
        toggleComplete,
        deleteTodoItem,
        orderedTodoItems,
    };
}
