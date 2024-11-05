import { useShowLoadingModalState } from '@/state/useShowLoadingModalState';

const { showLoadingModal } = useShowLoadingModalState;

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
