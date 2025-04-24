import { Box, Typography, Container } from '@mui/material';

const About = () => {
  return (
    <Box id="about" sx={{ py: 8 }}>
      <Container>
        <Typography variant="h2" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" paragraph>
          I'm a passionate software developer with a strong foundation in web development and a keen eye for creating elegant, user-friendly solutions. With expertise in modern technologies and best practices, I strive to build applications that make a difference.
        </Typography>
        <Typography variant="body1" paragraph>
          My journey in software development began with a deep curiosity for technology, which has evolved into a professional career focused on creating robust and scalable applications. I specialize in full-stack development, with particular expertise in React, Node.js, and modern web technologies.
        </Typography>
        <Typography variant="body1" paragraph>
          When I'm not coding, I enjoy staying up-to-date with the latest tech trends, contributing to open-source projects, and sharing knowledge with the developer community. I believe in writing clean, maintainable code and approaching each project with creativity and attention to detail.
        </Typography>
      </Container>
    </Box>
  );
};

export default About;
