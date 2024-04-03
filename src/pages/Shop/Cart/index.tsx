import SildeCart from '../../../components/Layout/SlickSlide/SlideCart';
import CartCSS from '../../../assets/css/Shop/Cart.module.css';
function Cart() {
    return (
        <main>
            <div className={`${CartCSS.main_cart} container`}>
                <div className="row">
                    <div className={`col-xs-12 col-sm-12 col-md-8 col-lg-8 ${CartCSS.main__cart__left}`}>
                        <div className="row">
                            <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12 ${CartCSS.title}`}>
                                Bạn có cần thêm ?
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="cart-slide">
                                    <SildeCart />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className={` col-xs-12 col-sm-12 col-md-12 col-lg-12 ${CartCSS.title_1}`}
                                style={{ marginTop: '20px' }}
                            >
                                giỏ hàng
                            </div>
                            <div className="row" style={{ padding: 0 }}>
                                <div className={CartCSS.product_info}>
                                    <div className={CartCSS.pro_img}>
                                        <a href="#">
                                            <img src="https://ananas.vn/wp-content/uploads/Pro_AV00207_1-500x500.jpg" />
                                        </a>
                                    </div>
                                    <div className={CartCSS.pro_detail}>
                                        <h3 className={CartCSS.pro_name}>
                                            <a href="#">Vintas Public 2000s - Low Top - Insignia Blue</a>
                                        </h3>
                                        <p className={CartCSS.pro_price}>
                                            <strong>Giá:</strong> 1000.000đ
                                        </p>
                                        <div className={`row ${CartCSS.bottom}`}>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <h5>Size</h5>
                                                <select className="btn" name="#" id="#">
                                                    <option value={1}>1</option>
                                                </select>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <h5>Số lượng</h5>
                                                <select className="btn" name="#" id="#">
                                                    <option value={1}>1</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={CartCSS.product_info_right}>
                                        <div className={CartCSS.price}>620.000 VND</div>
                                        <div className={CartCSS.status}>Còn hàng</div>
                                        <div className={CartCSS.group_btn}>
                                            <div className={CartCSS.button_heart}>
                                                <button className={`btn ${CartCSS.button}`}>
                                                    <i className="fa-regular fa-heart" />
                                                </button>
                                            </div>
                                            <div className={CartCSS.button_delete}>
                                                <button className={`btn ${CartCSS.button}  ${CartCSS.delete}`}>
                                                    <i className="fa-solid fa-trash-can" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={CartCSS.line} style={{ marginTop: '40px' }}></div>
                                <div className={CartCSS.group_btn_bottom}>
                                    <div className="delete-all col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                                        <button className={`${CartCSS.btn} ${CartCSS.btn_clearAll}`}>Xóa hết</button>
                                    </div>
                                    <div className={`col-xs-6 col-sm-6 col-md-6 col-lg-6 ${CartCSS.return_home}`}>
                                        <button className={`${CartCSS.btn_returnHome} ${CartCSS.btn}`}>
                                            Quay lại mua hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4 ${CartCSS.main_cart_right}`}>
                        <ul className={CartCSS.list_group}>
                            <li className={` ${CartCSS.list_group_item} ${CartCSS.title}  ${CartCSS.first}`}>
                                Đơn hàng
                            </li>
                            <li className={` ${CartCSS.list_group_item} ${CartCSS.divider} `} />
                            <li className={` ${CartCSS.list_group_item} ${CartCSS.title_1}`}>NHẬP MÃ KHUYẾN MÃI</li>
                            <li className={CartCSS.list_group_item}>
                                <div className={CartCSS.input_group}>
                                    <div className={CartCSS.input}>
                                        <input
                                            type="text"
                                            className={`${CartCSS.form_item} form-control  text-uppercase`}
                                        />
                                    </div>
                                    <div className={CartCSS.input_group_btn}>
                                        <button className={` ${CartCSS.btn_apply} btn`}>ÁP DỤNG</button>
                                    </div>
                                </div>
                            </li>
                            <li className={` ${CartCSS.list_group_item} ${CartCSS.divider_1}`} />
                            <li className={` ${CartCSS.list_group_item} ${CartCSS.text_1}`}>
                                <span>Đơn hàng</span>
                                <span>620.000 VND</span>
                            </li>
                            <li className={` ${CartCSS.list_group_item} ${CartCSS.text_2}`}>
                                <span className={CartCSS.first}>Giảm</span>
                                <span> 0 VND</span>
                            </li>
                            <li className={` ${CartCSS.list_group_item} ${CartCSS.divider_1}`} />
                            <li className={` ${CartCSS.list_group_item} ${CartCSS.totalPrice}`}>
                                <span>Tạm tính</span>
                                <span> 620.000 VND</span>
                            </li>
                            <li className={CartCSS.list_group_item}>
                                <button className={` btn ${CartCSS.btn_cart} to-checkout}`}>
                                    Tiếp tục thanh toán{' '}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Cart;
