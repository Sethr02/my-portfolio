import { Box, Typography, Container, Paper, useTheme, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const Experience = () => {
  const theme = useTheme();
  
  const experiences = [
    {
      title: "Full Stack Software Engineer",
      company: "MarkIT Evolution",
      period: "January 2024 — December 2024",
      description: [
        "Utilizing tool such as Azure Devops, Visual Studio, Visual Studio Code",
        "Developing and Maintaining an implementation of the call pay payment gateway API",
        "Developing and Maintaining ASP.NET Core web app",
        "Developing and Maintaining wordpress php plugin"
      ],
      technologies: ["ASP.NET Core", "Azure DevOps", "PHP", "WordPress"],
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      color: "#2196f3"
    },
    {
      title: "Full Stack Software Engineer",
      company: "DRAM Consulting",
      period: "January 2023 — December 2023",
      description: [
        "Developed and maintained cross-platform mobile apps using Xamarin, adding features and ensuring stability",
        "Built web applications with ASP.NET Framework, focusing on backend logic and performance",
        "Provided top-tier customer support, diagnosing and resolving issues promptly"
      ],
      technologies: ["Xamarin", "ASP.NET", "C#", "Mobile Development"],
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      color: "#4caf50"
    },
    {
      title: "Junior Developer",
      company: "StartUp Vista",
      period: "2019 - 2020",
      description: [
        "Developed responsive web interfaces with 98% customer satisfaction",
        "Optimized database queries resulting in 40% faster page loads",
        "Implemented automated testing reducing bugs by 60%"
      ],
      technologies: ["JavaScript", "HTML/CSS", "React", "Firebase"],
      icon: <RocketLaunchIcon sx={{ fontSize: 40 }} />,
      color: "#ff9800"
    }
  ];

  return (
    <Box 
      id="experience" 
      sx={{ 
        py: 10,
        backgroundColor: 'background.default',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component={motion.h2}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          align="center" 
          gutterBottom
          sx={{ mb: 8, fontWeight: 800, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', 
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Professional Journey
        </Typography>

        <Box sx={{ position: 'relative' }}>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  mb: 6,
                  borderRadius: 3,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'background.paper',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[10],
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton
                    sx={{
                      mr: 2,
                      backgroundColor: exp.color,
                      '&:hover': { backgroundColor: exp.color },
                    }}
                  >
                    {exp.icon}
                  </IconButton>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: exp.color }}>
                      {exp.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                      {exp.company} | {exp.period}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ ml: 7 }}>
                  {exp.description.map((desc, i) => (
                    <Typography
                      key={i}
                      variant="body1"
                      sx={{
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        '&:before': {
                          content: '"•"',
                          mr: 1,
                          color: exp.color
                        }
                      }}
                    >
                      {desc}
                    </Typography>
                  ))}
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {exp.technologies.map((tech, i) => (
                      <Typography
                        key={i}
                        variant="caption"
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: 5,
                          backgroundColor: `${exp.color}22`,
                          color: exp.color,
                          border: `1px solid ${exp.color}44`,
                          fontWeight: 500
                        }}
                      >
                        {tech}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Experience;
