import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const pageSlice = createSlice({
  name: 'pageSlice',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
    changePageSlice(state, action: PayloadAction<number>) {
      state.value = state.value + action.payload;
    },
  },
});

export const { setPage, changePageSlice } = pageSlice.actions;
export default pageSlice.reducer;
