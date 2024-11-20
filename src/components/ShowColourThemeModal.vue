<template>
  <div v-if="colourThemeStore.showColourThemeModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" @click="colourThemeStore.showColourThemeModal = false">&times;</span>

      <button class="modal-btn" @click="colourThemeStore.showColourThemeModal = false">OK</button>
    </div>
  </div>
</template>

<script setup>
import { useColourThemeStore } from '@/stores/useColourThemeStore';

const colourThemeStore = useColourThemeStore();
</script>
