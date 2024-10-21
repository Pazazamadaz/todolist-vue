<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" @click="closeModal">&times;</span>
      <h2 class="modal-title">{{ modalTitle }}</h2>
      <p class="modal-message">{{ modalMessage }}</p>
      <button class="modal-btn" @click="closeModal">OK</button>
    </div>
  </div>
</template>

<script setup>
import useShowErrorModalStore from '@/stores/useShowErrorModalStore';

const { showModal, modalTitle, modalMessage, closeModal } = useShowErrorModalStore();
</script>