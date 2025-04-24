import { Box, Typography, Container } from '@mui/material';
import Marquee from "react-fast-marquee";

const Skills = () => {
  const technologies = [
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Expo', logo: 'https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'npm', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg' },
    { name: 'Yarn', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg' },
    { name: 'Material-UI', logo: 'https://mui.com/static/logo.png' },
  ];

  return (
    <Box id="skills" sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{ mb: 4, fontWeight: 'bold' }}
        >
          Skills & Technologies
        </Typography>
      </Container>

      <Marquee
        gradient={true}
        gradientColor={[33, 33, 33]}
        speed={50}
        pauseOnHover={true}
        autoFill={true}
      >
        {technologies.map((tech, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mx: 3,
              padding: 1,  // Add padding around the item
            }}
          >
            <Box
              component="img"
              src={tech.logo}
              alt={tech.name}
              sx={{
                width: '48px',
                height: '48px',
                opacity: 0.8,
                transition: 'opacity 0.3s, transform 0.3s',
                transformOrigin: 'center center',  // Ensure scaling happens from center
                '&:hover': {
                  opacity: 1,
                  transform: 'scale(1.1)',
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                opacity: 0.8,
              }}
            >
              {tech.name}
            </Typography>
          </Box>
        ))}
      </Marquee>
    </Box>
  );
};

export default Skills;