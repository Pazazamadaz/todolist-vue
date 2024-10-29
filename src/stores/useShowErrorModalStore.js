import { ref } from 'vue';

const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');

const openErrorModal = (title, message) => {
    modalTitle.value = title;
    modalMessage.value = message;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

export default function useShowErrorModalStore() {

    return {
        showModal,
        modalTitle,
        modalMessage,
        openErrorModal,
        closeModal
    };
}
