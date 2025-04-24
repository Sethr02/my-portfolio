import { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Snackbar, Alert } from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Replace with your actual form submission logic
      // await submitForm(formData);
      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error'
      });
    }
  };

  return (
    <Box id="contact" sx={{ 
      py: 8, 
      backgroundColor: 'background.paper',
    }}>
      <Container maxWidth="sm">
        <Typography 
          variant="h2" 
          gutterBottom 
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 4
          }}
        >
          Get In Touch
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ 
            mt: 3,
            p: 3,
            backgroundColor: 'background.default',
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.name}
            helperText={errors.name}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            type="email"
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}
            error={!!errors.message}
            helperText={errors.message}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ 
              mt: 2,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            Send Message
          </Button>
        </Box>
      </Container>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
