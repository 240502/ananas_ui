import { atom, selector } from 'recoil';
import { ProductType } from '../types';

export const productState = atom({
    key: 'productState',
    default: {},
});
export const indexGender = atom({
    key: 'indexGender',
    default: 0,
});

export const productViewedState = atom({
    key: 'productViewedState',
    default: [] as ProductType[],
});

export const productViewedValue = selector({
    key: 'productViewedValue',
    get: ({ get }) => ({
        productVieweds: get(productViewedState),
    }),
});
