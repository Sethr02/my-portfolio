import { createContext, useState, useContext } from 'react';

export const achievements = {
  EXPLORER: {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visit all sections of the portfolio',
    icon: '🗺️',
    secret: false,
  },
  NIGHT_OWL: {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Switch to dark mode',
    icon: '🦉',
    secret: false,
  },
  EARLY_BIRD: {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Switch to light mode',
    icon: '🌅',
    secret: false,
  },
  SOCIAL_BUTTERFLY: {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Visit all social links',
    icon: '🦋',
    secret: false,
  },
  QUICK_FINGERS: {
    id: 'quick_fingers',
    title: 'Quick Fingers',
    description: 'Type a message in the contact form in under 10 seconds',
    icon: '⚡',
    secret: true,
  },
};

const AchievementsContext = createContext();

export const AchievementsProvider = ({ children }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [showNotification, setShowNotification] = useState(null);

  const unlockAchievement = (achievementId) => {
    if (!unlockedAchievements.includes(achievementId)) {
      setUnlockedAchievements([...unlockedAchievements, achievementId]);
      setShowNotification(achievements[achievementId]);
      setTimeout(() => setShowNotification(null), 3000);
    }
  };

  return (
    <AchievementsContext.Provider value={{ 
      unlockedAchievements, 
      unlockAchievement,
      showNotification 
    }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementsContext);
