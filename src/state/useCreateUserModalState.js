import { ref } from 'vue';

let createUserModal; // Singleton instance

const useCreateUserModalState = () => {
    if (!createUserModal) {
        const showCreateUserModal = ref(false);
        const inputRef = ref(null);

        createUserModal = { showCreateUserModal, inputRef};
    }

    return createUserModal;
};

export default useCreateUserModalState;