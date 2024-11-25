import { ref, watch} from 'vue';
import { defineStore } from 'pinia';

export const useColourThemeStore = defineStore('colourThemeStore', () => {
    const colours = ref([]);
    const colourOption = ref('');
    const colourValue = ref('');
    const newColourOption = ref('');
    const newColourValue = ref('');
    const showColourThemeModal = ref(false);
    const saveColour = ref(false);
    const editColourIndex = ref('');

    const resetColourRefs = () => {
        colourValue.value = '';
        colourOption.value = '';
        saveColour.value = false;
        editColourIndex.value = '';
    }

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

        let colourList;
        colourList = predefinedVariables.map((variable) => {
            return {
                optionName: variable,
                optionValue: rootStyles.getPropertyValue(variable).trim(),
            };
        });

        colours.value = colourList;
    };

    const applyThemeFromToken = (decodedToken) => {
        console.log('Decoded Token:', decodedToken);

        const themeName = decodedToken['DefaultColourTheme.Name'];
        console.log('Theme Name:', themeName);

        if (themeName !== 'Default Theme') {
            const themeProperties = Object.entries(decodedToken)
                .filter(([key]) => key.startsWith('DefaultColourTheme.Colour.'))
                .map(([key, value]) => {
                    const variable = key.split('.').pop(); // Extract the variable name
                    return [variable, value];
                });

            themeProperties.forEach(([variable, value]) => {
                document.documentElement.style.setProperty(`${variable}`, value); // Set as global CSS variable
            });
        } else {
            console.log('Default Theme detected. No properties applied.');
        }
    };

    const openColourModal = () => {
        colourOption.value = editColourIndex.value;
        const selectedColour = colours.value.find(
            ({optionName}) => optionName === editColourIndex.value
        );
        ({optionValue: colourValue.value} = selectedColour);
        showColourThemeModal.value = true;
    }

    const updateColour = () => {
        document.documentElement.style.setProperty(colourOption.value, colourValue.value);
        loadColours();
        showColourThemeModal.value = false;
    }

    watch(saveColour, (newValue) => {
        if (newValue === true) {
            updateColour();
        }
    });

    watch(editColourIndex, (newValue) => {
        if (newValue !== '') {
            openColourModal();
        }
    });

    watch(showColourThemeModal, (newValue) => {
        if (newValue === false) {
            resetColourRefs();
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
        saveColour,
        loadColours,
        applyThemeFromToken
    };
});
