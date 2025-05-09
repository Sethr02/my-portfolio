import { Box, Typography } from '@mui/material';

const LeaderboardDisplay = ({ entries }) => {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h6" sx={{ color: '#0f0', mb: 1 }}>Leaderboard</Typography>
      {entries.map((entry, index) => (
        <Typography 
          key={index}
          sx={{ 
            color: '#0f0',
            opacity: 1 - (index * 0.15),
            fontSize: '0.9em',
            mb: 0.5,
            fontFamily: '"Press Start 2P", monospace',
          }}
        >
          {entry.name} - {entry.score} pts
        </Typography>
      ))}
    </Box>
  );
};

export default LeaderboardDisplay;
