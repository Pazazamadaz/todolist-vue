import { ref } from 'vue';

let errorModalState; // Singleton instance

const useShowErrorModalState = () => {
    if (!errorModalState) {
        const showErrorModal = ref(false);
        const errorModalTitle = ref('');
        const errorModalMessage = ref('');

        errorModalState = { showErrorModal, errorModalTitle, errorModalMessage };
    }

    return errorModalState;
};

export default useShowErrorModalState;