import { ref } from 'vue';

let authState; // Singleton instance

const useAuthState = () => {
    if (!authState) {
        const username = ref('');
        const password = ref('');
        const newUsername = ref('');
        const newPassword = ref('');
        const registerUser = ref(false);
        const token = ref(null);

        authState = { username, password, newUsername, newPassword, registerUser, token };
    }

    return authState;
};

export default useAuthState;