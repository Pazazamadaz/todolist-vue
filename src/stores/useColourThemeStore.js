import { ref, watch} from 'vue';
import { defineStore } from 'pinia';

export const useColourThemeStore = defineStore('colourThemeStore', () => {
    const colours = ref([]);
    const colourOption = ref('');
    const colourValue = ref('');
    const newColourOption = ref('');
    const newColourValue = ref('');
    const showColourThemeModal = ref(false);
    const updateColour = ref(false);
    const editColourIndex = ref('');

    const loadColours = () => {
        const root = document.querySelector(':root');
        const rootStyles = getComputedStyle(root);
        const predefinedVariables = [
            '--button-bgcolour',
            '--button-hover-bgcolour',
            '--button-text-colour',
            '--input-bgcolour',
            '--input-border-colour',
            '--table-header-bgcolour',
            '--table-border-colour',
            '--modal-bgcolour',
            '--modal-overlay-bgcolour',
            '--loading-spinner-colour',
            '--logout-button-bgcolour',
            '--portal-switch-button-bgcolour'
        ];

        const colourList = predefinedVariables.map((variable) => {
            return {
                optionName: variable,
                value: rootStyles.getPropertyValue(variable).trim(),
            };
        });

        colours.value = colourList;
    };

    const openColourModal = () => {
        showColourThemeModal.value = true;
    }

    watch(editColourIndex, (newValue) => {
        if (newValue !== null) {
            openColourModal();
        }
    });


    watch(updateColour, () => {
        if (updateColour.value !== false) {
            updateColour();
        }
    })

    return {
        colours,
        colourOption,
        colourValue,
        newColourOption,
        newColourValue,
        editColourIndex,
        showColourThemeModal,
        updateColour,
        loadColours,
    };
});
