<template>
  <div v-if="showLoadingModal" class="modal">
    <div class="modal-content">
      <div class="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import useShowLoadingModalState from '@/state/useShowLoadingModalState';

const { showLoadingModal } = useShowLoadingModalState();
</script>