import SildeCart from '../../../components/Layout/SlickSlide/SlideCart';
import '../../../assets/css/Shop/cart.css';
import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { useRecoilValue } from 'recoil';
import { infoValue } from '../../../store/cart.atom';
function Cart() {
    const info = useRecoilValue(infoValue);
    return (
        <main>
            <div className="main-cart container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 main-cart-left">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 title">Bạn có cần thêm ?</div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="cart-slide">
                                    <SildeCart />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-12 title-1">giỏ hàng</div>
                        </div>
                        <CartItem />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 main-cart-right">
                        <ul className="list-group">
                            <li className="list-group-item title">Đơn hàng</li>
                            <li className="list-group-item divider" />
                            <li className="list-group-item title-1">NHẬP MÃ KHUYẾN MÃI</li>
                            <li className="list-group-item">
                                <div className="input-group">
                                    <div className="input">
                                        <input type="text" className="form-control text-uppercase" />
                                    </div>
                                    <div className="input-group-btn">
                                        <button className="btn btn-apply">ÁP DỤNG</button>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item divider-1" />
                            <li className="list-group-item text-1">
                                <span>Đơn hàng</span>
                                <span>{info.totalPrice.toLocaleString(undefined)} VND</span>
                            </li>
                            <li className="list-group-item text-2">
                                <span>Giảm</span>
                                <span> 0 VND</span>
                            </li>
                            <li className="list-group-item divider-1" />
                            <li className="list-group-item totalPrice">
                                <span>Tạm tính </span>
                                <span> {info.totalPrice.toLocaleString(undefined)} VND</span>
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-cart to-checkout">Tiếp tục thanh toán </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Cart;
