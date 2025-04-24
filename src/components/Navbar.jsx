import { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useScrollTrigger,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, DarkMode, LightMode } from '@mui/icons-material';
import { ColorModeContext } from '../contexts/ColorModeContext';

const Navbar = ({ setCommandPaletteOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  const navItems = ['about', 'skills', 'experience', 'projects', 'contact'];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={trigger ? 4 : 0}
      sx={{ 
        backgroundColor: trigger 
          ? 'background.paper' 
          : mode === 'light' 
            ? 'background.paper' 
            : 'transparent',
        backdropFilter: 'blur(10px)',
        color: mode === 'light' ? 'text.primary' : 'white',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Seth
        </Typography>
        
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Button
            color="inherit"
            onClick={() => setCommandPaletteOpen(true)}
            sx={{ 
              mx: 1,
              mt: 0.4,
              opacity: 0.7,
              '&:hover': { opacity: 1 },
              display: { xs: 'none', lg: 'inline-flex' }
            }}
          >
            Search
            <Typography
              component="span"
              sx={{
                ml: 1,
                mt: 0.5,
                px: 0.8,
                py: 0.2,
                borderRadius: 1,
                fontSize: '0.75rem',
                backgroundColor: 'action.hover',
              }}
            >
              {navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl+K'}
            </Typography>
          </Button>
          {navItems.map((item) => (
            <Button 
              key={item}
              color="inherit" 
              href={`#${item}`}
              sx={{ 
                mx: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              {item}
            </Button>
          ))}
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>

        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <Button
            color="inherit"
            onClick={() => setCommandPaletteOpen(true)}
            sx={{ 
              mr: 1,
              opacity: 0.7,
              '&:hover': { opacity: 1 }
            }}
          >
            Search
            <Typography
              component="span"
              sx={{
                ml: 1,
                mt: 0.5,
                px: 0.8,
                py: 0.2,
                borderRadius: 1,
                fontSize: '0.75rem',
                backgroundColor: 'action.hover',
              }}
            >
              {navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl+K'}
            </Typography>
          </Button>
          <IconButton onClick={toggleColorMode} color="inherit" sx={{ mr: 1 }}>
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { width: 240 },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              setCommandPaletteOpen(true);
              handleDrawerToggle();
            }}>
              <ListItemText 
                primary="Search" 
                secondary={navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl+K'}
              />
            </ListItemButton>
          </ListItem>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton 
                href={`#${item}`}
                onClick={handleDrawerToggle}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
