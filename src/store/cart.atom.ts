import { atom, selector } from 'recoil';
import CartItem from '../pages/Shop/Cart/CartItem';

export type CartItemType = {
    id: number;
    name: string;
    qty: number;
    size: number;
    thumbnail: string;
    color: string;
    price: number;
    style: string;
};

export const cartState = atom({
    key: 'cartState',
    default: [] as CartItemType[],
});
export const infoValue = selector({
    key: 'infoValue',
    get: ({ get }) => ({
        carts: get(cartState),
        total: get(cartState).reduce((qty, item) => qty + item.qty, 0),
        totalPriceItem: (id: number): number => {
            let total: number = 0;
            let cartItem: any = get(cartState).find((item) => item.id == id);
            total = total + cartItem?.qty * cartItem.price;
            return total;
        },
        totalPrice: get(cartState).reduce((total, item) => total + item.qty * item.price, 0),
    }),
});
export const sizeState = atom({
    key: 'sizeState',
    default: [],
});
