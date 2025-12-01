import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface FooterLink {
  label: string;
  href: string;
}

const Footer: React.FC = () => {
  const theme = useTheme();
  
  const links: FooterLink[] = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
        padding: theme.spacing(4, 2),
        marginTop: 'auto',
        position: 'flexible',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            © 2024 My MUI App. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;