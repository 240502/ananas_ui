import { selector, atom } from 'recoil';

export type UserType = {
    user_id: number;
    name: string;
    province: string;
    district: string;
    ward: string;
    phoneNumber: string;
    token: string;
    role_id: number;
    email: string;
};

export const userState = atom({
    key: 'userState',
    default: {} as UserType,
});
export const userValue = selector({
    key: 'userValue',
    get: ({ get }) => ({
        user: get(userState),
    }),
});
