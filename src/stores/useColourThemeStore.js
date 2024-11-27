import { ref, reactive, watch } from 'vue';
import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useColourThemeStore = defineStore('colourThemeStore', () => {
    const colourTheme = reactive({
        id: null,
        name: '',
        colours: [
            {
                colourProperty: '',
                colourValue: '',
            }
        ],
    });

    const colourProperty = ref('');
    const colourValue = ref('');
    const showColourThemeModal = ref(false);
    const saveColour = ref(false);
    const editColourIndex = ref('');

    const resetColourRefs = () => {
        colourValue.value = '';
        colourProperty.value = '';
        saveColour.value = false;
        editColourIndex.value = '';
    };

    const loadColours = () => {
        const root = document.documentElement;
        //const rootStyles = getComputedStyle(root);
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
            '--portal-switch-button-bgcolour',
        ];

        colourTheme.colours = predefinedVariables.map((variable) => ({
            colourProperty: variable,
            colourValue: root.style.getPropertyValue(variable).trim(),
        }));
    };

    const applyThemeFromToken = (decodedToken) => {
        console.log('Decoded Token:', decodedToken);

        colourTheme.id = decodedToken['DefaultColourTheme.Id'] || null;
        colourTheme.name = decodedToken['DefaultColourTheme.Name'] || 'Default Theme';

        // Populate the colours array
        const themeProperties = Object.entries(decodedToken)
            .filter(([key]) => key.startsWith('DefaultColourTheme.Colour.'))
            .map(([key, value]) => {
                const variable = key.split('.').pop();
                return {
                    colourProperty: variable,
                    colourValue: value,
                };
            });

        colourTheme.colours = themeProperties;

        themeProperties.forEach(({ colourProperty, colourValue }) => {
            document.documentElement.style.setProperty(colourProperty, colourValue);
        });
    };

    const openColourModal = () => {
        colourProperty.value = editColourIndex.value;
        const selectedColour = colourTheme.colours.find(
            ({ colourProperty }) => colourProperty === editColourIndex.value
        );
        ({ colourValue: colourValue.value } = selectedColour);
        showColourThemeModal.value = true;
    };

    const updateColourTheme = async () => {
        try {
            // Prepare the colour theme object for saving
            const theme = {
                id: colourTheme.id,
                name: colourTheme.name,
                colours: colourTheme.colours.map(({ colourProperty, colourValue }) => ({
                    name: colourProperty,
                    value: colourValue,
                })),
            };

            await http.put('/api/ColourTheme', theme);

            console.log('Colour theme updated successfully');
            //loadColours(); // Refresh local colours
        } catch (error) {
            console.error('Failed to update colour theme:', error);
            throw error;
        }
    };

    const updateColour = () => {
        // Update the selected colour in the reactive theme object
        const colourToUpdate = colourTheme.colours.find(
            ({ colourProperty }) => colourProperty === colourProperty.value
        );

        if (colourToUpdate) {
            colourToUpdate.colourProperty = colourValue.value;
        }

        showColourThemeModal.value = false;
        updateColourTheme();
    };

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
    });

    return {
        colourTheme,
        colourProperty,
        colourValue,
        editColourIndex,
        showColourThemeModal,
        saveColour,
        loadColours,
        applyThemeFromToken,
        updateColourTheme,
    };
});
