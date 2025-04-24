import { useState, useEffect } from 'react';
import { Box, Dialog, TextField, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';
import EmailIcon from '@mui/icons-material/Email';

const CommandPalette = ({ open, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = [
    { id: 'about', label: 'About Me', icon: <AccountCircleIcon />, href: '#about' },
    { id: 'projects', label: 'Projects', icon: <CodeIcon />, href: '#projects' },
    { id: 'experience', label: 'Experience', icon: <WorkIcon />, href: '#experience' },
    { id: 'skills', label: 'Skills', icon: <BuildIcon />, href: '#skills' },
    { id: 'contact', label: 'Contact', icon: <EmailIcon />, href: '#contact' },
  ];

  const filteredCommands = commands.filter(command =>
    command.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => Math.max(0, prev - 1));
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => Math.min(filteredCommands.length - 1, prev + 1));
        break;
      case 'Enter':
        if (filteredCommands[selectedIndex]) {
          window.location.href = filteredCommands[selectedIndex].href;
          onClose();
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
    setSearch('');
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <TextField
          autoFocus
          fullWidth
          placeholder={`Search commands... (${navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+K)`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="standard"
          InputProps={{
            sx: {
              fontSize: '1.1rem',
              py: 1,
            }
          }}
        />
        <List>
          {filteredCommands.map((command, index) => (
            <ListItem
              key={command.id}
              button
              selected={index === selectedIndex}
              onClick={() => {
                window.location.href = command.href;
                onClose();
              }}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                }
              }}
            >
              <ListItemIcon>{command.icon}</ListItemIcon>
              <ListItemText primary={command.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
};

export default CommandPalette;