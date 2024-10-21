<template>
  <div>
    <h2>Login</h2>
    <div class="login-inputs">
      <input v-model="username" class="custom-input" placeholder="Username" required @keyup.enter="login" />
      <input v-model="password" type="password" class="custom-input" placeholder="Password" required @keyup.enter="login" />
      <button @click="login">Login</button>
    </div>
    <router-link to="/register">Don't have an account? Register here.</router-link>
  </div>

  <ShowErrorModal />
  
</template>

<script setup>
import useAuthStore from "@/stores/useAuthStore";
import ShowErrorModal from "@/components/Helpers/ShowErrorModal.vue";

const { login, username, password } = useAuthStore();
</script>
