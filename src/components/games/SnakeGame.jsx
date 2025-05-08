import { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5; // Speed increases by 2ms per food eaten
const MIN_SPEED = 50; // Fastest possible speed
const MIN_FOOD_SIZE = 0.3; // Minimum food size (fraction of CELL_SIZE)
const DEATH_FLASH_DURATION = 500; // Add this constant

const SOUNDS = {
  eat: (() => { const audio = new Audio('/sounds/eat.mp3'); audio.volume = 0.1; return audio; })(),
  die: new Audio('/sounds/die.wav'),
  move: new Audio('/sounds/move.wav'),
};

const getHighScore = () => {
  const stored = document.cookie.split('; ').find(row => row.startsWith('snakeHighScore='));
  return stored ? parseInt(stored.split('=')[1]) : 0;
};

const setHighScoreCookie = (score) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  document.cookie = `snakeHighScore=${score};expires=${date.toUTCString()};path=/`;
};

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getHighScore);
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState('RIGHT');
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [lastMoveTime, setLastMoveTime] = useState(Date.now());
  const [deathTime, setDeathTime] = useState(null);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [foodSize, setFoodSize] = useState(1);

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setFood({ x: 15, y: 15 });
    setLastMoveTime(Date.now());
    setDeathTime(null);
    setSpeed(INITIAL_SPEED);
    setFoodSize(1);
  };

  const handleKeyPress = (e) => {
    switch (e.key) {
      case 'ArrowUp': if (direction !== 'DOWN') { setDirection('UP'); SOUNDS.move.play(); } break;
      case 'ArrowDown': if (direction !== 'UP') { setDirection('DOWN'); SOUNDS.move.play(); } break;
      case 'ArrowLeft': if (direction !== 'RIGHT') { setDirection('LEFT'); SOUNDS.move.play(); } break;
      case 'ArrowRight': if (direction !== 'LEFT') { setDirection('RIGHT'); SOUNDS.move.play(); } break;
    }
  };

  const drawGame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Flash effect on death
    if (deathTime && Date.now() - deathTime < DEATH_FLASH_DURATION) {
      ctx.fillStyle = `rgba(255, 0, 0, ${0.5 * (1 - (Date.now() - deathTime) / DEATH_FLASH_DURATION)})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw snake
    ctx.fillStyle = '#0f0';
    snake.forEach(({ x, y }) => {
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });

    // Draw food with variable size
    ctx.fillStyle = '#f00';
    const foodPixelSize = CELL_SIZE * foodSize;
    const foodOffset = (CELL_SIZE - foodPixelSize) / 2;
    ctx.fillRect(
      food.x * CELL_SIZE + foodOffset,
      food.y * CELL_SIZE + foodOffset,
      foodPixelSize - 1,
      foodPixelSize - 1
    );
  };

  const moveSnake = () => {
    const now = Date.now();
    if (now - lastMoveTime < speed) return;
    setLastMoveTime(now);

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP': head.y--; break;
      case 'DOWN': head.y++; break;
      case 'LEFT': head.x--; break;
      case 'RIGHT': head.x++; break;
    }

    // Wrap around walls
    head.x = (head.x + GRID_SIZE) % GRID_SIZE;
    head.y = (head.y + GRID_SIZE) % GRID_SIZE;

    // Self collision (check against body segments only)
    if (newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
      SOUNDS.die.play();
      setDeathTime(Date.now());
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        setHighScoreCookie(score);
      }
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      SOUNDS.eat.play();
      setScore(score + 1);
      // Increase speed with score
      setSpeed(Math.max(MIN_SPEED, INITIAL_SPEED - score * SPEED_INCREMENT));
      // Set random food size
      setFoodSize(MIN_FOOD_SIZE + Math.random() * (1 - MIN_FOOD_SIZE));
      setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      });
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const gameLoop = () => {
    if (!gameOver) {
      moveSnake();
      drawGame();
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      cancelAnimationFrame(animationRef.current);
    };
  });

  return (
    <Box sx={{
      textAlign: 'center',
      fontFamily: '"Press Start 2P", monospace',
      color: '#0f0',
      userSelect: 'none',
    }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Score: {score}</Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>High Score: {highScore}</Typography>

      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        style={{
          border: '3px solid #0f0',
          backgroundColor: '#111',
          imageRendering: 'pixelated',
          boxShadow: '0 0 20px #0f0, inset 0 0 10px #0f0',
        }}
      />

      {gameOver && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" color="#f00">Game Over!</Typography>
          {score === highScore && score > 0 && (
            <Typography sx={{ color: '#ff0', mt: 1 }}>🎉 New High Score!</Typography>
          )}
          <Button
            onClick={resetGame}
            sx={{
              mt: 2,
              backgroundColor: '#0f0',
              color: '#000',
              fontFamily: '"Press Start 2P", monospace',
              ':hover': { backgroundColor: '#0c0' }
            }}
          >
            Restart
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SnakeGame;
