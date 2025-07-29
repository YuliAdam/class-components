import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import pageReducer from './slices/pageSlice';
import itemReducer from './slices/itemSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    page: pageReducer,
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
