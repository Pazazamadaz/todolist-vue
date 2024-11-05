import useShowErrorModalState from "@/state/useShowErrorModalState";

const {showErrorModal, errorModalTitle, errorModalMessage } = useShowErrorModalState();

const openErrorModal = (title, message) => {
    errorModalTitle.value = title;
    errorModalMessage.value = message;
    showErrorModal.value = true;
};

export default function useShowErrorModalStore() {

    return {
        openErrorModal,
    };
}
