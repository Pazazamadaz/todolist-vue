import { ref } from 'vue';

const useAdminState = () => {
    const users = ref([]);
    const deleteUsername = ref('');

    return { users, deleteUsername };
};

export default useAdminState;
