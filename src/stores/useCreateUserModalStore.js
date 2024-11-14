import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useShowErrorModalStore } from '@/stores/useShowErrorModalStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAdminStore } from '@/stores/useAdminStore';

export const useCreateUserModalStore = defineStore('createUserModal', () => {
    // State
    const showCreateUserModal = ref(false);
    const newUsername = ref('');
    const newPassword = ref('');

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
        const response = await authStore.registerOtherUser(newUsername.value, newPassword.value);

        if (response) {
            if (authStore.registerUser) {
                errorModalStore.errorModalTitle = 'Registered User';
                errorModalStore.errorModalMessage = 'User successfully created. You may now log in.';
                errorModalStore.showErrorModal = true;
            } else {
                adminStore.fetchUsers();
            }
        } else {
            errorModalStore.errorModalTitle = "Bugger!";
            errorModalStore.errorModalMessage = "Failed to create user!";
            errorModalStore.showErrorModal = true;
        }

        newUsername.value = '';
        newPassword.value = '';
        closeModal();
    };

    return {
        showCreateUserModal,
        openModal,
        closeModal,
        createUser,
        newUsername,
        newPassword,
    };
});
