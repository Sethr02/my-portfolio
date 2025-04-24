import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import getTheme from './theme';
import { ColorModeContext } from './contexts/ColorModeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Experience from './components/Experience';
import CommandPalette from './components/CommandPalette';

function App() {
  const [mode, setMode] = useState('dark');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Navbar setCommandPaletteOpen={setCommandPaletteOpen} />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <CommandPalette 
            open={commandPaletteOpen} 
            onClose={() => setCommandPaletteOpen(false)} 
          />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
