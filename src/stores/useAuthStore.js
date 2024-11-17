import { defineStore } from 'pinia';
import router from '@/router';
import http from '@/http';
import {computed, ref, watch} from 'vue';
import { decodeJwt } from '@/JWTDecoder';
import { useCreateUserModalStore } from '@/stores/useCreateUserModalStore';
import { useShowErrorModalStore } from '@/stores/useShowErrorModalStore';
import { useShowLoadingModalStore } from '@/stores/useShowLoadingModalStore';

export const useAuthStore = defineStore('authStore', () => {
  const username = ref('');
  const password = ref('');
  const newUsername = ref('');
  const newPassword = ref('');
  const isRegistration = ref(false);
  const token = ref(localStorage.getItem('token') || null);

  const createUserModalStore = useCreateUserModalStore();
  const errorModalStore = useShowErrorModalStore();
  const loadingModalStore = useShowLoadingModalStore();

  const register = async () => {
    try {
      const response = await http.post('/api/auth/register', { username: newUsername.value, password: newPassword.value });
      console.log('Registration successful:', response.data);
    } catch (error) {
      errorModalStore.showErrorModal = true;
      errorModalStore.errorModalTitle = 'Registration Error';
      errorModalStore.errorModalMessage = `Failed to register user with error: ${error.response.data}`;
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
      errorModalStore.errorModalMessage = `Failed to create user with error: ${error.response.data}`;
      createUserModalStore.showCreateUserModal = false;
      console.error('Registration failed:', error);
    }
  };

  const login = async () => {
    let loadingTimeout;

    if (username.value === '' || password.value === '') {
      errorModalStore.errorModalTitle = 'Login Error';
      errorModalStore.errorModalMessage = "Username and password required to login";
      errorModalStore.showErrorModal = true;
      return;
    }

    try {
      loadingTimeout = setTimeout(() => {
        loadingModalStore.showLoadingModal = true;
      }, 100);

      const response = await http.post('/api/auth/login', { username: username.value, password: password.value });
      token.value = response.data.token;
      localStorage.setItem('token', token.value);
      username.value = '';
      password.value = '';
      router.push('/todos');
    } catch (error) {
      errorModalStore.showErrorModal = true;
      errorModalStore.errorModalTitle = 'Login Error';
      errorModalStore.errorModalMessage = `Failed to login with error: ${error.response.data}`;
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

  const isAuthenticated = computed(() => !!token.value);  // Dynamically checks if the user is authenticated
  const isAdmin = computed(() => {
    const decodedToken = token.value ? decodeJwt(token.value) : null;
    console.log('Decoded Token:', decodedToken);
    return decodedToken && decodedToken.role === 'Administrator';
  });

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
    isRegistration,
    token,
    isAdmin,
    register,
    registerOtherUser,
    login,
    logout,
    isAuthenticated
  };
});
