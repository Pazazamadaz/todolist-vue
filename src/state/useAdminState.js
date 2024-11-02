import { ref } from 'vue';

let AdminState; // Singleton instance

const useAdminState = () => {
    if (!AdminState) {
        const users = ref([]);
        const deleteUsername = ref('');

        AdminState = { users, deleteUsername };
    }

    return AdminState;
};

export default useAdminState;