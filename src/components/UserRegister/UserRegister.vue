<template>
  <div v-if="showCreateUserModal">
    <h2>Register</h2>
    <div class="register-inputs">
      <input v-model="username" class="custom-input" placeholder="Username" required @keyup.enter="register" />
      <input v-model="password" class="custom-input" type="password" placeholder="Password" required @keyup.enter="register" />
      <button @click="register" >Register</button>
    </div>
  </div>
</template>

<script setup>
import useAuthStore from "@/stores/useAuthStore";
import useCreateUserModalStore from "@/stores/useCreateUserModalStore";

const { username, password, register} = useAuthStore();
const { showCreateUserModal } = useCreateUserModalStore();
</script>
