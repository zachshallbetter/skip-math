import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNumber } from '../state/gameSlice';
import { RootState } from '../state/store';

interface NumberButtonProps {
  number: number;
}

const NumberButton: React.FC<NumberButtonProps> = ({ number }) => {
  const dispatch = useDispatch();
  const selectedNumbers = useSelector((state: RootState) => state.game.selectedNumbers);
  const isSelected = selectedNumbers.includes(number);

  const handleClick = () => {
    dispatch(selectNumber(number));
  };

  return (
    <button
      className={`number-button ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      disabled={isSelected}
    >
      {number}
    </button>
  );
};

export default NumberButton; 