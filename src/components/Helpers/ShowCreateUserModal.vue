<template>
  <div v-if="showCreateUserModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" @click="closeModal">&times;</span>
      <h2 class="modal-title">{{ modalTitle }}</h2>
      <p class="modal-message">{{ modalMessage }}</p>

      <div class="form-container">
        <!-- Align the inputs horizontally -->
        <div class="input-container">
          <input v-model="username" class="custom-input" placeholder="Username" required @keyup.enter="register" />
          <input v-model="password" class="custom-input" type="password" placeholder="Password" required @keyup.enter="register" />
        </div>

        <!-- Align the buttons horizontally underneath the inputs -->
        <div class="button-container">
          <button @click="createUser">Create</button>
          <button class="modal-btn" @click="closeCreateUserModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useCreateUserModalStore from '@/stores/useCreateUserModalStore';
import useAuthStore from "@/stores/useAuthStore";

const { showCreateUserModal, modalTitle, modalMessage, closeCreateUserModal, createUser } = useCreateUserModalStore();
const { username, password } = useAuthStore();
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: 400px; /* Set the desired width for the modal */
  max-width: 90%; /* Allow modal to scale down on smaller screens */
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.input-container {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
}

.custom-input {
  flex: 1;
  padding: 8px;
}

.button-container {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
}
</style>