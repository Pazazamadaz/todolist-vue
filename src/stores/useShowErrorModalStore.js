import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useShowErrorModalStore = defineStore('showErrorModal', () => {
    // State
    const showErrorModal = ref(false);
    const errorModalTitle = ref('');
    const errorModalMessage = ref('');

    // Actions (optional, if you want to modify state more easily)
    const openErrorModal = (title = '', message = '') => {
        showErrorModal.value = true;
        errorModalTitle.value = title;
        errorModalMessage.value = message;
    };

    const closeErrorModal = () => {
        showErrorModal.value = false;
        errorModalTitle.value = '';
        errorModalMessage.value = '';
    };

    return {
        showErrorModal,
        errorModalTitle,
        errorModalMessage,
        openErrorModal,
        closeErrorModal,
    };
});
