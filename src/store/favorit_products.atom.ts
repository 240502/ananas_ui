import { atom, selector } from 'recoil';
import { FavoriteProductType } from '../types';

export const FavoriteProductState = atom({
    key: 'favoriteProductsState',
    default: [] as FavoriteProductType[],
});

export const FavoriteProductValue = selector({
    key: 'favoriteProductsValue',
    get: ({ get }) => ({
        favoriteProducts: get(FavoriteProductState),
        total: get(FavoriteProductState).length,
    }),
});
