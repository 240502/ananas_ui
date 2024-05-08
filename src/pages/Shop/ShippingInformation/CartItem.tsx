import React from 'react';
import { CartItemType } from '../../../types';
export const CartItem = ({ cartlist, totalPriceItem }: any) => {
    return (
        <>
            {cartlist.map((cart: CartItemType) => {
                return (
                    <>
                        <li className="list-group-item text-1" key={cart.id}>
                            <span className="title-6 pro-info">
                                {cart.name} - {cart.styleName} - {cart.colorName}
                            </span>
                            <span className="title-6-1 pro-price">
                                {totalPriceItem(cart.id).toLocaleString(undefined)} VND
                            </span>
                        </li>
                        <li className="list-group-item text-1-1">
                            <span className="size title-6-2">
                                Size: <span>{cart.size}</span>
                            </span>
                            <span className="quantity title-6-3">
                                <span>x {cart.qty}</span>
                            </span>
                        </li>
                    </>
                );
            })}
        </>
    );
};
