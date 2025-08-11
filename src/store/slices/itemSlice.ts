import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IObjectInfoResponse } from '../../types/types';

interface IItem {
  value: IObjectInfoResponse | null;
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
    setItem(state, action: PayloadAction<IObjectInfoResponse | null>) {
      state.value = action.payload;
    },
    setLoadingItem(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setItem, setLoadingItem } = itemSlice.actions;
export default itemSlice.reducer;
