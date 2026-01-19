import { defineStore } from 'pinia';
import { ref, watch, reactive, watchEffect } from 'vue';
import http from '@/utils/http';
import { useAuthStore } from '@/stores/useAuthStore';
import { useShowErrorModalStore } from '@/stores/useShowErrorModalStore';
import { useShowLoadingModalStore } from '@/stores/useShowLoadingModalStore';
import { useCreateUserModalStore } from '@/stores/useCreateUserModalStore';

export const useAdminStore = defineStore('adminStore', () => {
    // State - reactive array of User objects
    const users = reactive([]);
    const deleteUsername = ref('');

    // Track initial isAdmin values to detect changes
    const initialAdminStatus = new Map();

    // Dependency stores
    const authStore = useAuthStore();
    const errorModalStore = useShowErrorModalStore();
    const loadingModalStore = useShowLoadingModalStore();
    const createUserModalStore = useCreateUserModalStore();

    // Fetch users with error handling
    const fetchUsers = async () => {
        if (!authStore.isAuthenticated) {
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

            // Clear existing users and tracking map
            users.splice(0, users.length);
            initialAdminStatus.clear();

            // Populate with User objects and set up watchers
            response.data.forEach(userData => {
                const user = reactive({
                    username: userData.username,
                    isAdmin: userData.isAdmin
                });

                // Store the initial isAdmin value
                initialAdminStatus.set(user.username, user.isAdmin);

                // Watch for changes to this user's isAdmin property
                watchEffect(() => {
                    const currentIsAdmin = user.isAdmin;
                    const initialValue = initialAdminStatus.get(user.username);

                    // Only update if it changed from initial value
                    if (currentIsAdmin !== initialValue && initialValue !== undefined) {
                        // Update the stored value to prevent repeated calls
                        initialAdminStatus.set(user.username, currentIsAdmin);
                        updateUser(user.username, currentIsAdmin);
                    }
                });

                users.push(user);
            });
        } catch (error) {
            console.error('Fetch users error:', error);
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Fetch Error';
            errorModalStore.errorModalMessage = `Failed to fetch users with error: ${error.response.data}`;
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
            const userIndex = users.findIndex(user => user.username === deleteUsername.value);
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
            }

            // Clear the username after successful deletion
            deleteUsername.value = null;
        } catch (error) {
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Delete Error';
            errorModalStore.errorModalMessage = `Failed to delete user: ${error.response.data}`;
        }
    };

    const createUser = () => {
        createUserModalStore.showCreateUserModal = true;
    };

    const updateUser = async (username, isAdmin) => {
        try {
            await http.put('/api/Admin/update', {
                username: username,
                isAdmin: isAdmin
            });
        } catch (error) {
            console.error('Update user error:', error);
            errorModalStore.showErrorModal = true;
            errorModalStore.errorModalTitle = 'Update Error';
            errorModalStore.errorModalMessage = `Failed to update user: ${error.response?.data || error.message}`;

            // Revert the change in the UI by re-fetching users
            await fetchUsers();
        }
    };

    // Watch `deleteUsername` and delete user if it's set
    watch(deleteUsername, (newValue) => {
        if (newValue !== null) {
            deleteUser();
        }
    });

    // Watch for Register state change and trigger registration logic
    watch(() => authStore.Register, (newValue) => {
        if (newValue) {
            authStore.isRegistration = true;
            createUserModalStore.openModal();
            // Reset Register to false for next use
            authStore.Register = false;
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
