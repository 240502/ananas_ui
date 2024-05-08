import React, { useEffect, useState } from 'react';
import '../../../assets/css/Shop/tracking_order.css';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { searchOption } from '../../../store/order.atom';
import { OrderDetailsType, OrderType, ShippingType } from '../../../types';
import { getTrackingOrder } from '../../../services/order.services';
import { getShippingTypeById } from '../../../services/shippingType.services';
import { ProductImage } from './ProductImage';
export const TrackingOrder = () => {
    const option = useRecoilValue(searchOption);
    const [order, setOrder] = useState<OrderType>({
        id: 0,
        full_name: '',
        email: '',
        money_total: 0,
        order_date: '',
        paymentType_id: 0,
        shippingType_id: 0,
        phone_number: '',
        receiving_address: '',
        update_at: '',
        user_id: 0,
        status_id: 0,
        orderDetails: [
            {
                id: 0,
                product_id: 0,
                order_id: 0,
                quantity: 0,
                price: 0,
                size_id: 0,
                color_id: 0,
                style_id: 0,
            },
        ],
        totalProduct: 0,
    });
    const [shippingType, setShippingType] = useState<ShippingType>({ id: 0, shippingType_name: '', price: 0 });
    useEffect(() => {
        async function getOrder(orderId: number, optionSearch: string) {
            try {
                const data = await getTrackingOrder(orderId, optionSearch);
                setOrder(data);
                getShippingType(data?.shippingType_id);
            } catch (err) {
                console.log(err);
            }
        }
        async function getShippingType(shippingId: any) {
            try {
                const data = await getShippingTypeById(shippingId);
                setShippingType(data);
            } catch (err) {
                console.log(err);
            }
        }
        getOrder(option.orderId, option.optionSearch);
    }, []);

    return (
        <div className="order-track container">
            <div className="row step ">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 title text-center">THÔNG TIN ĐƠN HÀNG</div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 divider"></div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 infor">
                    <div className="status-order">
                        TRẠNG THÁI ĐƠN HÀNG
                        <span className="orange">{order?.id}</span>
                    </div>
                    <div className="shippingType-paymentType">Thanh toán COD - Tốc độ tiêu chuẩn</div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 bar hidden-xs hidden-sm">
                    <div className={order?.status_id === 1 ? 'progress1 active active1 ' : 'progress1 active'}>
                        ĐẶT HÀNG THÀNH CÔNG <i className="fa-solid fa-angles-right"></i>
                    </div>
                    <div className={order?.status_id === 2 ? 'progress1 active active1 ' : 'progress1 active'}>
                        CHUYỂN QUA GIAO NHẬN <i className="fa-solid fa-angles-right"></i>
                    </div>
                    <div className={order?.status_id === 3 ? 'progress1 active active1 ' : 'progress1 active'}>
                        ĐANG GIAO HÀNG <i className="fa-solid fa-angles-right"></i>
                    </div>
                    <div className={order?.status_id === 4 ? 'progress1 active active1 ' : 'progress1 active'}>
                        GIAO HÀNG THÀNH CÔNG <i className="fa-solid fa-angles-right"></i>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 cont hidden-xs hidden-sm">
                    <div className="row">
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 desc">
                            Vào lúc {order?.order_date}
                            <br />
                            <br />
                            Thời gian xử lý đơn hàng có thể từ 1-2 ngày làm việc. Vui lòng gọi đến hotline 0963 429 749
                            (trong giờ hành chính) nếu bạn muốn thay đổi thông tin đơn hàng trước khi đơn hàng của bạn
                            được CHUYỂN QUA GIAO NHẬN.
                        </div>
                    </div>
                </div>
            </div>
            <div className="row group">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 group-left">
                    <div className="group-info">
                        <div className="info-body">
                            <h4 className="title">THÔNG TIN KHÁCH HÀNG</h4>
                            <h4 className="text-1">Họ tên: {order?.full_name}</h4>
                            <h4 className="text-1">Điện thoại: {order?.full_name}</h4>
                            <h4 className="text-1">Email: {order?.email}</h4>
                            <h4 className="text-1">Địa chỉ: {order?.receiving_address}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 group-right">
                    <div className="group-info">
                        <div className="info-body">
                            <h4 className="title">THÔNG TIN GIAO NHẬN</h4>
                            <h4 className="text-1">Họ tên: {order?.full_name}</h4>
                            <h4 className="text-1">Điện thoại: {order?.full_name}</h4>
                            <h4 className="text-1">Email: {order?.email}</h4>
                            <h4 className="text-1">Địa chỉ: {order?.receiving_address}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 group-left">
                    <ul className="list-group-product">
                        <li className="list-group-item title">DANH SÁCH SẢN PHẨM</li>

                        <li className="list-group-item divider"></li>
                        <li className="list-group-item items">
                            {order?.orderDetails.map((item: OrderDetailsType) => {
                                return (
                                    <div className="pro-info" key={item.id} style={{ marginBottom: '20px' }}>
                                        <div className="group-info-left">
                                            <ProductImage proId={item.product_id} />
                                        </div>
                                        <div className="group-info-right">
                                            <h4 className="pro-name label">
                                                Basas Bumper Gum NE - Low Top - Offwhite/Gum
                                            </h4>
                                            <h5>
                                                <span className="price label">Giá:</span>
                                                <span className="value">
                                                    {' '}
                                                    {item.price.toLocaleString(undefined)} VND
                                                </span>
                                            </h5>
                                            <h5>
                                                <span className="size label"> Size: </span>
                                                <span className="value"> {item.size_id}</span>
                                            </h5>
                                            <h5>
                                                <span className="quantity label">Số lượng: </span>
                                                <span className="value">{item.quantity}</span>
                                            </h5>
                                            <h5>
                                                <span style={{ display: 'block', height: '25px' }}></span>
                                                <span className="total label">
                                                    {(item.quantity * item.price).toLocaleString(undefined)} VND
                                                </span>
                                            </h5>
                                        </div>
                                    </div>
                                );
                            })}
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 group-right calculate">
                    <div className="group-info">
                        <div className="info-body">
                            <h4 className="title">THANH TOÁN</h4>
                            <h4>
                                <span className="pleft">Trị giá đơn hàng :</span>
                                <span className="pright bold">
                                    {' '}
                                    {(order?.money_total - shippingType?.price).toLocaleString(undefined)} VND
                                </span>
                            </h4>
                            <h4>
                                <span className="pleft">Giảm giá : </span>
                                <span className="pright bold"> 0 VND</span>
                            </h4>

                            <h4>
                                <span className="pleft">Phí giao hàng : </span>
                                <span className="pright bold">
                                    {' '}
                                    {shippingType?.price.toLocaleString(undefined)} VND
                                </span>
                            </h4>
                            <h4>
                                <span className="pleft">Phí thanh toán : </span>
                                <span className="pright bold"> 0 VND</span>
                            </h4>
                            <h4 className="divider"></h4>
                            <h4>
                                <span className="pleft">Tổng thanh toán : </span>
                                <span className="pright bold"> {order?.money_total.toLocaleString(undefined)} VND</span>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="button">
                    <Link to={'/'} className="btn btn-back pright">
                        QUAY LẠI TRANG CHỦ
                    </Link>
                </div>
            </div>
        </div>
    );
};
