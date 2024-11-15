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
    };

    const createUser = async () => {
        const response = await authStore.registerOtherUser();

        if (response) {
            if (authStore.isRegistration) {
                errorModalStore.errorModalTitle = 'Registered User';
                errorModalStore.errorModalMessage = 'User successfully created. You may now log in.';
                errorModalStore.showErrorModal = true;
            } else {
                await adminStore.fetchUsers();
            }
        } else {
            errorModalStore.errorModalTitle = "Bugger!";
            errorModalStore.errorModalMessage = "Failed to create user!";
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
