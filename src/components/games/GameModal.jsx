import { Box, IconButton, Modal, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useState, useEffect } from 'react';
import React from 'react';
import { setSecureItem, getSecureItem } from '../../utils/storage';

const getMutedState = () => {
  return getSecureItem('gameMuted', true);
};

const setMutedState = (muted) => {
  setSecureItem('gameMuted', muted);
};

const GameModal = ({ open, onClose, children }) => {
  const [isMuted, setIsMuted] = useState(getMutedState);

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    setMutedState(newMutedState);
  };

  const childrenWithProps = React.cloneElement(children, { isMuted });

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '2px solid #0f0',
          boxShadow: 24,
          p: 4,
          outline: 'none',
          textAlign: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 3px, transparent 3px)',
            pointerEvents: 'none',
          }
        }}>
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <IconButton 
              onClick={handleMuteToggle}
              sx={{ mr: 1, color: '#0f0' }}
            >
              {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
            <IconButton 
              onClick={onClose}
              sx={{ color: '#0f0' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {childrenWithProps}
        </Box>
      </Fade>
    </Modal>
  );
};

export default GameModal;
