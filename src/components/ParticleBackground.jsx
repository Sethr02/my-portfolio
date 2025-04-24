import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
import { useTheme } from '@mui/material';

const ParticleBackground = () => {
  const theme = useTheme();

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const options = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
      },
      opacity: {
        value: 0.2
      },
      size: {
        value: 3,
        random: true
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
      links: {
        enable: true,
        distance: 150,
        color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
        opacity: 0.1,
        width: 1
      },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5
          }
        }
      }
    }
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }}
    />
  );
};

export default ParticleBackground;
