<template>
  <div>
    <h2>Register</h2>
    <div class="register-inputs">
      <input v-model="username" class="custom-input" placeholder="Username" required />
      <input v-model="password" class="custom-input" type="password" placeholder="Password" required />
      <button @click="register" >Register</button>
    </div>
  </div>
</template>

<script setup>
import useAuthStore from '../../stores/useAuthStore';

const { username, password, register} = useAuthStore();
</script>
