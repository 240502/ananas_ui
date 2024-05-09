import { toast } from 'react-toastify';
import { CartItemType } from '../types';
export const addToCart = (cartItem: CartItemType, listCart: CartItemType[], setCarts: any) => {
    const product = {
        id: cartItem.id,
        name: cartItem.name,
        qty: cartItem.qty,
        size: cartItem.size,
        thumbnail: cartItem.thumbnail,
        colorId: cartItem.colorId,
        price: cartItem.price,
        styleId: cartItem.styleId,
        styleName: cartItem.styleName,
        colorName: cartItem.colorName,
    };
    let newCarts;
    if (cartItem.qty === 0 || cartItem.size === 0) {
        toast.error('Không được để trống số lượng sản phẩm hoặc size!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    } else {
        if (listCart.length > 0) {
            const currentCartItem = listCart.find((item: CartItemType) => item.id === product.id);
            if (currentCartItem) {
                newCarts = listCart.map((item: CartItemType) => {
                    if (
                        item.id === product.id &&
                        item.colorId === product.colorId &&
                        item.size === product.size &&
                        item.styleId === product.styleId
                    ) {
                        return { ...item, qty: item.qty + product.qty };
                    } else {
                        return item;
                    }
                });
                setCarts(newCarts);
            } else {
                newCarts = [...listCart, product];
                setCarts(newCarts);
            }
        } else {
            newCarts = [product];
            setCarts(newCarts);
        }
        toast.success('Đã thêm giỏ hàng thành công', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

        localStorage.setItem('cart', JSON.stringify(newCarts));
    }
};
export const reduceQty = (id: number, setCarts: any, listCart: CartItemType[]) => {
    const cartItem = listCart.find((item: CartItemType) => item.id === id);
    if (cartItem) {
        if (cartItem.qty === 1) {
            toast.success('Sản phẩm đã đạt số lượng nhỏ nhất để có thể đặt hàng !', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        } else {
            const newCarts: CartItemType[] = listCart.map((item: CartItemType) => {
                if (item.id === id) {
                    return { ...item, qty: item.qty - 1 };
                } else return item;
            });
            localStorage.setItem('cart', JSON.stringify(newCarts));
            setCarts(newCarts);
        }
    }
};
export const increaseQty = (id: number, setCarts: any, listCart: CartItemType[]) => {
    const cartItem = listCart.find((item: CartItemType) => item.id === id);
    if (cartItem) {
        const newCarts: CartItemType[] = listCart.map((item: CartItemType) => {
            if (item.id === id) {
                return { ...item, qty: item.qty + 1 };
            } else return item;
        });
        localStorage.setItem('cart', JSON.stringify(newCarts));
        setCarts(newCarts);
    }
};
export const removeCartItem = (id: number, listCart: CartItemType[], setCarts: any) => {
    const newCarts = listCart.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newCarts));

    setCarts(newCarts);
};
export const clearCart = (setCarts: any) => {
    localStorage.setItem('cart', JSON.stringify([]));
    setCarts([]);
};
