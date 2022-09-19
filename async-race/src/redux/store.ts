import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter';
import pages, { reducerW } from './slices/pages';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pages,
    pagesW: reducerW,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
