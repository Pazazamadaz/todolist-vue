import { defineStore } from 'pinia';
import router from '@/router';
import http from '@/utils/http';
import { computed, ref, watch } from 'vue';
import { decodeJwt } from '@/utils/JWTDecoder';
import { useCreateUserModalStore } from '@/stores/useCreateUserModalStore';
import { useShowErrorModalStore } from '@/stores/useShowErrorModalStore';
import { useShowLoadingModalStore } from '@/stores/useShowLoadingModalStore';
import { useColourThemeStore} from "@/stores/useColourThemeStore";

export const useAuthStore = defineStore('authStore', () => {
  const username = ref('');
  const password = ref('');
  const newUsername = ref('');
  const newPassword = ref('');
  const isRegistration = ref(false);
  const Register = ref(false);
  const token = ref(localStorage.getItem('token') || null);

  const createUserModalStore = useCreateUserModalStore();
  const errorModalStore = useShowErrorModalStore();
  const loadingModalStore = useShowLoadingModalStore();
  const colourThemeStore = useColourThemeStore();

  const register = async () => {
    try {
      const response = await http.post('/api/Auth/register', { username: newUsername.value, password: newPassword.value });
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

    if (!username.value || !password.value) {
      errorModalStore.errorModalTitle = 'Login Error';
      errorModalStore.errorModalMessage = 'Username and password are required to log in';
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

      const decodedToken = decodeJwt(token.value);
      username.value = '';
      password.value = '';

      colourThemeStore.applyThemeFromToken(decodedToken);

      router.push('/todos');
    } catch (error) {
      errorModalStore.showErrorModal = true;
      errorModalStore.errorModalTitle = 'Login Error';
      errorModalStore.errorModalMessage = `Failed to log in with error: ${error.response?.data}`;
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

    // Reset :root properties to default
    const root = document.documentElement;
    root.removeAttribute('style');
  };

  const isAuthenticated = computed(() => !!token.value);
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
    Register,
    token,
    isAdmin,
    register,
    registerOtherUser,
    login,
    logout,
    isAuthenticated,
  };
});
