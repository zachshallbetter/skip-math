import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { nextLevel } from '../state/gameSlice';

const LevelComplete: React.FC = () => {
  const dispatch = useDispatch();
  const { message, isLevelTransitioning } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    if (isLevelTransitioning) {
      // Wait for animation to complete before moving to next level
      const timer = setTimeout(() => {
        dispatch(nextLevel());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLevelTransitioning, dispatch]);

  if (!isLevelTransitioning) return null;

  return (
    <div className="level-complete">
      <div className="level-complete-content">
        <h2>{message}</h2>
        <div className="portal-animation" />
      </div>
    </div>
  );
};

export default LevelComplete; 