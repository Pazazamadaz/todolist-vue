<template>
  <div v-if="colourThemeStore.showColourThemeModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" @click="colourThemeStore.showColourThemeModal = false">&times;</span>

      <h2>Edit Colour Option</h2>

      <p>Editing Colour for: <strong>{{ colourThemeStore.colourOption}}</strong></p>

      <div>
        <label for="colour-picker">Select new color:</label>
        <input
            id="colour-picker"
            type="color"
            v-model="colourThemeStore.colourValue"
        />
      </div>

      <div>
        <button class="modal-btn" @click="colourThemeStore.updateColour = true">OK</button>
        <button class="modal-btn" @click="colourThemeStore.showColourThemeModal = false">Cancel</button>
      </div>
S
    </div>
  </div>
</template>

<script setup>
import { useColourThemeStore } from '@/stores/useColourThemeStore';

const colourThemeStore = useColourThemeStore();
</script>
