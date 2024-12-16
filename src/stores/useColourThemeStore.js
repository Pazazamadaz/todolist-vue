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
        SystemDefined: false
    });

    const colourProperty = ref('');
    const colourValue = ref('');
    const showColourThemeModal = ref(false);
    const saveColour = ref(false);

    const resetColourRefs = () => {
        colourValue.value = '';
        colourProperty.value = '';
        saveColour.value = false;
    };

    const loadColours = () => {
        const root = document.documentElement;
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
            '--isadmin-text-colour',
        ];

        colourTheme.colours = predefinedVariables.map((colourProperty, colourThemeId) => ({
            colourProperty: colourProperty,
            colourValue: root.style.getPropertyValue(colourProperty).trim(),
            colourThemeId: colourThemeId
        }));
    };

    const applyThemeFromToken = (decodedToken) => {
        console.log('Decoded Token:', decodedToken);

        colourTheme.id = decodedToken['DefaultColourTheme.Id'] ? parseInt(decodedToken['DefaultColourTheme.Id'], 10) : null;
        colourTheme.userId = decodedToken['UserId'] ? parseInt(decodedToken['UserId'], 10) : null;
        colourTheme.name = decodedToken['DefaultColourTheme.Name'] || 'Default Theme';
        colourTheme.isDefault = decodedToken['DefaultColourTheme.IsDefault'] === "true";
        colourTheme.SystemDefined = decodedToken['DefaultColourTheme.SystemDefined'] === "true";
        colourTheme.isActive = decodedToken['DefaultColourTheme.IsActive'] === "true";

        // Extract and parse colour data
        const themeProperties = Object.entries(decodedToken)
            .filter(([key]) => key.startsWith('DefaultColourTheme.Colour.'))
            .map(([key, value]) => {
                const variable = key.split('.').pop();
                const [colourValue, colourThemeId] = value.split(':');

                return {
                    colourProperty: variable,
                    colourValue: colourValue.trim(), // Clean up the value
                    colourThemeId: parseInt(colourThemeId, 10),
                };
            });

        colourTheme.colours = themeProperties;

        // Apply colours to the DOM
        themeProperties.forEach(({ colourProperty, colourValue }) => {
            document.documentElement.style.setProperty(colourProperty, colourValue);
        });
    };

    const openColourModal = () => {

        const selectedColour = colourTheme.colours.find(
            ({ colourProperty: property }) => property === colourProperty.value
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
                SystemDefined: colourTheme.SystemDefined,
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
            ({ colourProperty: property }) => property === colourProperty.value
        );

        if (colourToUpdate) {
            colourToUpdate.colourValue = colourValue.value;
        }

        updateColourTheme();
        document.documentElement.style.setProperty(colourToUpdate.colourProperty, colourToUpdate.colourValue);
        showColourThemeModal.value = false;
    };

    watch(saveColour, (newValue) => {
        if (newValue === true) {
            updateColour();
        }
    });

    watch(colourProperty, (newValue) => {
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
        showColourThemeModal,
        saveColour,
        loadColours,
        applyThemeFromToken,
        updateColourTheme,
    };
});
