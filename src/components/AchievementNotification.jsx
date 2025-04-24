import { Box, Paper, Typography, Slide } from '@mui/material';
import { useAchievements } from '../contexts/AchievementsContext';

const AchievementNotification = () => {
  const { showNotification } = useAchievements();

  if (!showNotification) return null;

  return (
    <Slide direction="up" in={Boolean(showNotification)}>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          zIndex: 9999,
        }}
      >
        <Box sx={{ fontSize: '2rem' }}>{showNotification.icon}</Box>
        <Box>
          <Typography variant="subtitle2" color="primary" fontWeight="bold">
            Achievement Unlocked!
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {showNotification.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {showNotification.description}
          </Typography>
        </Box>
      </Paper>
    </Slide>
  );
};

export default AchievementNotification;
