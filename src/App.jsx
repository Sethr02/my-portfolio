import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import getTheme from './theme';
import { ColorModeContext } from './contexts/ColorModeContext';
import { AchievementsProvider } from './contexts/AchievementsContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Experience from './components/Experience';
import AchievementNotification from './components/AchievementNotification';

function App() {
  const [mode, setMode] = useState('dark');
  
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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AchievementsProvider>
          <CssBaseline />
          <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
            <AchievementNotification />
          </Box>
        </AchievementsProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
