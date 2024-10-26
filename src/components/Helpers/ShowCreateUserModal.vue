<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" @click="closeModal">&times;</span>
      <h2 class="modal-title">{{ modalTitle }}</h2>
      <p class="modal-message">{{ modalMessage }}</p>
      <div class="register-inputs">
        <input v-model="username" class="custom-input" placeholder="Username" required @keyup.enter="register" />
        <input v-model="password" class="custom-input" type="password" placeholder="Password" required @keyup.enter="register" />
        <button @click="createUser" >Create</button>
        <button class="modal-btn" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import useCreateUserModalStore from '@/stores/useCreateUserModalStore';
import useAuthStore from "@/stores/useAuthStore";

const { showModal, modalTitle, modalMessage, closeModal, createUser } = useCreateUserModalStore();
const { username, password } = useAuthStore();
</script>