import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDark: false,
};

const themesSlice = createSlice({
  name: 'themesSlice',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = themesSlice.actions;
export default themesSlice.reducer;
