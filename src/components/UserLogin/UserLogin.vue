<template>
  <div>
    <h2>Login</h2>
    <div class="login-inputs">
      <input ref="inputRef" v-model="authStore.username" class="custom-input" placeholder="Username" required @keyup.enter="authStore.login" />
      <input v-model="authStore.password" type="password" class="custom-input" placeholder="Password" required @keyup.enter="authStore.login" />
      <button @click="authStore.login">Login</button>
    </div>
    <button @click="Register()" class="custom-button register-button">Register</button>
  </div>

  <ShowCreateUserModal />
  <ShowErrorModal />
  <ShowLoadingModal />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCreateUserModalStore } from "@/stores/useCreateUserModalStore";
import ShowErrorModal from "@/components/Helpers/ShowErrorModal.vue";
import ShowLoadingModal from "@/components/Helpers/ShowLoadingModal.vue";
import ShowCreateUserModal from "@/components/Helpers/ShowCreateUserModal.vue";

// Setup stores
const authStore = useAuthStore();
const createUserModalStore = useCreateUserModalStore();

// Ref for input focus
const inputRef = ref(null);

function Register() {
  authStore.isRegistration = true;
  createUserModalStore.openModal();
}

// Focus on the username input when mounted
onMounted(() => {
  inputRef.value.focus();
});
</script>
