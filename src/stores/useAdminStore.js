import { ref } from 'vue';
import http from '@/http';
import useAuthStore from './useAuthStore';
import useShowErrorModalStore from './useShowErrorModalStore';
import useShowLoadingModalStore from "@/stores/useShowLoadingModalStore";

let adminStore; // Singleton instance

export default function useAdminStore() {
    if (!adminStore) {
        const { isAuthenticated } = useAuthStore();
        const { openErrorModal } = useShowErrorModalStore();
        const { openLoadingModal, closeLoadingModal } = useShowLoadingModalStore();
        const { openCreateUserModal } = useShowErrorModalStore();
        const users = ref([]); // Ensure users is always initialized

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
        const deleteUser = async (id) => {
            try {
                await http.delete(`/api/Admin/${id}`);
                await fetchUsers();
            } catch (error) {
                openErrorModal(`Failed to delete user: ${error}`);
            }
        };

        const createUser = async () => {
            openCreateUserModal();
            //watch(users)
        }

        adminStore = {
            users,
            fetchUsers,
            deleteUser,
            createUser
        };
    }

    return adminStore;
}