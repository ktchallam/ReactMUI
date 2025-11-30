import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CardGrid from './CardGrid';

// Create a default theme for testing
const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('CardGrid Component', () => {
  
  it('should render the component without crashing', () => {
    renderWithTheme(<CardGrid />);
    expect(screen.getByText('Our Features')).toBeInTheDocument();
  });

  it('should render the correct heading', () => {
    renderWithTheme(<CardGrid />);
    const heading = screen.getByRole('heading', { name: 'Our Features' });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('MuiTypography-h4');
  });

  it('should render three cards', () => {
    renderWithTheme(<CardGrid />);
    const cards = screen.getAllByRole('article'); // MUI Card uses article role
    expect(cards).toHaveLength(3);
  });

  it('should render all card titles', () => {
    renderWithTheme(<CardGrid />);
    expect(screen.getByText('Fast')).toBeInTheDocument();
    expect(screen.getByText('Responsive')).toBeInTheDocument();
    expect(screen.getByText('Accessible')).toBeInTheDocument();
  });

  it('should render all card descriptions', () => {
    renderWithTheme(<CardGrid />);
    expect(screen.getByText('Lightning-fast performance with optimized rendering')).toBeInTheDocument();
    expect(screen.getByText('Beautiful on all devices with responsive design')).toBeInTheDocument();
    expect(screen.getByText('Built with accessibility in mind for everyone')).toBeInTheDocument();
  });

  it('should render Learn More buttons for each card', () => {
    renderWithTheme(<CardGrid />);
    const buttons = screen.getAllByRole('button', { name: /Learn More/i });
    expect(buttons).toHaveLength(3);
  });

  it('should render star icons for each card', () => {
    renderWithTheme(<CardGrid />);
    // StarIcon renders as SVG with specific title
    const starIcons = document.querySelectorAll('[data-testid="StarIcon"]');
    expect(starIcons.length).toBeGreaterThan(0);
  });

  it('should have correct structure with Container', () => {
    const { container } = renderWithTheme(<CardGrid />);
    const containerElement = container.querySelector('.MuiContainer-root');
    expect(containerElement).toBeInTheDocument();
  });

  it('should render cards in a responsive grid', () => {
    const { container } = renderWithTheme(<CardGrid />);
    const gridBox = container.querySelector('[style*="display: grid"]');
    expect(gridBox).toBeInTheDocument();
  });

  it('should have correct card count matching data', () => {
    renderWithTheme(<CardGrid />);
    // Check that we have 3 card titles (one per card)
    const titles = screen.getByText('Fast');
    const responsive = screen.getByText('Responsive');
    const accessible = screen.getByText('Accessible');
    
    expect(titles).toBeInTheDocument();
    expect(responsive).toBeInTheDocument();
    expect(accessible).toBeInTheDocument();
  });

  it('should apply correct typography variant to heading', () => {
    renderWithTheme(<CardGrid />);
    const heading = screen.getByText('Our Features');
    expect(heading).toHaveClass('MuiTypography-h4');
  });

  it('should render button with correct size and color', () => {
    renderWithTheme(<CardGrid />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('MuiButton-sizeSmall');
      expect(button).toHaveClass('MuiButton-colorPrimary');
    });
  });
});
