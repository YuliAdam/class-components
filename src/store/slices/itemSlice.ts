import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IPokemon } from '../../types/types';

interface IItem {
  value: IPokemon | null;
  isLoading: boolean;
}

const initialState: IItem = {
  value: null,
  isLoading: false,
};

const itemSlice = createSlice({
  name: 'itemSlice',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<IPokemon | null>) {
      state.value = action.payload;
      state.isLoading = false;
    },
    setLoadingItem(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setItem, setLoadingItem } = itemSlice.actions;
export default itemSlice.reducer;
