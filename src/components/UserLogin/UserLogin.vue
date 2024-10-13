<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <router-link to="/register">Don't have an account? Register here.</router-link> <!-- Add this line -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useAuthStore from '../../stores/useAuthStore';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();

const login = async () => {
  await authStore.login(username.value, password.value);
};
</script>
