import { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { setSecureItem, getSecureItem } from '../../utils/storage';
import LeaderboardDisplay from './LeaderboardDisplay';
import NameEntry from './NameEntry';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const MIN_SPEED = 50;
const MIN_FOOD_SIZE = 0.3;
const DEATH_FLASH_DURATION = 500;

const SOUNDS = {
  eat: (() => { const audio = new Audio('/sounds/eat.mp3'); audio.volume = 0.1; return audio; })(),
};

const migrateFromCookies = () => {
  const stored = document.cookie.split('; ').find(row => row.startsWith('snakeHighScore='));
  if (stored) {
    const score = parseInt(stored.split('=')[1]);
    setSecureItem('snakeHighScore', score);
    // Clear old cookie
    document.cookie = 'snakeHighScore=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
};

const getHighScore = () => {
  migrateFromCookies(); // Migrate any existing cookie data
  return getSecureItem('snakeHighScore', 0);
};

const setHighScore = (score) => {
  setSecureItem('snakeHighScore', score);
};

const getLeaderboard = () => {
  return getSecureItem('snakeLeaderboard', []);
};

const addLeaderboardEntry = (score, name) => {
  const leaderboard = getLeaderboard();
  const newEntry = { score, name, date: Date.now() };
  const newLeaderboard = [...leaderboard, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Keep top 5 scores
  setSecureItem('snakeLeaderboard', newLeaderboard);
  return newLeaderboard;
};

const SnakeGame = ({ isMuted }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScoreState] = useState(getHighScore);
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState('RIGHT');
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [lastMoveTime, setLastMoveTime] = useState(Date.now());
  const [deathTime, setDeathTime] = useState(null);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [foodSize, setFoodSize] = useState(1);
  const [leaderboard, setLeaderboard] = useState(getLeaderboard);
  const [showNameEntry, setShowNameEntry] = useState(false);

  const getValidFoodPosition = () => {
    const occupiedPositions = new Set(
      snake.map(segment => `${segment.x},${segment.y}`)
    );

    let x, y;
    do {
      x = Math.floor(Math.random() * GRID_SIZE);
      y = Math.floor(Math.random() * GRID_SIZE);
    } while (occupiedPositions.has(`${x},${y}`));

    return { x, y };
  };

  const resetGame = () => {
    const initialSnake = [{ x: 10, y: 10 }];
    setScore(0);
    setGameOver(false);
    setSnake(initialSnake);
    setDirection('RIGHT');
    setFood(getValidFoodPosition());
    setLastMoveTime(Date.now());
    setDeathTime(null);
    setSpeed(INITIAL_SPEED);
    setFoodSize(1);
    setShowNameEntry(false);
  };

  const handleKeyPress = (e) => {
    if (showNameEntry) return; // Ignore game controls during name entry

    switch (e.key.toLowerCase()) {
      case 'arrowup':
      case 'w':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'arrowdown':
      case 's':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'arrowleft':
      case 'a':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'arrowright':
      case 'd':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
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
      setDeathTime(Date.now());
      setGameOver(true);
      if (score > 0) {
        setShowNameEntry(true);
      }
      if (score > highScore) {
        setHighScore(score);
        setHighScoreState(score);
      }
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      if (!isMuted) SOUNDS.eat.play();
      setScore(score + 1);
      // Increase speed with score
      setSpeed(Math.max(MIN_SPEED, INITIAL_SPEED - score * SPEED_INCREMENT));
      // Set random food size
      setFoodSize(MIN_FOOD_SIZE + Math.random() * (1 - MIN_FOOD_SIZE));
      setFood(getValidFoodPosition());
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

  const handleNameSubmit = (name) => {
    const newLeaderboard = addLeaderboardEntry(score, name);
    setLeaderboard(newLeaderboard);
    setShowNameEntry(false);
  };

  useEffect(() => {
    migrateFromCookies(); // Only need to run once
    setLeaderboard(getLeaderboard());
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    animationRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [direction, gameOver, snake, food, speed]);

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

      {gameOver && !showNameEntry && (
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

      {showNameEntry && (
        <NameEntry 
          onComplete={handleNameSubmit} 
          stopPropagation={true}
        />
      )}

      <LeaderboardDisplay entries={leaderboard} />
    </Box>
  );
};

export default SnakeGame;
