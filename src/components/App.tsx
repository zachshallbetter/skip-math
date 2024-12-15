import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import TaskBar from './TaskBar';
import NumberButton from './NumberButton';
import ProgressMeter from './ProgressMeter';
import LevelComplete from './LevelComplete';

const App: React.FC = () => {
  const { targetNumbers, message } = useSelector((state: RootState) => state.game);

  // Generate a range of numbers from 1 to the maximum target number
  const maxNumber = Math.max(...targetNumbers);
  const allNumbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

  return (
    <div className="app">
      <TaskBar />
      <div className="message">{message}</div>
      <ProgressMeter />
      <div className="number-grid">
        {allNumbers.map((number) => (
          <NumberButton key={number} number={number} />
        ))}
      </div>
      <LevelComplete />
    </div>
  );
};

export default App; 