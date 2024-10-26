import { ref } from 'vue';
import useAuthStore from "@/stores/useAuthStore";

const showLoadingModal = ref(false);
const { registerOtherUser, password, username } = useAuthStore();

const openCreateUserModal = () => {
    showLoadingModal.value = true;
};

const closeCreateUserModal = () => {
    showLoadingModal.value = false;
};

const createUser = () => {
    if (registerOtherUser(username, password)){
        closeCreateUserModal();
    }
}

export default function useCreateUserModalStore() {
    return {
        showLoadingModal,
        openCreateUserModal,
        closeCreateUserModal,
        createUser
    };
}
