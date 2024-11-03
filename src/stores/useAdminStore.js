import { watch } from 'vue';
import http from '@/http';
import useAuthStore from './useAuthStore';
import useAdminState from '@/state/useAdminState'
import useShowErrorModalStore from './useShowErrorModalStore';
import useShowLoadingModalStore from "@/stores/useShowLoadingModalStore";
import useCreateUserModalState from "@/state/useCreateUserModalState";

let adminStore; // Singleton instance

export default function useAdminStore() {
    if (!adminStore) {
        const { users, deleteUsername } = useAdminState();
        const { isAuthenticated } = useAuthStore();
        const { openErrorModal } = useShowErrorModalStore();
        const { openLoadingModal, closeLoadingModal } = useShowLoadingModalStore();
        const { showCreateUserModal } = useCreateUserModalState();

        // Fetch users with error handling
        const fetchUsers = async () => {
            if (!isAuthenticated()) {
                openErrorModal('Authentication Error', 'You must be logged in to view the user list.');
                closeLoadingModal();
                return;
            }

            let loadingTimeout;
            try {
                loadingTimeout = setTimeout(() => {
                    openLoadingModal();
                }, 500);

                const response = await http.get('/api/Admin'); // Replace with actual endpoint
                users.value = response.data;
            } catch (error) {
                console.error('Fetch users error:', error);
                openErrorModal(`Failed to fetch users: ${error}`);
            } finally {
                if (loadingTimeout) {
                    clearTimeout(loadingTimeout);
                }
                closeLoadingModal();
            }
        };

        // Delete a user
        const deleteUser = async () => {
            try {
                await http.delete('/api/Admin/delete', {
                    data: { Username: deleteUsername.value }
                });
                await fetchUsers();
                deleteUsername.value = '';
            } catch (error) {
                openErrorModal(`Failed to delete user: ${error}`);
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