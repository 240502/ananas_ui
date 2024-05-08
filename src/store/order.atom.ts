import { atom, selector } from 'recoil';


export const orderId = atom({
    key: 'orderId',
    default: 0,
});

export const optionSearch = atom({
    key: 'optionSearch',
    default: '',
});

export const searchOption = selector({
    key: 'searchOption',
    get: ({ get }) => ({
        orderId: get(orderId),
        optionSearch: get(optionSearch),
    }),
});
