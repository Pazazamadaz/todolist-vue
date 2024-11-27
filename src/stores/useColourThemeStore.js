import { ref, reactive, watch } from 'vue';
import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useColourThemeStore = defineStore('colourThemeStore', () => {
    const colourTheme = reactive({
        id: null,
        userId: null,
        name: '',
        colours: [
            {
                colourProperty: '',
                colourValue: '',
                colourThemeId: null,
            }
        ],
        isActive: false,
        isDefault: false,
        isSystemDefined: false
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

        colourTheme.colours = predefinedVariables.map((colourProperty, colourThemeId) => ({
            colourProperty: colourProperty,
            colourValue: root.style.getPropertyValue(colourProperty).trim(),
            colourThemeId: colourThemeId
        }));
    };

    const applyThemeFromToken = (decodedToken) => {
        console.log('Decoded Token:', decodedToken);

        // Assign top-level properties from the token
        colourTheme.id = decodedToken['DefaultColourTheme.Id'] || null;
        colourTheme.userId = decodedToken['UserId'] || null;
        colourTheme.name = decodedToken['DefaultColourTheme.Name'] || 'Default Theme';
        colourTheme.isDefault = decodedToken['DefaultColourTheme.IsDefault'];
        colourTheme.isSystemDefined = decodedToken['DefaultColourTheme.IsSystemDefined'];
        colourTheme.isActive = decodedToken['DefaultColourTheme.IsActive']

        // Extract and parse colour data
        const themeProperties = Object.entries(decodedToken)
            .filter(([key]) => key.startsWith('DefaultColourTheme.Colour.')) // Only colour-related claims
            .map(([key, value]) => {
                const variable = key.split('.').pop(); // Extract colourProperty (e.g., '--button-bgcolour')
                const [colourValue, colourThemeId] = value.split(':'); // Extract colourValue and colourThemeId

                return {
                    colourProperty: variable,
                    colourValue: colourValue.trim(), // Clean up the value
                    colourThemeId: parseInt(colourThemeId, 10), // Parse as integer
                };
            });

        colourTheme.colours = themeProperties;

        // Apply colours to the DOM
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
                userId: colourTheme.userId,
                name: colourTheme.name,
                colours: colourTheme.colours.map(({ colourProperty, colourValue, colourThemeId }) => ({
                    colourProperty: colourProperty,
                    colourValue: colourValue,
                    colourThemeId: colourThemeId
                })),
                isActive: colourTheme.isActive,
                isSystemDefined: colourTheme.isSystemDefined,
                isDefault: colourTheme.isDefault
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
        const colourToUpdate = colourTheme.colours.find(
            ({colourProperty}) => colourProperty.value === colourProperty.value
        );

        if (colourToUpdate) {
            colourToUpdate.colourValue = colourValue.value;
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
