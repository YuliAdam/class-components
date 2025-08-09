import type { RootState } from './store';

export const searchValueSelector = (state: RootState) => state.search.value;
export const pageNumberSelector = (state: RootState) => state.page.value;
export const itemSelector = (state: RootState) => state.item;
export const themesSelector = (state: RootState) => state.themes;
export const isDarkThemeSelector = (state: RootState) => state.themes.isDark;
export const wishListSelector = (state: RootState) => state.wishList;
