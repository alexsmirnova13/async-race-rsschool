import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PagesState {
  value: number;
  valueWinner: number;
  itemsPerPage: number;
  winnerPerPage: number;
}

const initialState: PagesState = {
  value: 1,
  valueWinner: 1,
  itemsPerPage: 7,
  winnerPerPage: 10,
};

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});
export const pagesWinnerSlice = createSlice({
  name: 'pagesWinners',
  initialState,
  reducers: {
    incrementW: (state) => {
      state.valueWinner += 1;
    },
    decrementW: (state) => {
      state.valueWinner -= 1;
    },
    incrementByAmountW: (state, action: PayloadAction<number>) => {
      state.valueWinner += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = pagesSlice.actions;
export const { incrementW, decrementW, incrementByAmountW } = pagesWinnerSlice.actions;
export const reducerW = pagesWinnerSlice.reducer;
export default pagesSlice.reducer;
