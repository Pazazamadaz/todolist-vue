import { ref } from 'vue';

let errorModalState; // Singleton instance

const useShowErrorModalState = () => {
    if (!errorModalState) {
        const showLoadingModal = ref(false);

        errorModalState = { showLoadingModal };
    }

    return errorModalState;
};

export default useShowErrorModalState;