import { ref } from 'vue';

let createUserModal; // Singleton instance

const useCreateUserModalState = () => {
    if (!createUserModal) {
        const showCreateUserModal = ref(false);

        createUserModal = { showCreateUserModal };
    }

    return createUserModal;
};

export default useCreateUserModalState;