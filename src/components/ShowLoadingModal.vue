<template>
  <div v-if="showLoadingModal.showLoadingModal" class="modal">
    <div class="modal-content">
      <div class="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { useShowLoadingModalStore } from '@/stores/useShowLoadingModalStore';

const { showLoadingModal } = useShowLoadingModalStore();
</script>
