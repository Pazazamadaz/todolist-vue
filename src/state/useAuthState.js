import { ref } from 'vue';

const useAuthState = () => {
    const username = ref('');
    const password = ref('');
    const newUsername = ref('');
    const newPassword = ref('');
    const registerUser = ref(false);
    const token = ref(null);

    return { username, password, newUsername, newPassword, registerUser, token };
};

export default useAuthState;