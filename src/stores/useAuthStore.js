import router from '@/router';
import http from '@/http';
import useAuthState from '@/state/useAuthState';
import useShowErrorModalStore from './useShowErrorModalStore';
import useShowLoadingModalStore from "@/stores/useShowLoadingModalStore";

let authStore; // Singleton instance

const useAuthStore = () => {
  if (!authStore) {
    const { username, password, newUsername, newPassword, token } = useAuthState();
    const { openErrorModal } = useShowErrorModalStore();
    const { openLoadingModal, closeLoadingModal } = useShowLoadingModalStore();

    const register = async () => {
      try {
        const response = await http.post('/api/auth/register', { username: username.value, password: password.value });
        console.log('Registration successful:', response.data);
        await login();
      } catch (error) {
        openErrorModal(`Registration failed: ${error}`);
        console.error('Registration failed:', error);
      }
    };

    const registerOtherUser = async () => {
      try {
        const response = await http.post('/api/auth/register', { username: newUsername.value, password: newPassword.value });
        console.log('Registration successful:', response.data);
        return true;
      } catch (error) {
        openErrorModal(`Registration failed: ${error}`);
        console.error('Registration failed:', error);
      }
    };

    const login = async () => {

      let loadingTimeout;

      try {

        loadingTimeout = setTimeout(() => {
          openLoadingModal();
        }, 500);

        const response = await http.post('/api/auth/login', { username: username.value, password: password.value });
        token.value = response.data.token;
        localStorage.setItem('token', token.value);
        router.push('/todos');

      } catch (error) {
        openErrorModal(`Login failed: ${error}`);
        console.error('Login failed:', error);
      } finally {
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
        }
        closeLoadingModal();
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

    // Return the refs and methods for usage in login and register components
    authStore = { register, registerOtherUser, login, logout, isAuthenticated, username, password, newUsername, newPassword, token };
  }

  return authStore;
};

export default useAuthStore;
