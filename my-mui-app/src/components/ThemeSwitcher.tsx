import React from 'react';
import { Box, Paper, Button, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WaterIcon from '@mui/icons-material/Water';
import { useThemeContext } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { currentTheme, setTheme } = useThemeContext();

  const themes = [
    { value: 'light' as const, label: 'Light', icon: LightModeIcon },
    { value: 'dark' as const, label: 'Dark', icon: DarkModeIcon },
    { value: 'ocean' as const, label: 'Ocean', icon: WaterIcon },
  ];

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
      <Box sx={{ mr: 2, fontWeight: 'bold', fontSize: '0.9rem' }}>Theme:</Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {themes.map((theme) => {
          const IconComponent = theme.icon;
          return (
            <Tooltip key={theme.value} title={theme.label}>
              <Button
                onClick={() => setTheme(theme.value)}
                variant={currentTheme === theme.value ? 'contained' : 'outlined'}
                sx={{
                  minWidth: '44px',
                  width: '44px',
                  height: '44px',
                  padding: 0,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <IconComponent sx={{ fontSize: '1.5rem' }} />
              </Button>
            </Tooltip>
          );
        })}
      </Box>
    </Paper>
  );
}
