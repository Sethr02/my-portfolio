import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Stack, IconButton, Link, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { motion } from 'framer-motion';

const techLogos = {
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'Material-UI': 'https://mui.com/static/logo.png',
  'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
};

const Projects = () => {
  const projects = [
    {
      title: 'Naruto Filler Guide',
      description: 'A comprehensive guide built with ReactJS that helps fans identify and skip filler episodes in the Naruto anime series. Features a clean interface and episode filtering capabilities.',
      image: '/public/naruto-filler-guide.png',
      tags: ['React', 'JavaScript', 'CSS', 'Material-UI'],
      github: 'https://github.com/Sethr02/naruto_filler_guide_reactjs',
      demo: 'https://naruto-episode-guide.netlify.app',
      featured: true
    },
    {
      title: 'Valorant Account Vault',
      description: 'A secure account management system for Valorant players, featuring user authentication, account tracking, and personalized statistics. Built with modern web technologies for a seamless experience.',
      image: '/public/naruto-filler-guide.png',
      tags: ['React', 'JavaScript', 'Firebase', 'Material-UI', 'Redux'],
      github: 'https://github.com/Sethr02/val-acc-vault',
      demo: 'https://val-acc-vault.netlify.app',
      featured: true
    },
    {
      title: 'AI Image Generator',
      description: 'Leverages machine learning APIs to generate unique artwork. Features include style transfer and image manipulation tools.',
      image: '/public/naruto-filler-guide.png',
      tags: ['React', 'JavaScript', 'Firebase', 'Material-UI', 'Redux'],
      github: 'https://github.com/yourusername/ai-generator',
      demo: 'https://your-ai-generator.com'
    }
  ];

  return (
    <Box
      id="projects"
      sx={{
        py: 12,
        pt: 0,
        backgroundColor: 'background.default',
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              mb: 8,
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Projects
          </Typography>
        </motion.div>
        <Grid container spacing={6}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: 500,
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 2,
                    '&:hover': {
                      '& .project-content': {
                        height: 'calc(100% - 80px)',
                      },
                      '& .tech-stack': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      }
                    },
                  }}
                >
                  <Box
                    className="project-content"
                    sx={{
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-out',
                      backgroundColor: 'background.paper',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={project.image}
                      alt={project.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Typography gutterBottom variant="h5" component="h3" fontWeight="bold">
                          {project.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 3 }}
                          paragraph
                        >
                          {project.description}
                        </Typography>
                      </motion.div>
                      <Stack direction="row" spacing={2}>
                        <IconButton
                          component={Link}
                          href={project.github}
                          target="_blank"
                          aria-label="GitHub"
                          size="small"
                        >
                          <GitHubIcon />
                        </IconButton>
                        <IconButton
                          component={Link}
                          href={project.demo}
                          target="_blank"
                          aria-label="Live Demo"
                          size="small"
                        >
                          <LaunchIcon />
                        </IconButton>
                      </Stack>
                    </CardContent>
                  </Box>
                  <Stack
                    className="tech-stack"
                    direction="row"
                    spacing={2}
                    sx={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: '80px',
                      backgroundColor: 'background.paper',
                      borderTop: 1,
                      borderColor: 'divider',
                      p: 2,
                      opacity: 0,
                      transform: 'translateY(80px)',
                      transition: 'all 0.3s ease-out',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}
                  >
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, x: 20, rotateY: 90 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ 
                          duration: 0.4,
                          delay: tagIndex * 0.15,
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <Tooltip title={tag} placement="bottom" arrow>
                          <Box
                            component="img"
                            src={techLogos[tag]}
                            alt={tag}
                            sx={{
                              width: '32px',
                              height: '32px',
                              transition: 'transform 0.2s ease-in-out',
                              '&:hover': {
                                transform: 'scale(1.2) rotate(5deg)'
                              }
                            }}
                          />
                        </Tooltip>
                      </motion.div>
                    ))}
                  </Stack>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
