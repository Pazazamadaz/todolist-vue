import { ref } from 'vue';

const showLoadingModal = ref(false);

const openLoadingModal = () => {
    showLoadingModal.value = true;
};

const closeLoadingModal = () => {
    showLoadingModal.value = false;
};

export default function useShowLoadingModalStore() {
    return {
        showLoadingModal,
        openLoadingModal,
        closeLoadingModal
    };
}
