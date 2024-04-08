import { useRecoilState } from 'recoil';
import { json } from 'stream/consumers';
import { cartState } from '../store/cart.atom';

export const addToCart = (
    id: number,
    pro_name: string,
    pro_style_name: string,
    pro_color_name: string,
    pro_price: number,
    pro_size: any,
    pro_number: number,
    numberPro: number,
    img: any,
    listSize: any,
) => {
    const totalPrice = numberPro * pro_price
    const product = {
        id: id,
        pro_name,
        pro_style_name,
        pro_color_name,
        pro_price,
        pro_size,
        pro_number,
        numberPro,
        img,
        listSize,
        totalPrice
    };

    let list;
  
    if (numberPro === 0 || pro_size === 0) {
        alert('Không được để trống số lượng sản phẩm hoặc size!');
    } else {
        if (localStorage.getItem('cart') === null) {
            list = [product];
        } else {
            list = JSON.parse(localStorage.getItem('cart') || '[]');
            let state = true;
            for (let i = 0; i < list.length; i++) {
                if (
                    product.id === list[i].id &&
                    product.pro_style_name === list[i].pro_style_name &&
                    product.pro_color_name === list[i].pro_color_name &&
                    product.pro_size === list[i].pro_size
                ) {
                    list[i]['numberPro'] += product.numberPro;
                    state = false;
                    break;
                }
            }
            if (state) {
                list.push(product);
            }
        }
        alert('Đã thêm giỏ hàng thành công!');
        localStorage.setItem('cart', JSON.stringify(list));
    }
};
