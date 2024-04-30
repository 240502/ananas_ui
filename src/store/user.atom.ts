import { selector, atom } from 'recoil';
import { UsersType } from '../types';

export const userState = atom({
    key: 'userState',
    default: {} as UsersType,
});
export const userValue = selector({
    key: 'userValue',
    get: ({ get }) => ({
        user: get(userState),
    }),
});
