import React from 'react';
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface CardItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CardGrid: React.FC = () => {
  const cards: CardItem[] = [
    {
      id: 1,
      title: 'Fast',
      description: 'Lightning-fast performance with optimized rendering',
      icon: <StarIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      id: 2,
      title: 'Responsive',
      description: 'Beautiful on all devices with responsive design',
      icon: <StarIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      id: 3,
      title: 'Accessible',
      description: 'Built with accessibility in mind for everyone',
      icon: <StarIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Our Features
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 4,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Box sx={{ mb: 2 }}>{card.icon}</Box>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default CardGrid;