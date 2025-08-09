import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import pageReducer from './slices/pageSlice';
import itemReducer from './slices/itemSlice';
import wishListReducer from './slices/wishListSlice';
import themesReducer from './slices/themesSlice';
import { pokemonApiSlice } from '../api/apiSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    page: pageReducer,
    item: itemReducer,
    wishList: wishListReducer,
    themes: themesReducer,
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
