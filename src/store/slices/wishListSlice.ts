import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  getWishListFromLocalStorage,
  setWishListInLocalStorage,
} from '../../localStorage/localStorage';

const initialState = {
  value: getWishListFromLocalStorage(),
};

const wishListSlice = createSlice({
  name: 'wishListSlice',
  initialState,
  reducers: {
    addInWishList(state, action: PayloadAction<string>) {
      state.value.push(action.payload);
      setWishListInLocalStorage(state.value);
    },
    removeFromWishList(state, action: PayloadAction<string>) {
      if (state.value.includes(action.payload)) {
        state.value.splice(state.value.indexOf(action.payload), 1);
        setWishListInLocalStorage(state.value);
      }
    },
  },
});

export const { addInWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
