import { ref } from 'vue';

const useToDoState = () => {
        const todoItems = ref([]);
        const orderedTodoItems = ref([]);
        const orderByCompleted = ref(false);
        const newTodoTitle = ref('');

    return { todoItems, orderedTodoItems, orderByCompleted, newTodoTitle };
};

export default useToDoState;
