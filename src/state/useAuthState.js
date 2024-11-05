import { ref } from 'vue';

let authState; // Singleton instance

const useAuthState = () => {
    if (!authState) {
        const username = ref('');
        const password = ref('');
        const newUsername = ref('');
        const newPassword = ref('');
        const token = ref(null);

        authState = { username, password, newUsername, newPassword, token };
    }

    return authState;
};

export default useAuthState;