import { watch } from 'vue';
import http from '@/http';
import useAuthStore from './useAuthStore';
import useAdminState from '@/state/useAdminState'
import useShowErrorModalState from '@/state/useShowErrorModalState';
import useShowLoadingModalState from "@/state/useShowLoadingModalState";
import useCreateUserModalState from "@/state/useCreateUserModalState";

let adminStore; // Singleton instance

export default function useAdminStore() {
    if (!adminStore) {
        const { users, deleteUsername } = useAdminState();
        const { isAuthenticated } = useAuthStore();
        const { showErrorModal, errorModalTitle, errorModalMessage } = useShowErrorModalState();
        const { showLoadingModal } = useShowLoadingModalState();
        const { showCreateUserModal } = useCreateUserModalState();

        // Fetch users with error handling
        const fetchUsers = async () => {
            if (!isAuthenticated()) {
                showErrorModal.value = true;
                errorModalTitle.value = 'Authentication Error';
                errorModalMessage.value = 'You must be logged in to view the user list';
                showLoadingModal.value = false;
                return;
            }

            let loadingTimeout;
            try {
                loadingTimeout = setTimeout(() => {
                    showLoadingModal.value = true;
                }, 500);

                const response = await http.get('/api/Admin'); // Replace with actual endpoint
                users.value = response.data;
            } catch (error) {
                console.error('Fetch users error:', error);
                showErrorModal.value = true;
                errorModalTitle.value = 'Fetch Error';
                errorModalMessage.value = `Failed to fetch users with error: ${error}`;
            } finally {
                if (loadingTimeout) {
                    clearTimeout(loadingTimeout);
                }
                showLoadingModal.value = false;
            }
        };

        const deleteUser = async () => {
            try {
                await http.delete('/api/Admin/delete', {
                    data: { Username: deleteUsername.value }
                });

                // Find the index of the user to delete
                const userIndex = users.value.findIndex(
                    user => user === deleteUsername.value
                );

                // Only update if the user was found
                if (userIndex !== -1) {
                    users.value.splice(userIndex, 1);
                }

                // Clear the username after successful deletion
                deleteUsername.value = '';
            } catch (error) {
                showErrorModal.value = true;
                errorModalTitle.value = 'Delete Error';
                errorModalMessage.value = `Failed to delete user: ${error}`;
            }
        };

        const createUser = async () => {
            showCreateUserModal.value = true;
        }

        watch(deleteUsername, () => {
            if (deleteUsername.value !== '') {
                deleteUser();
            }
        });

        adminStore = {
            users,
            fetchUsers,
            deleteUser,
            createUser
        };
    }

    return adminStore;
}