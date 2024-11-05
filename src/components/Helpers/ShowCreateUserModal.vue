<template>
  <div v-if="showCreateUserModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" @click="(() => showCreateUserModal = false)">&times;</span>
      <h2 class="modal-title">Create User</h2>
      <p class="modal-message">Enter name and password</p>

      <div class="form-container">
        <div class="input-container">
          <input v-model="newUsername" class="custom-input" ref="inputRef" placeholder="Enter username" autocomplete="off" required @keyup.enter="createUser" />
          <input v-model="newPassword" class="custom-input" type="password" placeholder="Enter password" autocomplete="new-password" required @keyup.enter="createUser" />
        </div>
        <div class="button-container">
          <button @click="createUser">Create</button>
          <button class="modal-btn" @click="(() => showCreateUserModal = false)">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useCreateUserModalStore from '@/stores/useCreateUserModalStore';
import useCreateUserModalState from "@/state/useCreateUserModalState";
import { watch, nextTick } from "vue";

const { createUser, newUsername, newPassword } = useCreateUserModalStore();
const { showCreateUserModal, inputRef } = useCreateUserModalState();

watch(
    () => showCreateUserModal.value,
    async (isVisible) => {
      if (isVisible) {
        await nextTick();
        inputRef.value?.focus();
      }
    }
);

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