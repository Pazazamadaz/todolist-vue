<template>
  <div v-if="colourThemeStore.showColourThemeModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" @click="colourThemeStore.showColourThemeModal = false">&times;</span>

      <h2>Edit Colour Option</h2>

      <p>Editing Colour for: <strong>{{ colourThemeStore.colourProperty}}</strong></p>

      <div>
        <label for="colour-picker">Select new color:</label>
        <input
            id="colour-picker"
            type="color"
            v-model="colourThemeStore.colourValue"
        />
      </div>

      <div class="button-container">
        <button class="modal-btn" @click="colourThemeStore.saveColour = true">Save</button>
        <button class="modal-btn" @click="colourThemeStore.showColourThemeModal = false">Cancel</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useColourThemeStore } from '@/stores/useColourThemeStore';

const colourThemeStore = useColourThemeStore();
</script>
