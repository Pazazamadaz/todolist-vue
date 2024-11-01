import { ref } from 'vue';

let ToDoState; // Singleton instance

const useToDoState = () => {
    if (!ToDoState) {
        const todoItems = ref([]);
        const orderedTodoItems = ref([]);
        const orderByCompleted = ref(false);
        const newTodoTitle = ref('');

        ToDoState = { todoItems, orderedTodoItems, orderByCompleted, newTodoTitle };
    }

    return ToDoState;
};

export default useToDoState;
