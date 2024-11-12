import router from '@/router';
import http from '@/http';
import useAuthState from '@/state/useAuthState';
import useCreateUserModalState from "@/state/useCreateUserModalState";
import useShowErrorModalState from '@/state/useShowErrorModalState';
import useShowLoadingModalState from "@/state/useShowLoadingModalState";
import {watch} from "vue";

let authStore; // Singleton instance

const useAuthStore = () => {
  if (!authStore) {
    const { username, password, newUsername, newPassword, registerUser, token } = useAuthState();
    const { showCreateUserModal } = useCreateUserModalState();
    const { showErrorModal, errorModalTitle, errorModalMessage } = useShowErrorModalState();
    const { showLoadingModal } = useShowLoadingModalState();

    const register = async () => {
      try {
        const response = await http.post('/api/auth/register', { username: newUsername.value, password: newPassword.value });
        console.log('Registration successful:', response.data);
        await login();
      } catch (error) {
        showErrorModal.value = true;
        errorModalTitle.value = 'Registration Error';
        errorModalMessage.value = `Failed to register user with error: ${error}`;
        showCreateUserModal.value = false;
        console.error('Registration failed:', error);
      }
    };

    const registerOtherUser = async () => {
      try {
        const response = await http.post('/api/auth/register', { username: newUsername.value, password: newPassword.value });
        console.log('Registration successful:', response.data);
        return true;
      } catch (error) {
        showErrorModal.value = true;
        errorModalTitle.value = 'Create User Error';
        errorModalMessage.value = `Failed to create user with error: ${error}`;
        showCreateUserModal.value = false;
        console.error('Registration failed:', error);
      }
    };

    const login = async () => {

      let loadingTimeout;

      try {
        loadingTimeout = setTimeout(() => {
          showLoadingModal.value = true;
        }, 500);
        const response = await http.post('/api/auth/login', { username: username.value, password: password.value });
        token.value = response.data.token;
        localStorage.setItem('token', token.value);
        router.push('/todos');
      } catch (error) {
        showErrorModal.value = true;
        errorModalTitle.value = 'Login Error';
        errorModalMessage.value = `Failed to login with error: ${error}`;
        console.error('Login failed:', error);
      } finally {
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
        }
        showLoadingModal.value = false;
      }
    };

    const logout = () => {
      token.value = null;
      localStorage.removeItem('token');
      router.push('/login');
    };

    const isAuthenticated = () => {
      return !!localStorage.getItem('token');
    };

    watch(registerUser, (newValue) => {
      if (newValue === true) {
        showCreateUserModal.value = true;
      }
    })

    authStore = { register, registerOtherUser, login, logout, isAuthenticated, username, password, newUsername, newPassword, token };
  }

  return authStore;
};

export default useAuthStore;
