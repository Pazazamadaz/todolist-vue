import { ref } from 'vue';
import { debounce } from '@/utils/debouncer';

const showLoadingModal = ref(false);

const openLoadingModal = debounce(() => {
    showLoadingModal.value = true;
}, 500);
//
const closeLoadingModal = debounce(() => {
    showLoadingModal.value = false;
}, 500);

export default function useShowLoadingModalStore() {
    return {
        showLoadingModal,
        openLoadingModal,
        closeLoadingModal
    };
}
