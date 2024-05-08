import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, infoValue } from '../../../store/cart.atom';
import { clearCart, increaseQty, reduceQty, removeCartItem } from '../../../utils/cart';
import { hostServerAdmin } from '../../../constant/api';
function CartItem() {
    const cartInfo = useRecoilValue(infoValue);
    const [carts, setCarts] = useRecoilState(cartState);
    return (
        <div className="row">
            {cartInfo.carts.map((cart): any => {
                return (
                    <div className="product-info" key={cart['id']}>
                        <div className="pro-img">
                            <a href="#">
                                <img
                                    src={
                                        cart.thumbnail.includes('uploads')
                                            ? hostServerAdmin + cart.thumbnail
                                            : 'http://localhost:3000/' + cart.thumbnail
                                    }
                                />
                            </a>
                        </div>
                        <div className="pro-detail">
                            <h3 className="pro-name">
                                <a href="#">
                                    <span style={{ textTransform: 'capitalize' }}>{cart.name}</span> -{' '}
                                    <span style={{ textTransform: 'capitalize' }}>{cart.styleName}</span> -{' '}
                                    <span style={{ textTransform: 'capitalize' }}>{cart.colorName}</span>
                                </a>
                            </h3>
                            <p className="pro-price">
                                <strong>Giá:</strong> {Number(cart.price).toLocaleString(undefined)} VNĐ
                            </p>
                            <div className="row bottom">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <h5>Size</h5>
                                    <input
                                        name=""
                                        id="size"
                                        className="form-control"
                                        readOnly={true}
                                        value={cart.size}
                                    ></input>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <h5 className="text-center">Số lượng</h5>
                                    <div className="form-group form-quantity">
                                        <button
                                            type="button"
                                            className="reduce"
                                            onClick={() => {
                                                reduceQty(cart.id, setCarts, cartInfo.carts);
                                            }}
                                        >
                                            -
                                        </button>
                                        <input
                                            name=""
                                            id="quantity"
                                            className="form-control"
                                            readOnly={true}
                                            value={cart.qty}
                                        ></input>
                                        <button
                                            type="button"
                                            className="increase"
                                            onClick={() => {
                                                increaseQty(cart.id, setCarts, cartInfo.carts);
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-info-right">
                            <div className="price">
                                {Number(cartInfo.totalPriceItem(cart.id)).toLocaleString(undefined)} VND
                            </div>
                            <div className="status">Còn hàng</div>
                            <div className="group-btn">
                                <div className="button-heart">
                                    <button className="btn">
                                        <i className="fa-regular fa-heart" />
                                    </button>
                                </div>
                                <div className="button-delete">
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            removeCartItem(cart.id, cartInfo.carts, setCarts);
                                        }}
                                    >
                                        <i className="fa-solid fa-trash-can" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="line"></div>
            <div className="group-btn-bottom">
                <div className="delete-all col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                    <button className="btn btn-clearAll" onClick={() => clearCart(setCarts)}>
                        Xóa hết
                    </button>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 return-home">
                    <button className="btn btn-returnHome">Quay lại mua hàng</button>
                </div>
            </div>
        </div>
    );
}
export default CartItem;
