import { defineStore } from 'pinia';
import router from '@/router';
import http from '@/http';
import { ref, watch } from 'vue';
import useCreateUserModalStore from '@/stores/useCreateUserModalStore';
import useShowErrorModalStore from '@/stores/useShowErrorModalStore';
import useShowLoadingModalStore from '@/stores/useShowLoadingModalStore';

export const useAuthStore = defineStore('auth', () => {
  const username = ref('');
  const password = ref('');
  const newUsername = ref('');
  const newPassword = ref('');
  const token = ref(localStorage.getItem('token') || null);

  const createUserModalStore = useCreateUserModalStore();
  const errorModalStore = useShowErrorModalStore();
  const loadingModalStore = useShowLoadingModalStore();

  const register = async () => {
    try {
      const response = await http.post('/api/auth/register', { username: newUsername.value, password: newPassword.value });
      console.log('Registration successful:', response.data);
      await login(); // Automatically log in after registration
    } catch (error) {
      errorModalStore.showErrorModal = true;
      errorModalStore.errorModalTitle = 'Registration Error';
      errorModalStore.errorModalMessage = `Failed to register user with error: ${error}`;
      createUserModalStore.showCreateUserModal = false;
      console.error('Registration failed:', error);
    }
  };

  const registerOtherUser = async () => {
    try {
      const response = await http.post('/api/auth/register', { username: newUsername.value, password: newPassword.value });
      console.log('Registration successful:', response.data);
      return true;
    } catch (error) {
      errorModalStore.showErrorModal = true;
      errorModalStore.errorModalTitle = 'Create User Error';
      errorModalStore.errorModalMessage = `Failed to create user with error: ${error}`;
      createUserModalStore.showCreateUserModal = false;
      console.error('Registration failed:', error);
    }
  };

  const login = async () => {
    let loadingTimeout;

    try {
      loadingTimeout = setTimeout(() => {
        loadingModalStore.showLoadingModal = true;
      }, 500);

      const response = await http.post('/api/auth/login', { username: username.value, password: password.value });
      token.value = response.data.token;
      localStorage.setItem('token', token.value);
      router.push('/todos');
    } catch (error) {
      errorModalStore.showErrorModal = true;
      errorModalStore.errorModalTitle = 'Login Error';
      errorModalStore.errorModalMessage = `Failed to login with error: ${error}`;
      console.error('Login failed:', error);
    } finally {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      loadingModalStore.showLoadingModal = false;
    }
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem('token');
    router.push('/login');
  };

  const isAuthenticated = () => !!token.value;

  watch(() => createUserModalStore.registerUser, (newValue) => {
    if (newValue === true) {
      createUserModalStore.showCreateUserModal = true;
    }
  });

  return {
    username,
    password,
    newUsername,
    newPassword,
    token,
    register,
    registerOtherUser,
    login,
    logout,
    isAuthenticated
  };
});
