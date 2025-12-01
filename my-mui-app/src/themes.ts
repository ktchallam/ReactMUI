import { createTheme, ThemeOptions } from '@mui/material/styles';

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6619d2ff',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#f73378',
      dark: '#9a0036',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2.125rem',
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
      light: '#e7b6ff',
      dark: '#8855c4',
    },
    secondary: {
      main: '#ff0080',
      light: '#ff4da6',
      dark: '#c20066',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2.125rem',
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Ocean Blue Theme
export const oceanTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0277bd',
      light: '#0288d1',
      dark: '#01579b',
    },
    secondary: {
      main: '#00897b',
      light: '#26a69a',
      dark: '#004d40',
    },
    background: {
      default: '#e0f2f1',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2.125rem',
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Forest Green Theme
export const forestTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    secondary: {
      main: '#ff6f00',
      light: '#ffb74d',
      dark: '#e65100',
    },
    background: {
      default: '#f1f8e9',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2.125rem',
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Sunset Orange Theme
export const sunsetTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e64a19',
      light: '#ff7043',
      dark: '#bf360c',
    },
    secondary: {
      main: '#fbc02d',
      light: '#ffd54f',
      dark: '#f57f17',
    },
    background: {
      default: '#fff8e1',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2.125rem',
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Purple Twilight Theme
export const purpleTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7b1fa2',
      light: '#9c27b0',
      dark: '#4a148c',
    },
    secondary: {
      main: '#c2185b',
      light: '#e91e63',
      dark: '#880e4f',
    },
    background: {
      default: '#f3e5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2.125rem',
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export type ThemeName = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset' | 'purple';

export const themes: Record<ThemeName, ReturnType<typeof createTheme>> = {
  light: lightTheme,
  dark: darkTheme,
  ocean: oceanTheme,
  forest: forestTheme,
  sunset: sunsetTheme,
  purple: purpleTheme,
};

export const themeNames: { value: ThemeName; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'ocean', label: 'Ocean Blue' },
  { value: 'forest', label: 'Forest Green' },
  { value: 'sunset', label: 'Sunset Orange' },
  { value: 'purple', label: 'Purple Twilight' },
];
