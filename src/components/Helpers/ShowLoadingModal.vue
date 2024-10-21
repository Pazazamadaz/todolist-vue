<template>
  <div v-if="showLoadingModal" class="modal">
    <div class="modal-content">
      <div class="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import useShowLoadingModalStore from '@/stores/useShowLoadingModalStore';

// Use the loading modal store to get reactive state
const { showLoadingModal } = useShowLoadingModalStore();
</script>