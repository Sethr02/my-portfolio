import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, Snackbar, Alert } from '@mui/material';
import getTheme from './theme';
import { ColorModeContext } from './contexts/ColorModeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Experience from './components/Experience';
import { useKonamiCode } from './hooks/useKonamiCode';
import GameModal from './components/games/GameModal';
import SnakeGame from './components/games/SnakeGame';
import PixelSnake from './components/PixelSnake';
import gameStartSound from '../public/sounds/start.mp3';

function App() {
  const [mode, setMode] = useState('dark');
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [showUnlockAlert, setShowUnlockAlert] = useState(false);
  const [isKonamiCode, setIsKonamiCode] = useKonamiCode();
  const [showSnakeIcon, setShowSnakeIcon] = useState(false);
  const [hasPlayedSound, setHasPlayedSound] = useState(false);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  // Handle Konami code detection
  useMemo(() => {
    if (isKonamiCode) {
      setShowUnlockAlert(true);
      setTimeout(() => setIsGameOpen(true), 1000);
      setIsKonamiCode(false);
    }
  }, [isKonamiCode, setIsKonamiCode]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const shouldShowIcon = documentHeight - (scrollTop + windowHeight) < 100;
      setShowSnakeIcon(shouldShowIcon);
      
      // Play sound when showing icon for the first time
      if (shouldShowIcon && !hasPlayedSound) {
        const audio = new Audio(gameStartSound);
        audio.volume = 0.05; // Set volume to 30%
        audio.play();
        setHasPlayedSound(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasPlayedSound]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          
          <Box sx={{ 
            position: 'fixed', 
            bottom: 16, 
            right: 16,
            zIndex: 10,
            opacity: showSnakeIcon ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: showSnakeIcon ? 'auto' : 'none',
            cursor: 'pointer',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: '50%',
              animation: 'pulse 3s ease-in-out infinite',
              opacity: 0.6,
              pointerEvents: 'none'
            },
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(1)',
                opacity: 0.6,
              },
              '50%': {
                transform: 'scale(1.15)',
                opacity: 0.3,
              },
              '100%': {
                transform: 'scale(1)',
                opacity: 0.6,
              },
            },
          }}>
            <PixelSnake onClick={() => setIsGameOpen(true)} />
          </Box>

          <GameModal
            open={isGameOpen}
            onClose={() => setIsGameOpen(false)}
          >
            <SnakeGame />
          </GameModal>
          
          <Snackbar
            open={showUnlockAlert}
            autoHideDuration={3000}
            onClose={() => setShowUnlockAlert(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert 
              severity="success" 
              variant="filled"
              sx={{ 
                fontFamily: '"Press Start 2P", cursive',
                '& .MuiAlert-message': { fontSize: '0.8rem' }
              }}
            >
              🕹️ Game Mode Unlocked!
            </Alert>
          </Snackbar>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
