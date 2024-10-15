<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register" class="register-form">
      <input v-model="username" class="custom-input" placeholder="Username" required />
      <input v-model="password" class="custom-input" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useAuthStore from '../../stores/useAuthStore';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();

const register = async () => {
  try {
    await authStore.register(username.value, password.value);
    username.value = ''; // Clear input
    password.value = ''; // Clear input
  } catch (error) {
    // Handle registration error (e.g., show a message)
    console.error('Registration failed:', error);
  }
};
</script>
