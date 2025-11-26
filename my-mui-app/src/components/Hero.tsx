import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  padding: theme.spacing(8, 2),
  textAlign: 'center',
}));

const Hero: React.FC = () => {
  return (
    <HeroBox>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to MUI React TypeScript App
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Build amazing applications with Material-UI and TypeScript
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" color="secondary" size="large">
            Get Started
          </Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} size="large">
            Learn More
          </Button>
        </Box>
      </Container>
    </HeroBox>
  );
};

export default Hero;