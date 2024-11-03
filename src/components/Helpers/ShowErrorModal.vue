<template>
  <div v-if="showErrorModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" @click="(() => showErrorModal = false)">&times;</span>
      <h2 class="modal-title">{{ errorModalTitle }}</h2>
      <p class="modal-message">{{ errorModalMessage }}</p>
      <button class="modal-btn" @click="(() => showErrorModal = false)">OK</button>
    </div>
  </div>
</template>

<script setup>
import useShowErrorModalState from "@/state/useShowErrorModalState";

const { showErrorModal, errorModalMessage} = useShowErrorModalState();
</script>