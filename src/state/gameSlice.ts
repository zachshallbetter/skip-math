import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import levelsData from '../data/levels.json';

interface GameState {
  currentLevel: number;
  score: number;
  skipCount: number;
  targetNumbers: number[];
  selectedNumbers: number[];
  isComplete: boolean;
  isLevelTransitioning: boolean;
  message: string;
}

const initialState: GameState = {
  currentLevel: 1,
  score: 0,
  skipCount: levelsData.levels[0].skipCount,
  targetNumbers: levelsData.levels[0].targetNumbers,
  selectedNumbers: [],
  isComplete: false,
  isLevelTransitioning: false,
  message: levelsData.levels[0].owlMessage,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectNumber: (state: GameState, action: PayloadAction<number>) => {
      const number = action.payload;
      if (!state.selectedNumbers.includes(number)) {
        state.selectedNumbers.push(number);
        
        // Check if the selection is correct (follows target sequence)
        const expectedIndex = state.selectedNumbers.length - 1;
        const expectedNumber = state.targetNumbers[expectedIndex - 1];
        if (expectedNumber && number === state.targetNumbers[expectedIndex]) {
          state.score += 10;
          
          // Check if level is complete
          const currentLevel = levelsData.levels[state.currentLevel - 1];
          if (state.selectedNumbers.length >= currentLevel.requiredCorrect) {
            state.isComplete = true;
            state.isLevelTransitioning = true;
            state.message = "Level Complete! Great job!";
          }
        } else {
          // Wrong number selected
          state.message = "Oops! Try again!";
          state.selectedNumbers.pop(); // Remove wrong selection
        }
      }
    },
    setSkipCount: (state: GameState, action: PayloadAction<number>) => {
      state.skipCount = action.payload;
    },
    resetLevel: (state: GameState) => {
      const currentLevel = levelsData.levels[state.currentLevel - 1];
      state.selectedNumbers = [];
      state.isComplete = false;
      state.isLevelTransitioning = false;
      state.message = currentLevel.owlMessage;
    },
    nextLevel: (state: GameState) => {
      // Check if there are more levels
      if (state.currentLevel < levelsData.levels.length) {
        state.currentLevel += 1;
        const nextLevelData = levelsData.levels[state.currentLevel - 1];
        state.selectedNumbers = [];
        state.isComplete = false;
        state.isLevelTransitioning = false;
        state.skipCount = nextLevelData.skipCount;
        state.targetNumbers = nextLevelData.targetNumbers;
        state.message = nextLevelData.owlMessage;
      } else {
        // Game complete
        state.message = "Congratulations! You've completed all levels!";
        state.isComplete = true;
      }
    },
  },
});

export const { selectNumber, setSkipCount, resetLevel, nextLevel } = gameSlice.actions;
export default gameSlice.reducer;