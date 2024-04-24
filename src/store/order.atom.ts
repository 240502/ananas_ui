import { atom, selector } from 'recoil';

export type OrderType = {
    id: number;
    full_name: string;
    email: string;
    money_total: number;
    order_date: string;
    paymentType_id: number;
    phone_number: string;
    receiving_address: string;
    shippingType_id: number;
    update_at: string;
    user_id: number;
    status_id: number;
    orderDetails: OrderDetailType[];
};
export type OrderDetailType = {
    id: number;
    order_id: number;
    price: number;
    product_id: number;
    quantity: number;
    size_id: number;
    style_id: number;
    color_id: number;
};
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
