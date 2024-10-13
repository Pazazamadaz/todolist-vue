import { ref } from 'vue';
import { useRouter } from 'vue-router';
import http from '@/http';

const useAuthStore = () => {
  const token = ref(null);
  const router = useRouter();
  
  const register = async (username, password) => {
    try {
      const response = await http.post('/api/auth/register', { username, password });
      console.log('Registration successful:', response.data);
      // Optionally, you can log in the user after registration
      await login(username, password);
    } 
    catch (error) {
      console.error('Registration failed:', error);
      throw error; // Propagate the error for handling in the component
    }
  };

  const login = async (username, password) => {
    try {
      const response = await http.post('/api/auth/login', { username, password });
      token.value = response.data.token;
      localStorage.setItem('token', token.value);  // Store token locally
      router.push('/todos');  // Redirect to TodoList after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem('token');  // Remove token from storage
    router.push('/login');  // Redirect to login page
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return { register, token, login, logout, isAuthenticated };
}

export default useAuthStore;
