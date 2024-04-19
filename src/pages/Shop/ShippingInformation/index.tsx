import React from 'react';
import '../../../assets/css/Shop/shippinginformation.css';
export const ShippingInformation = () => {
    return (
        <main>
            <div className="main-cart container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 main-cart-left">
                        <div className="row">
                            <form action="" id="orderForm">
                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-12 title-1">
                                    Thông tin giao hàng
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 form-group">
                                    <input type="text" placeholder="HỌ TÊN" id="fullname" className="form-control" />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 form-group">
                                    <input
                                        type="text"
                                        placeholder="Số điện thoại"
                                        id="phone_number"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 form-group">
                                    <input type="text" placeholder="Email" id="email" className="form-control" />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 form-group">
                                    <input type="text" placeholder="Địa chỉ" id="address" className="form-control" />
                                </div>
                                <div
                                    className="col-xs-12 col-sm-12 col-md-10 col-lg-10 form-group location"
                                    id="list-city"
                                >
                                    <select name="city" id="city" className="form-control">
                                        <option value="0">Tỉnh/Thành phố</option>
                                    </select>
                                </div>
                                <div
                                    className="col-xs-12 col-sm-12 col-md-10 col-lg-10 form-group"
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                    <div
                                        className="col-xs-12 col-sm-12 col-md-5 col-lg-5 form-group location"
                                        id="list-district"
                                    >
                                        <select name="district" id="district" className="form-control">
                                            <option value="0">Quận/Huyện</option>
                                        </select>
                                    </div>
                                    <div
                                        className="col-xs-12 col-sm-12 col-md-5 col-lg-5 form-group location"
                                        id="list-commune"
                                    >
                                        <select name="commune" id="commune" className="form-control">
                                            <option value="0">Phường/Xã</option>
                                        </select>
                                    </div>
                                </div>
                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-12 title-1">
                                    Phương thức giao hàng
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 group-shipping-type">
                                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 form-group">
                                        <input type="checkbox" id="shippingType-1" className="form-check-input" />
                                        <label htmlFor="shippingType-1">
                                            Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc)
                                            <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_cham_hoi.svg" />
                                        </label>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group title-right normal-fee">
                                        0 VND
                                    </div>
                                </div>

                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-12 title-1">
                                    Phương thức thanh toán
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 form-group">
                                    <input type="checkbox" id="paymentType-1" className="form-check-input" />
                                    <label htmlFor="paymentType-1">
                                        Thanh toán trực tiếp khi giao hàng
                                        <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_cham_hoi.svg" />
                                        <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_COD.svg" />
                                    </label>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 form-group">
                                    <input type="checkbox" id="paymentType-2" className="form-check-input" />
                                    <label htmlFor="paymentType-2">
                                        Thanh toán trực tiếp khi giao hàng
                                        <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_cham_hoi.svg" />
                                        <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_COD.svg" />
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 main-cart-right">
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
                                <span>620.000 VND</span>
                            </li>
                            <li className="list-group-item text-2">
                                <span>Giảm</span>
                                <span> 0 VND</span>
                            </li>
                            <li className="list-group-item divider-1" />
                            <li className="list-group-item totalPrice">
                                <span>Tạm tính</span>
                                <span> 620.000 VND</span>
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
};
