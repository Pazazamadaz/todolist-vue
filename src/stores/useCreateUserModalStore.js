import { ref } from 'vue';
import useAuthStore from "@/stores/useAuthStore";
import useAdminStore from "@/stores/useAdminStore";

const showCreateUserModal = ref(false);
const { registerOtherUser, newUsername, newPassword } = useAuthStore();
const { fetchUsers } = useAdminStore();

const openCreateUserModal = () => {
    showCreateUserModal.value = true;
};

const closeCreateUserModal = () => {
    showCreateUserModal.value = false;
};

const createUser = async() => {
    const response = await registerOtherUser(newUsername, newPassword);
    if (response) {
        closeCreateUserModal();
        newUsername.value = '';
        newPassword.value = '';
        fetchUsers();
    }
}

export default function useCreateUserModalStore() {
    return {
        showCreateUserModal,
        openCreateUserModal,
        closeCreateUserModal,
        createUser,
        newUsername,
        newPassword,
    };
}
