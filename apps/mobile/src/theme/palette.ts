export const palette = {
  light: {
    backgroundPrimary: "#F5F7FA",
    backgroundSurface: "#FFFFFF",
    textPrimary: "#14245F",
    textSecondary: "#62708A",
    accentPrimary: "#17358C",
    accentSuccess: "#12B76A",
    accentWarning: "#F2634B",
    borderSubtle: "#E2E8F0"
  },
  dark: {
    backgroundPrimary: "#0D1226",
    backgroundSurface: "#17203D",
    textPrimary: "#F4F7FF",
    textSecondary: "#A5B1CC",
    accentPrimary: "#4F6EDB",
    accentSuccess: "#32D583",
    accentWarning: "#FF8A65",
    borderSubtle: "#243150"
  }
} as const;

export type ThemeName = keyof typeof palette;
