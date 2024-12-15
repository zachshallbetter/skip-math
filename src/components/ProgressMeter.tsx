import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

const ProgressMeter: React.FC = () => {
  const { selectedNumbers, skipCount } = useSelector((state: RootState) => state.game);
  const correctCount = selectedNumbers.reduce((count, num, index) => {
    if (index === 0) return count;
    return selectedNumbers[index] - selectedNumbers[index - 1] === skipCount ? count + 1 : count;
  }, 0);

  const progressPercentage = Math.min((correctCount / 5) * 100, 100);

  return (
    <div className="progress-meter">
      <div className="gear-container">
        <div 
          className="gear" 
          style={{ 
            transform: `rotate(${progressPercentage * 3.6}deg)`,
            opacity: progressPercentage > 0 ? 1 : 0.5
          }}
        />
      </div>
      <div className="progress-text">
        {correctCount} / 5 Correct
      </div>
    </div>
  );
};

export default ProgressMeter; 