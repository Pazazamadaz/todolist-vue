import { ref, readonly } from 'vue';
import useAuthStore from "@/stores/useAuthStore";
import useAuthState from '@/state/useAuthState';
import useAdminStore from "@/stores/useAdminStore";

let createUserModalStore; // Singleton store instance

export default function useCreateUserModalStore() {
    if (!createUserModalStore) {
        const { registerOtherUser } = useAuthStore();
        const { newUsername, newPassword } = useAuthState();
        const { fetchUsers } = useAdminStore();

        // Define modal visibility as a ref
        const showCreateUserModal = ref(false);

        // Functions to control modal visibility
        const openModal = () => {
            showCreateUserModal.value = true;
        };

        const closeModal = () => {
            showCreateUserModal.value = false;
        };

        // Function to create a user and handle modal state
        const createUser = async () => {
            const response = await registerOtherUser(newUsername.value, newPassword.value);
            if (response) {
                closeModal();
                newUsername.value = '';
                newPassword.value = '';
                fetchUsers();
            }
        };

        // Define store
        createUserModalStore = {
            showCreateUserModal: readonly(showCreateUserModal),
            openModal,
            closeModal,
            createUser,
            newUsername,
            newPassword,
        };
    }
    return createUserModalStore;
}
