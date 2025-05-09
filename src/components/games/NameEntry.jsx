import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const NameEntry = ({ onComplete, stopPropagation }) => {
  const [name, setName] = useState('AAA');
  const [selectedChar, setSelectedChar] = useState(0);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (stopPropagation) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      switch(e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          setName(prev => {
            const arr = prev.split('');
            const currentIndex = chars.indexOf(arr[selectedChar]);
            const nextIndex = (currentIndex + 1) % chars.length;
            arr[selectedChar] = chars[nextIndex];
            return arr.join('');
          });
          break;
        case 'arrowdown':
        case 's':
          setName(prev => {
            const arr = prev.split('');
            const currentIndex = chars.indexOf(arr[selectedChar]);
            const nextIndex = (currentIndex - 1 + chars.length) % chars.length;
            arr[selectedChar] = chars[nextIndex];
            return arr.join('');
          });
          break;
        case 'arrowleft':
        case 'a':
          setSelectedChar(prev => (prev - 1 + 3) % 3);
          break;
        case 'arrowright':
        case 'd':
          setSelectedChar(prev => (prev + 1) % 3);
          break;
        case 'enter':
          onComplete(name);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyPress, { capture: true });
  }, [name, selectedChar, onComplete, stopPropagation]);

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography sx={{ mb: 2, color: '#0f0' }}>ENTER YOUR NAME</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {name.split('').map((char, i) => (
          <Typography
            key={i}
            sx={{
              fontSize: '2em',
              color: '#0f0',
              textShadow: i === selectedChar ? '0 0 10px #0f0' : 'none',
              animation: i === selectedChar ? 'blink 1s infinite' : 'none',
              '@keyframes blink': {
                '50%': {
                  opacity: 0.5,
                }
              }
            }}
          >
            {char}
          </Typography>
        ))}
      </Box>
      <Typography sx={{ mt: 2, color: '#0f0', fontSize: '0.8em' }}>
        ↑↓ CHANGE LETTER • ←→ MOVE • ENTER CONFIRM
      </Typography>
    </Box>
  );
};

export default NameEntry;
