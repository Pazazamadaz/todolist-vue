<template>
  <div>
    <h2>Login</h2>
    <div class="login-inputs">
      <input  ref="inputRef" v-model="username" class="custom-input" placeholder="Username" required @keyup.enter="login" />
      <input v-model="password" type="password" class="custom-input" placeholder="Password" required @keyup.enter="login" />
      <button @click="login">Login</button>
    </div>
    <button @click="(() => registerUser = true)" class="custom-button">Register</button>
  </div>

  <ShowCreateUserModal />
  <ShowErrorModal />
  <ShowLoadingModal />

</template>

<script setup>
import useAuthStore from "@/stores/useAuthStore";
import useAuthState from '@/state/useAuthState';
import ShowErrorModal from "@/components/Helpers/ShowErrorModal.vue";
import ShowLoadingModal from "@/components/Helpers/ShowLoadingModal.vue";
import ShowCreateUserModal from "@/components/Helpers/ShowCreateUserModal.vue";
import {onMounted, ref} from "vue";

const { login, username, password } = useAuthStore();
const { registerUser } = useAuthState();

const inputRef = ref(null)

onMounted(() => {
  inputRef.value.focus()
})
</script>
