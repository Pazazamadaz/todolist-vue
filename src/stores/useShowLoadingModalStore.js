import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useShowLoadingModalStore = defineStore('showLoadingModal', () => {
    // State
    const showLoadingModal = ref(false);

    // Actions
    const openLoadingModal = () => {
        showLoadingModal.value = true;
    };

    const closeLoadingModal = () => {
        showLoadingModal.value = false;
    };

    return {
        showLoadingModal,
        openLoadingModal,
        closeLoadingModal,
    };
});
