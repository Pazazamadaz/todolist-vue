import { ref } from 'vue';

let loadModalState; // Singleton instance

const useShowLoadingModalState = () => {
    if (!loadModalState) {
        const showLoadingModal = ref(false);

        loadModalState = { showLoadingModal };
    }

    return loadModalState;
};

export default useShowLoadingModalState;
