import { Box, Typography, Container, Button, Stack, useTheme, Grid } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ParticleBackground from './ParticleBackground';
import Terminal from './Terminal';

const Hero = () => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [degreeText, setDegreeText] = useState('');
  const [textComplete, setTextComplete] = useState(false);
  const [degreeTextComplete, setDegreeTextComplete] = useState(false);
  const fullText = "Software Engineer";
  const degreeFullText = "BSc Computer Science";
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0], {
    smooth: 0.2
  });

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    let degreeCurrentText = '';
    let degreeCurrentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setText(currentText);
        currentIndex++;
      } else {
        setTextComplete(true);
        if (degreeCurrentIndex < degreeFullText.length) {
          degreeCurrentText += degreeFullText[degreeCurrentIndex];
          setDegreeText(degreeCurrentText);
          degreeCurrentIndex++;
        } else {
          setDegreeTextComplete(true);
          clearInterval(interval);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      component={motion.div}
      style={{ 
        opacity,
        willChange: 'opacity',
        transform: 'translateZ(0)'
      }}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        overflow: 'hidden',
        pt: { xs: '56px', sm: '64px' },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: theme => theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)'
            : 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          animation: 'moveBackground 15s linear infinite',
          opacity: 0.5,
        },
        '@keyframes moveBackground': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(-20px) translateY(-20px)' },
        },
      }}
    >
      <ParticleBackground />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Stack spacing={4}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Typography 
                  variant="h1" 
                  component={motion.h1}
                  sx={{ 
                    fontSize: { xs: '3rem', md: '4.5rem' },
                    fontWeight: 700,
                    background: theme => theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #60a5fa, #e879f9)'
                      : 'linear-gradient(45deg, #1e40af, #7e22ce)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 2,
                  }}
                >
                  Hi, I'm Seth
                </Typography>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    mb: 1,
                    color: theme => theme.palette.mode === 'dark' 
                      ? 'grey.300'
                      : 'grey.800',
                    fontWeight: 500,
                  }}
                >
                  {text}
                  {!textComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                    >
                      |
                    </motion.span>
                  )}
                </Typography>
                <Typography 
                  variant="h4"
                  sx={{ 
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    mb: 4,
                    color: theme => theme.palette.mode === 'dark' 
                      ? 'grey.400'
                      : 'grey.700',
                    fontWeight: 400,
                  }}
                >
                  {degreeText}
                  {!degreeTextComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                    >
                      |
                    </motion.span>
                  )}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button 
                    variant="contained" 
                    size="large"
                    href="#projects"
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      background: theme => theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #60a5fa, #e879f9)'
                        : 'linear-gradient(45deg, #1e40af, #7e22ce)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    View My Work
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    href="#contact"
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Contact Me
                  </Button>
                </Stack>
              </motion.div>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Terminal />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <KeyboardArrowDownIcon 
          sx={{ 
            fontSize: 40,
            opacity: 0.7,
            color: theme => theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          }} 
        />
      </motion.div>
    </Box>
  );
};

export default Hero;
