import { ref } from 'vue';
import useAuthStore from "@/stores/useAuthStore";

const showCreateUserModal = ref(false);
const { registerOtherUser, password, username } = useAuthStore();

const openCreateUserModal = () => {
    showCreateUserModal.value = true;
};

const closeCreateUserModal = () => {
    showCreateUserModal.value = false;
};

const createUser = () => {
    if (registerOtherUser(username, password)){
        closeCreateUserModal();
    }
}

export default function useCreateUserModalStore() {
    return {
        showCreateUserModal,
        openCreateUserModal,
        closeCreateUserModal,
        createUser
    };
}
