import React, { useEffect, useState } from 'react';
import '../../../assets/css/Shop/shippinginformation.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CartItemType, cartState, infoValue } from '../../../store/cart.atom';
import { CartItem } from './CartItem';
import { CreateOrder } from '../../../services/order.services';
import { getListPaymentType } from '../../../services/paymentType.services';
import { getListShippingType } from '../../../services/shippingType.services';

import { ShippingTypeItem } from './ShippingTypeItem';
import { PaymentTypeItem } from './PaymentTypeItem';
import { userValue } from '../../../store/user.atom';
import { useNavigate } from 'react-router-dom';
type ShippingType = {
    id: number;
    shippingType_name: string;
    price: number;
};

type PaymentType = {
    id: number;
    paymentType_name: string;
    price: number;
    thumbnail: string;
};
type ProvinceType = {
    id: number;
    name: string;
};
type DistrictType = {
    id: number;
    name: string;
};
type WardType = {
    id: number;
    name: string;
};
export const ShippingInformation = () => {
    const navigate = useNavigate();
    const info = useRecoilValue(infoValue);
    const setCarts = useSetRecoilState(cartState);
    const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
    const [shippingTypes, setShippingTypes] = useState<ShippingType[]>([]);
    const [provinces, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [village, setVillage] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [paymentTypeId, setPaymentTypeId] = useState(0);
    const [shippingTypeId, setShippingTypeId] = useState(0);
    const [shippingTypePrice, setShippingTypePrice] = useState(0);
    const userInfo = useRecoilValue(userValue);
    useEffect(() => {
        async function loadData() {
            try {
                const listPaymentTypes = await getListPaymentType();
                setPaymentTypes(listPaymentTypes);
                const listShippingTypes = await getListShippingType();
                setShippingTypes(listShippingTypes);
            } catch (error) {
                console.log(error);
            }
        }
        loadData();
    }, []);

    const handleCreateOrder = () => {
        const listdetail: any[] = [];

        info.carts.forEach((cart: CartItemType) => {
            listdetail.push({
                product_id: cart.id,
                quantity: cart.qty,
                price: cart.price,
                color_id: cart.colorId,
                size_id: cart.size,
                style_id: cart.styleId,
                status: 0,
            });
        });
        const data = {
            user_id: userInfo.user.user_id,
            money_total: info.totalPrice + shippingTypePrice,
            receiving_address: `${village} - ${ward == '' ? userInfo.user.ward : ward} - ${
                district == '' ? userInfo.user.district : district
            } - ${provinces == '' ? userInfo.user.province : provinces}`,
            phone_number: phoneNumber == '' ? userInfo.user.phoneNumber : phoneNumber,
            shippingType_id: shippingTypeId,
            paymentType_id: paymentTypeId,
            status_id: 1,
            email: userInfo.user.email,
            full_name: userInfo.user.name,
            orderDetails: listdetail,
        };
        createOrder(data);
    };
    const getShippingType = (shippingId: number): any => {
        const shippingType: any = shippingTypes.find((item: ShippingType) => item.id === shippingId);
        return shippingType;
    };
    const createOrder = async (order: any) => {
        try {
            const res = await CreateOrder(order);
            localStorage.setItem('cart', JSON.stringify(undefined));
            navigate('/thankyou');
            setCarts([]);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
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
                                    <input
                                        type="text"
                                        placeholder="HỌ TÊN"
                                        id="fullname"
                                        className="form-control"
                                        value={userInfo.user && userInfo.user.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 form-group">
                                    <input
                                        type="text"
                                        placeholder="Số điện thoại"
                                        id="phone_number"
                                        className="form-control"
                                        value={userInfo.user && userInfo.user.phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 form-group">
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        id="email"
                                        className="form-control"
                                        value={userInfo.user && userInfo.user.email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 form-group">
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ cụ thể số nhà, thôn, đội ..."
                                        id="address"
                                        className="form-control"
                                        onChange={(e) => setVillage(e.target.value)}
                                    />
                                </div>

                                <div
                                    className="col-xs-12 col-sm-12 col-md-10 col-lg-10 form-group location"
                                    id="list-city"
                                >
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        className="form-control"
                                        value={userInfo.user.province !== undefined ? userInfo.user.province : ''}
                                        onChange={(e) => setProvince(e.target.value)}
                                    />
                                </div>
                                <div
                                    className="col-xs-12 col-sm-12 col-md-10 col-lg-10 form-group"
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                    <div
                                        className="col-xs-12 col-sm-12 col-md-5 col-lg-5 form-group location"
                                        id="list-district"
                                    >
                                        <input
                                            type="text"
                                            name="district"
                                            id="district"
                                            className="form-control"
                                            value={userInfo.user.district !== undefined ? userInfo.user.district : ''}
                                            onChange={(e) => setDistrict(e.target.value)}
                                        />
                                    </div>
                                    <div
                                        className="col-xs-12 col-sm-12 col-md-5 col-lg-5 form-group location"
                                        id="list-commune"
                                    >
                                        <input
                                            type="text"
                                            name="commune"
                                            id="commune"
                                            className="form-control"
                                            value={userInfo.user.ward !== undefined ? userInfo.user.ward : ''}
                                            onChange={(e) => setWard(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-12 title-1">
                                    Phương thức giao hàng
                                </div>
                                <PaymentTypeItem paymentTypes={paymentTypes} setPaymentTypeId={setPaymentTypeId} />

                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-12 title-1">
                                    Phương thức thanh toán
                                </div>
                                <ShippingTypeItem
                                    shippingTypes={shippingTypes}
                                    setShippingTypeId={setShippingTypeId}
                                    getShippingType={getShippingType}
                                    setShippingTypePrice={setShippingTypePrice}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 main-cart-right">
                        <ul className="list-group">
                            <li className="list-group-item title">Đơn hàng</li>
                            <li className="list-group-item divider" />
                            <CartItem cartlist={info.carts} totalPriceItem={info.totalPriceItem} />
                            <li className="list-group-item divider-1"></li>
                            <li className="list-group-item text-1">
                                <span className="title-3">Đơn hàng</span>
                                <span className="title-3-1 ">{info.totalPrice.toLocaleString(undefined)} VND</span>
                            </li>
                            <li className="list-group-item text-2-2">
                                <span className="title-3 lb-discount">Giảm</span>
                                <span className="title-4-1">- 0 VND</span>
                            </li>
                            <li className="list-group-item text-2-3 shipping-fee-group">
                                <span className="title-21 label"> Phí vân chuyển</span>
                                <span className="title-22">
                                    <span className="shipping-fee">0</span> VND
                                </span>
                            </li>
                            <li className="list-group-item text-2-3 payment-fee-input">
                                <span className="title-21 label">Phí thanh toán</span>
                                <span className="title-22">
                                    <span className="card-fee">{shippingTypePrice.toLocaleString(undefined)} </span>
                                    VND
                                </span>
                            </li>
                            <li className="list-group-item divider-1"> </li>
                            <li className="list-group-item">
                                <span className="title-5 lb-total-price">Tổng Cộng</span>
                                <span className="title-5-2">
                                    <span className="total-price">
                                        {(info.totalPrice + shippingTypePrice).toLocaleString(undefined)} VND
                                    </span>
                                </span>
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-cart to-checkout" onClick={handleCreateOrder}>
                                    Hoàn tất đặt hàng{' '}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};
