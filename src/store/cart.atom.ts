import { atom } from 'recoil';
export const cartState = atom({
  key: 'cartState',
  default: [],
});
export const sizeState = atom({
  key:'sizeState',
  default: [],
});