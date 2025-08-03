import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getSearchValueFromLocalStorage } from '../../localStorage/localStorage';

const initialState = {
  value: getSearchValueFromLocalStorage(),
};

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    cleanSearch(state) {
      state.value = '';
    },
  },
});

export const { setSearch, cleanSearch } = searchSlice.actions;
export default searchSlice.reducer;
