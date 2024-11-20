import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useColourThemeStore = defineStore('colourThemeStore', () => {
    const colours = ref([]);
    const showColourThemeModal = ref(false);

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
                option: variable,
                value: rootStyles.getPropertyValue(variable).trim(),
            };
        });

        colours.value = colourList;
    };

    return {
        colours,
        showColourThemeModal,
        loadColours,
    };
});
