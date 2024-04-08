import SildeCart from '../../../components/Layout/SlickSlide/SlideCart';
import '../../../assets/css/Shop/cart.css';
import { useEffect, useState } from 'react';
function Cart() {
    const [cart, setCart] = useState([]);
    let totalPrice: number = 0;

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(list);
    }, []);
    function handleReduce(proId: any) {
        let newCart = cart.map((item: any): any => {
            if (item['id'] == proId) {
                if (item['numberPro'] > 1) {
                    item['numberPro'] = item['numberPro'] - 1;
                    item['totalPrice'] = item['totalPrice'] - item['pro_price'];
                }
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(newCart));
        const list = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(list);
    }
    function handleIncrease(proId: any) {
        let newCart = cart.map((item: any): any => {
            if (item['id'] == proId) {
                item['numberPro'] = item['numberPro'] + 1;
                item['totalPrice'] = item['totalPrice'] + item['pro_price'];
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(newCart));
        const list = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(list);
    }
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
                            <div className="row">
                                {cart.map((item): any => {
                                    // renderListSizePro(
                                    //     item['listSize'],
                                    //     item['pro_number'],
                                    //     item['pro_size'],
                                    //     item['numberPro'],
                                    // );
                                    totalPrice += Number(item['totalPrice']);
                                    return (
                                        <div className="product-info" key={item['id']}>
                                            <div className="pro-img">
                                                <a href="#">
                                                    <img src={item['img']['img_src']} />
                                                </a>
                                            </div>
                                            <div className="pro-detail">
                                                <h3 className="pro-name">
                                                    <a href="#">
                                                        <span style={{ textTransform: 'capitalize' }}>
                                                            {item['pro_name']}
                                                        </span>{' '}
                                                        -{' '}
                                                        <span style={{ textTransform: 'capitalize' }}>
                                                            {item['pro_style_name']}
                                                        </span>{' '}
                                                        -{' '}
                                                        <span style={{ textTransform: 'capitalize' }}>
                                                            {item['pro_color_name']}
                                                        </span>
                                                    </a>
                                                </h3>
                                                <p className="pro-price">
                                                    <strong>Giá:</strong>{' '}
                                                    {Number(item['pro_price']).toLocaleString(undefined)} VNĐ
                                                </p>
                                                <div className="row bottom">
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <h5>Size</h5>
                                                        <input
                                                            name=""
                                                            id="size"
                                                            className="form-control"
                                                            readOnly={true}
                                                            value={item['pro_size']}
                                                        ></input>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <h5 className="text-center">Số lượng</h5>
                                                        <div className="form-group form-quantity">
                                                            <button
                                                                type="button"
                                                                className="reduce"
                                                                onClick={() => handleReduce(item['id'])}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                name=""
                                                                id="quantity"
                                                                className="form-control"
                                                                readOnly={true}
                                                                value={item['numberPro']}
                                                            ></input>
                                                            <button
                                                                type="button"
                                                                className="increase"
                                                                onClick={() => handleIncrease(item['id'])}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-info-right">
                                                <div className="price">
                                                    {Number(item['totalPrice']).toLocaleString(undefined)} VND
                                                </div>
                                                <div className="status">Còn hàng</div>
                                                <div className="group-btn">
                                                    <div className="button-heart">
                                                        <button className="btn">
                                                            <i className="fa-regular fa-heart" />
                                                        </button>
                                                    </div>
                                                    <div className="button-delete">
                                                        <button className="btn">
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
                                        <button className="btn btn-clearAll">Xóa hết</button>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 return-home">
                                        <button className="btn btn-returnHome">Quay lại mua hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                <span>{totalPrice.toLocaleString(undefined)} VND</span>
                            </li>
                            <li className="list-group-item text-2">
                                <span>Giảm</span>
                                <span> 0 VND</span>
                            </li>
                            <li className="list-group-item divider-1" />
                            <li className="list-group-item totalPrice">
                                <span>Tạm tính </span>
                                <span> {totalPrice.toLocaleString(undefined)} VND</span>
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
