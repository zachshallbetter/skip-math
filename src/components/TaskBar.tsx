import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

const TaskBar: React.FC = () => {
  const { currentLevel, skipCount, score } = useSelector((state: RootState) => state.game);

  return (
    <div className="task-bar">
      <div className="level">Level {currentLevel}</div>
      <div className="task">Count by {skipCount}s!</div>
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default TaskBar; 