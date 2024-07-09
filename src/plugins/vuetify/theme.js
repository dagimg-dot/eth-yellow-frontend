import { useStorage } from "@vueuse/core";

// set theme to light in the local storage
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
}
   
export const staticPrimaryColor = "#DDDF00";
const currentTheme = useStorage("theme");

const theme = {
  defaultTheme: currentTheme || "light",
  themes: {
    light: {
      dark: false,
      colors: {
        primary: "#DDDF00",
        "on-primary": "#fff",
        secondary: "#8592A3",
        "on-secondary": "#fff",
        success: "#71DD37",
        "on-success": "#fff",
        info: "#03C3EC",
        "on-info": "#fff",
        warning: "#FFAB00",
        "on-warning": "#fff",
        error: "#FF3E1D",
        background: "#F5F5F9",
        "on-background": "#32475C",
        "on-surface": "#32475C",
        "grey-50": "#FAFAFA",
        "grey-100": "#EBEEF0",
        "grey-200": "#EEEEEE",
        "grey-300": "#E0E0E0",
        "grey-400": "#BDBDBD",
        "grey-500": "#9E9E9E",
        "grey-600": "#757575",
        "grey-700": "#616161",
        "grey-800": "#424242",
        "grey-900": "#212121",
        "perfect-scrollbar-thumb": "#DBDADE",
        "skin-bordered-background": "#fff",
        "skin-bordered-surface": "#fff",
      },
      variables: {
        "code-color": "#d400ff",
        "overlay-scrim-background": "#32475C",
        "overlay-scrim-opacity": 0.5,
        "border-color": "#32475C",
        "snackbar-background": "#32475C",
        "snackbar-color": "#ffffff",
        "tooltip-background": "#262732",
        "tooltip-opacity": 0.9,
        "table-header-background": "#F5F5F7",

        // Shadows
        "shadow-key-umbra-opacity": "rgba(var(--v-theme-on-surface), 0.06)",
        "shadow-key-penumbra-opacity": "rgba(var(--v-theme-on-surface), 0.04)",
        "shadow-key-ambient-opacity": "rgba(var(--v-theme-on-surface), 0.02)",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#DDDF00",
        "on-primary": "#fff",
        secondary: "#8592A3",
        "on-secondary": "#fff",
        success: "#71DD37",
        "on-success": "#fff",
        info: "#03C3EC",
        "on-info": "#fff",
        warning: "#FFAB00",
        "on-warning": "#fff",
        error: "#FF3E1D",
        background: "#232333",
        "on-background": "#DBDBEB",
        surface: "#2B2C40",
        "on-surface": "#DBDBEB",
        "grey-50": "#2A2E42",
        "grey-100": "#444463",
        "grey-200": "#4A5072",
        "grey-300": "#5E6692",
        "grey-400": "#7983BB",
        "grey-500": "#8692D0",
        "grey-600": "#AAB3DE",
        "grey-700": "#B6BEE3",
        "grey-800": "#CFD3EC",
        "grey-900": "#E7E9F6",
        "perfect-scrollbar-thumb": "#4A5072",
        "skin-bordered-background": "#2b2c40",
        "skin-bordered-surface": "#2b2c40",
      },
      variables: {
        "code-color": "#d400ff",
        "overlay-scrim-background": "#0D0E24",
        "overlay-scrim-opacity": 0.6,
        "border-color": "#DBDBEB",
        "snackbar-background": "#DBDBEB",
        "snackbar-color": "#2B2C40",
        "tooltip-background": "#464A65",
        "tooltip-opacity": 0.9,
        "table-header-background": "#3A3E5B",

        // Shadows
        "shadow-key-umbra-opacity": "rgba(20, 21, 33, 0.06)",
        "shadow-key-penumbra-opacity": "rgba(20, 21, 33, 0.04)",
        "shadow-key-ambient-opacity": "rgba(20, 21, 33, 0.02)",
      },
    },
  },
};

export default theme;
