import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useShowErrorModalStore } from '@/stores/useShowErrorModalStore';
import { useAuthStore } from "@/stores/useAuthStore";
import { useAdminStore } from '@/stores/useAdminStore';

export const useCreateUserModalStore = defineStore('createUserModalStore', () => {
    // State
    const showCreateUserModal = ref(false);

    // Dependency stores
    const errorModalStore = useShowErrorModalStore();
    const authStore = useAuthStore();
    const adminStore = useAdminStore();

    // Actions
    const openModal = () => {
        showCreateUserModal.value = true;
    };

    const closeModal = () => {
        showCreateUserModal.value = false;
        authStore.newUsername = '';
        authStore.newPassword = '';
    };

    const createUser = async () => {
        if (authStore.newUsername === '' || authStore.newPassword === '') {
            errorModalStore.errorModalTitle = 'Create User Error';
            errorModalStore.errorModalMessage = "Username and password required to create user";
            errorModalStore.showErrorModal = true;
            showCreateUserModal.value = false;
            return;
        }

        try{
            if (!authStore.isRegistration) {
                await authStore.registerOtherUser();
            } else {
                await authStore.register();
            }

            if (authStore.isRegistration) {
                authStore.username = authStore.newUsername;
                authStore.password = authStore.newPassword;
                await authStore.login();
                authStore.username = '';
                authStore.password = '';
                authStore.newUsername = '';
                authStore.newPassword = '';
                authStore.isRegistration = false;
            } else {
                await adminStore.fetchUsers();
            }
        } catch(error) {
            errorModalStore.errorModalTitle = "Bugger!";
            errorModalStore.errorModalMessage = `Failed to create user: ${error}`;
            errorModalStore.showErrorModal = true;
        }

        authStore.newUsername = '';
        authStore.newPassword = '';
        closeModal();
    };

    return {
        showCreateUserModal,
        openModal,
        closeModal,
        createUser
    };
});
