// Dashboard specific themes
export const dashboardLightTheme = {
  background: '#ffffff',
  cardBackground: '#f5f5f5',
  cardBorder: '#e0e0e0',
  textPrimary: '#333333',
  textSecondary: '#666666',
  chartLine1: '#050247ff',
  chartLine2: '#e10958ff',
  chartBar: '#e10958ff',
  statsCard1: '#f0f4ff',
  statsCard2: '#fff0f0',
  statsCard3: '#f0fff0',
  statsCard4: '#fff3e0',
  accent: '#6619d2ff',
};

export const dashboardDarkTheme = {
  background: '#1a1a1a',
  cardBackground: '#2d2d2d',
  cardBorder: '#404040',
  textPrimary: '#ffffff',
  textSecondary: '#b0b0b0',
  chartLine1: '#bb86fc',
  chartLine2: '#ff0080',
  chartBar: '#ff0080',
  statsCard1: '#1e3a5f',
  statsCard2: '#5f1e1e',
  statsCard3: '#1e5f1e',
  statsCard4: '#5f4a1e',
  accent: '#bb86fc',
};

export const dashboardOceanTheme = {
  background: '#e0f2f1',
  cardBackground: '#b2dfdb',
  cardBorder: '#80cbc4',
  textPrimary: '#00695c',
  textSecondary: '#004d40',
  chartLine1: '#0277bd',
  chartLine2: '#00897b',
  chartBar: '#00897b',
  statsCard1: '#b3e5fc',
  statsCard2: '#c8e6c9',
  statsCard3: '#80deea',
  statsCard4: '#ffe0b2',
  accent: '#0277bd',
};

export type DashboardTheme = typeof dashboardLightTheme;
export type DashboardThemeName = 'light' | 'dark' | 'ocean';

export const dashboardThemes: Record<DashboardThemeName, DashboardTheme> = {
  light: dashboardLightTheme,
  dark: dashboardDarkTheme,
  ocean: dashboardOceanTheme,
};

export const dashboardThemeNames: { value: DashboardThemeName; label: string }[] = [
  { value: 'light', label: '☀️ Light' },
  { value: 'dark', label: '🌙 Dark' },
  { value: 'ocean', label: '🌊 Ocean' },
];
