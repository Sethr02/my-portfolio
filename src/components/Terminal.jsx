import { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme, IconButton, Stack } from '@mui/material';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

const NAVBAR_HEIGHT = 64; // MUI's default AppBar height

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([{ type: 'system', content: 'Welcome! Type "help" to see available commands.' }]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: window.innerWidth - 620, y: window.innerHeight - 420 });
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const dragRef = useRef({ startX: 0, startY: 0 });
  const theme = useTheme();

  const commands = {
    help: () => ({
      type: 'system',
      content: `Available commands:
- about: Learn about me
- skills: View my technical skills
- projects: See my projects
- contact: Get my contact info
- clear: Clear terminal
- help: Show this message`
    }),
    about: () => ({
      type: 'system',
      content: "I'm Seth, a Software Engineer with a BSc in Computer Science. I'm passionate about building web applications and solving complex problems."
    }),
    skills: () => ({
      type: 'system',
      content: "Technologies I work with:\n- Frontend: React, JavaScript, TypeScript\n- Backend: Node.js, ASP.NET\n- Tools: Git, VS Code, Azure DevOps"
    }),
    projects: () => ({
      type: 'system',
      content: "Featured Projects:\n- Naruto Filler Guide\n- Valorant Account Vault\n- AI Image Generator\nType 'projects --info [project name]' for more details"
    }),
    contact: () => ({
      type: 'system',
      content: "Email: your.email@example.com\nGitHub: github.com/Sethr02\nLinkedIn: linkedin.com/in/yourprofile"
    }),
    clear: () => {
      setHistory([]);
      return null;
    }
  };

  const handleCommand = (cmd) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();

    if (commands[command]) {
      return commands[command](args.slice(1));
    }
    
    return {
      type: 'error',
      content: `Command not found: ${command}. Type "help" for available commands.`
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newCommand = { type: 'command', content: `$ ${input}` };
      const result = handleCommand(input);
      setHistory(prev => [...prev, newCommand, ...(result ? [result] : [])]);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      if (!isMaximized) {
        setPosition({
          x: Math.max(0, window.innerWidth - 620),
          y: Math.max(0, window.innerHeight - 420)
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isMaximized]);

  const handleMinimize = () => setIsMinimized(!isMinimized);
  const handleMaximize = () => setIsMaximized(!isMaximized);
  const handleClose = () => setIsVisible(false);
  const handleShow = () => {
    setIsVisible(true);
    setIsMinimized(false);
  };

  const handleMouseDown = (e) => {
    if (!isMaximized && e.target.closest('.terminal-handle')) {
      setIsDragging(true);
      dragRef.current = {
        startX: e.pageX - position.x,
        startY: e.pageY - position.y
      };
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.pageX - dragRef.current.startX;
      const newY = e.pageY - dragRef.current.startY;
      
      const maxX = window.innerWidth - 600; // terminal width
      const maxY = window.innerHeight - 400; // terminal height
      
      setPosition({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <>
      {!isVisible && (
        <IconButton
          onClick={handleShow}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: 'background.paper',
            boxShadow: 2,
            '&:hover': { backgroundColor: 'background.paper' },
          }}
        >
          <Typography sx={{ fontFamily: 'monospace' }}>$_</Typography>
        </IconButton>
      )}
      
      {isVisible && (
        <Box
          onMouseDown={handleMouseDown}
          sx={{
            position: 'fixed',
            right: isMaximized ? 0 : 'auto',
            bottom: isMaximized ? 0 : 'auto',
            top: isMaximized ? NAVBAR_HEIGHT : position.y, // Add navbar offset
            left: isMaximized ? 0 : position.x,
            width: isMaximized ? '100%' : '600px',
            height: isMaximized ? `calc(100vh - ${NAVBAR_HEIGHT}px)` : isMinimized ? '40px' : '400px', // Subtract navbar height
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 4,
            transition: isMaximized ? 'all 0.3s ease' : 'height 0.3s ease',
            overflow: 'hidden',
            zIndex: 1000,
          }}
        >
          <Box
            className="terminal-handle"
            sx={{
              p: 1,
              backgroundColor: 'background.default',
              borderBottom: 1,
              borderColor: 'divider',
              cursor: 'move',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              Terminal
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={handleMinimize}>
                <MinimizeIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleMaximize}>
                {isMaximized ? <CloseFullscreenIcon fontSize="small" /> : <OpenInFullIcon fontSize="small" />}
              </IconButton>
              <IconButton size="small" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {!isMinimized && (
            <Box
              sx={{
                height: 'calc(100% - 48px)',
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
                p: 2,
              }}
            >
              <Box
                ref={terminalRef}
                sx={{
                  height: '100%',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(128,128,128,0.3)',
                    borderRadius: '4px',
                  },
                }}
              >
                {history.map((entry, i) => (
                  <Typography
                    key={i}
                    sx={{
                      color: entry.type === 'error' ? 'error.main' : 
                            entry.type === 'command' ? 'primary.main' : 'text.primary',
                      whiteSpace: 'pre-wrap',
                      mb: 1,
                      fontSize: '0.9rem',
                    }}
                  >
                    {entry.content}
                  </Typography>
                ))}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ color: 'primary.main', mr: 1 }}>$</Typography>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: theme.palette.text.primary,
                      font: 'inherit',
                      width: '100%',
                    }}
                    autoFocus
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Terminal;