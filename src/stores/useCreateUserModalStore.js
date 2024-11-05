import useCreateUserModalState from '@/state/useCreateUserModalState';
import useShowErrorModalState from "@/state/useShowErrorModalState";
import useAuthStore from "@/stores/useAuthStore";
import useAuthState from '@/state/useAuthState';
import useAdminStore from "@/stores/useAdminStore";

let createUserModalStore; // Singleton store instance

export default function useCreateUserModalStore() {
    if (!createUserModalStore) {
        const { showCreateUserModal } = useCreateUserModalState();
        const { errorModalTitle, errorModalMessage, showErrorModal } = useShowErrorModalState();
        const { registerOtherUser } = useAuthStore();
        const { newUsername, newPassword } = useAuthState();
        const { fetchUsers } = useAdminStore();

        const openModal = () => {
            showCreateUserModal.value = true;
        };

        const closeModal = () => {
            showCreateUserModal.value = false;
        };

        const createUser = async () => {
            const response = await registerOtherUser(newUsername.value, newPassword.value);
            if (response) {
                fetchUsers();
            } else {
                errorModalTitle.value = "Bugger!";
                errorModalMessage.value = "Failed to create user!";
                showErrorModal.value = true
            }
            newUsername.value = '';
            newPassword.value = '';
            closeModal();
        };

        // Define store
        createUserModalStore = {
            showCreateUserModal,
            openModal,
            closeModal,
            createUser,
            newUsername,
            newPassword,
        };
    }
    return createUserModalStore;
}
