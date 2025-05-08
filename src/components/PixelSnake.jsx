import { Box, IconButton, Tooltip } from '@mui/material';
import { useState, useRef, useEffect } from 'react';

const PixelSnake = ({ onClick }) => {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState(0);

  const draw = (ctx, offset) => {
    ctx.clearRect(0, 0, 16, 16);
    
    // Create a wave-like movement pattern
    const baseY = 6;
    const pixels = [];
    for (let i = 0; i < 8; i++) {
      const x = (4 + i) % 16;
      const y = baseY + Math.sin((offset + i) * 0.5) * 2;
      pixels.push([x, y]);
    }
    
    // Draw snake with gradient colors
    pixels.forEach(([x, y], index) => {
      ctx.fillStyle = `rgb(0, ${155 + index * 12}, 0)`;
      ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const animate = () => {
      setPosition(prev => (prev + 0.1) % (Math.PI * 2));
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    draw(ctx, position);
  }, [position]);

  return (
    <Tooltip title="Snake" arrow placement="left">
      <IconButton
        onClick={onClick}
        sx={{
          p: 1,
          opacity: 0.7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            opacity: 1,
            transform: 'scale(1.1)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
          }}
        >
          <canvas
            ref={canvasRef}
            width="16"
            height="16"
            style={{
              width: '24px',
              height: '24px',
              imageRendering: 'pixelated',
              display: 'block',
            }}
          />
        </Box>
      </IconButton>
    </Tooltip>
  );
};

export default PixelSnake;
