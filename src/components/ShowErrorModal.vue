<template>
  <div v-if="showErrorModalStore.showErrorModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" @click="() => (showErrorModalStore.showErrorModal = false)">&times;</span>
      <h2 class="modal-title">{{ showErrorModalStore.errorModalTitle }}</h2>
      <p class="modal-message">{{ showErrorModalStore.errorModalMessage }}</p>
      <button class="modal-btn" @click="() => (showErrorModalStore.showErrorModal = false)">OK</button>
    </div>
  </div>
</template>

<script setup>
import { useShowErrorModalStore } from "@/stores/useShowErrorModalStore";

// Initialize store and extract values
const showErrorModalStore = useShowErrorModalStore();
</script>
