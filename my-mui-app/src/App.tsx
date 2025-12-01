import React, { useState, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Header from './components/Header';
import {ProgressBar} from './components/ProgressBar/ProgressBar'; 
import Footer from './components/Footer';
import LineOverview from './components/Charts/Linechart';
import Dashboard from './components/Dashboard/Dashboard';
import { ThemeProvider } from './context/ThemeContext';

const statusMessages = [
  { threshold: 0, message: 'Initiating process...' },
  { threshold: 25, message: 'Gathering required data...' },
  { threshold: 50, message: 'Processing... Halfway there!' },
  { threshold: 75, message: 'Finalizing results...' },
  { threshold: 100, message: 'Complete! Your report is ready.' },
];

function App() {
  const [progress, setProgress] = useState(0);

  // Simulate a progress update
  useEffect(() => {
    // Don't start the timer if the process is already complete
    if (progress >= 100) return;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 800); // Update every 800ms

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [progress]); // Re-run effect if progress hits 100 and we want to stop it

  const handleReset = () => {
    setProgress(0);
  };


// const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Dashboard />
        <Footer />
      </MUIThemeProvider>
    </ThemeProvider>
  );
};

export default App;