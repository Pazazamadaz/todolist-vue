import { ref } from 'vue';
import { useRouter } from 'vue-router';
import http from '@/http';

const useAuthStore = () => {
  const username = ref('');
  const password = ref('');
  const token = ref(null);
  const router = useRouter();

  const register = async () => {
    try {
      const response = await http.post('/api/auth/register', { username: username.value, password: password.value });
      console.log('Registration successful:', response.data);
      await login();
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const login = async () => {
    try {
      const response = await http.post('/api/auth/login', { username: username.value, password: password.value });
      token.value = response.data.token;
      localStorage.setItem('token', token.value);
      router.push('/todos');
    } catch (error) {
      console.error('Login failed:', error);
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
  return { register, login, logout, isAuthenticated, username, password, token };
};

export default useAuthStore;
