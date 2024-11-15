import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import http from '@/http';
import { useAuthStore } from '@/stores/useAuthStore';
import { useShowErrorModalStore } from '@/stores/useShowErrorModalStore';
import { useShowLoadingModalStore } from '@/stores/useShowLoadingModalStore';
import { useCreateUserModalStore } from '@/stores/useCreateUserModalStore';

export const useAdminStore = defineStore('adminStore', () => {
    // State
    const users = ref([]);
    const deleteUsername = ref('');

    // Dependency stores
    const authStore = useAuthStore();
    const errorModalStore = useShowErrorModalStore();
    const loadingModalStore = useShowLoadingModalStore();
    const createUserModalStore = useCreateUserModalStore();

    // Fetch users with error handling
    const fetchUsers = async () => {
        if (!authStore.isAuthenticated()) {
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Authentication Error';
            errorModalStore.errorModalMessage = 'You must be logged in to view the user list';
            loadingModalStore.showLoadingModal = false;
            return;
        }

        let loadingTimeout;
        try {
            loadingTimeout = setTimeout(() => {
                loadingModalStore.showLoadingModal = true;
            }, 500);

            const response = await http.get('/api/Admin'); // Replace with actual endpoint
            users.value = response.data;
        } catch (error) {
            console.error('Fetch users error:', error);
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Fetch Error';
            errorModalStore.errorModalMessage = `Failed to fetch users with error: ${error}`;
        } finally {
            if (loadingTimeout) {
                clearTimeout(loadingTimeout);
            }
            loadingModalStore.showLoadingModal = false;
        }
    };

    const deleteUser = async () => {
        try {
            await http.delete('/api/Admin/delete', {
                data: { Username: deleteUsername.value }
            });

            // Remove the user from the local state after successful deletion
            const userIndex = users.value.findIndex(user => user === deleteUsername.value);
            if (userIndex !== -1) {
                users.value.splice(userIndex, 1);
            }

            // Clear the username after successful deletion
            deleteUsername.value = null;
        } catch (error) {
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Delete Error';
            errorModalStore.errorModalMessage = `Failed to delete user: ${error}`;
        }
    };

    const createUser = () => {
        createUserModalStore.showCreateUserModal = true;
    };

    // Watch `deleteUsername` and delete user if it's set
    watch(deleteUsername, (newValue) => {
        if (newValue !== null) {
            deleteUser();
        }
    });

    return {
        users,
        fetchUsers,
        deleteUser,
        createUser,
        deleteUsername,
    };
});
