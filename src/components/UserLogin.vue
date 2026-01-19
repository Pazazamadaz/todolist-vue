<template>
  <div>
    <h2>Login</h2>
    <div class="login-inputs">
      <input ref="inputRef" v-model="authStore.username" class="custom-input" placeholder="Username" required @keyup.enter="authStore.login" />
      <input v-model="authStore.password" type="password" class="custom-input" placeholder="Password" required @keyup.enter="authStore.login" />
      <button @click="authStore.login">Login</button>
    </div>
    <button @click="authStore.Register = true" class="register-button">Register</button>
  </div>

  <ShowCreateUserModal />
  <ShowErrorModal />
  <ShowLoadingModal />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import ShowErrorModal from "@/components/ShowErrorModal.vue";
import ShowLoadingModal from "@/components/ShowLoadingModal.vue";
import ShowCreateUserModal from "@/components/ShowCreateUserModal.vue";

// Setup stores
const authStore = useAuthStore();

// Ref for input focus
const inputRef = ref(null);

// Focus on the username input when mounted
onMounted(() => {
  inputRef.value.focus();
});
</script>

<style scoped>
/* Make the styles for inputs and buttons specific to the login form */
.login-inputs .input-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-inputs input.custom-input {
  margin-right: 10px; /* Adds spacing between the username and password inputs */
}

.login-inputs button {
  margin-left: 10px; /* Adds spacing between the last input and the button */
}

.register-button {
  margin-top: 10px;
}
</style>