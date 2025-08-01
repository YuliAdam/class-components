import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  getWishListFromLocalStorage,
  setWishListInLocalStorage,
} from '../../localStorage/localStorage';
import type { IPokemon } from '../../types/types';

function getIdArrFromPokemonArr(pokemons: IPokemon[]) {
  return pokemons.map((i) => i.id);
}

const initLocalStorageValue = getWishListFromLocalStorage();

const initialState: { value: number[]; pokemons: IPokemon[] } = {
  value: getIdArrFromPokemonArr(initLocalStorageValue),
  pokemons: initLocalStorageValue,
};

const wishListSlice = createSlice({
  name: 'wishListSlice',
  initialState,
  reducers: {
    addInWishList(state, action: PayloadAction<IPokemon>) {
      state.value.push(action.payload.id);
      state.pokemons.push(action.payload);
      setWishListInLocalStorage(state.pokemons);
    },
    removeFromWishList(state, action: PayloadAction<number>) {
      if (state.value.includes(action.payload)) {
        state.value.splice(state.value.indexOf(action.payload), 1);
        const index = state.pokemons.findIndex((i) => i.id === action.payload);
        state.pokemons.splice(index, 1);
        setWishListInLocalStorage(state.pokemons);
      }
    },
    clearWishList(state) {
      state.value = [];
      state.pokemons = [];
      setWishListInLocalStorage(state.pokemons);
    },
  },
});

export const { addInWishList, removeFromWishList, clearWishList } =
  wishListSlice.actions;
export default wishListSlice.reducer;
