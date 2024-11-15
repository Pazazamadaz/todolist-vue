<template>
  <div v-if="createUserModalStore.showCreateUserModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" @click="createUserModalStore.closeModal">&times;</span>
      <h2 class="modal-title">Create User</h2>
      <p class="modal-message">Enter name and password</p>

      <div class="form-container">
        <div class="input-container">
          <input
              v-model="authStore.newUsername"
              class="custom-input"
              ref="inputRef"
              placeholder="Enter username"
              autocomplete="off"
              required
              @keyup.enter="createUserModalStore.createUser"
          />
          <input
              v-model="authStore.newPassword"
              class="custom-input"
              type="password"
              placeholder="Enter password"
              autocomplete="new-password"
              required
              @keyup.enter="createUserModalStore.createUser"
          />
        </div>
        <div class="button-container">
          <button @click="createUserModalStore.createUser">Create</button>
          <button class="modal-btn" @click="createUserModalStore.closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, nextTick, ref } from "vue";
import { useCreateUserModalStore} from "@/stores/useCreateUserModalStore";
import { useAuthStore} from "@/stores/useAuthStore";

// Initialize stores
const createUserModalStore = useCreateUserModalStore();
const authStore = useAuthStore();

const inputRef = ref(null);

// Watch for modal visibility changes to focus input
watch(
    () => createUserModalStore.showCreateUserModal,
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
  width: 400px;
  max-width: 90%;
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
