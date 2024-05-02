import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { OrderDetails, OrderType, ProductType } from '../../../types';
import DataTable, { TableColumn } from 'react-data-table-component';
import { OrderDetailType } from '../../../store/order.atom';
import { GetOrderById } from '../../../services/order.services';
import { getProductById } from '../../../services/product.servies';
import ReactPaginate from 'react-paginate';
import { hostServerAdmin } from '../../../constant/api';
import { userState } from '../../../store/user.atom';

type DataParams = {
    id: string;
};

type InputOrder = {
    id: number;
    user_id: number;
    receiving_address: string;
    phone_number: string;
    money_total: number;
    order_date: string;
    update_at: string;
    status_id: number;
    paymentType_id: number;
    shippingType_id: number;
    email: string;
    full_name: string;
    orderDetails: [
        {
            id: number;
            product_id: number;
            order_id: number;
            quantity: number;
            price: number;
            size_id: number;
            color_id: number;
            style_id: number;
        },
    ];
};

export const OrderDetail = () => {
    const { id } = useParams<DataParams>();
    const [inputOrder, setInputOrder] = useState<InputOrder>({
        id: 0,
        user_id: 0,
        receiving_address: '',
        phone_number: '',
        money_total: 0,
        order_date: '',
        update_at: '',
        status_id: 0,
        paymentType_id: 0,
        shippingType_id: 0,
        email: '',
        full_name: '',
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
    });

    const [order, setOrder] = useState<OrderType>({
        id: 0,
        user_id: 0,
        receiving_address: '',
        phone_number: '',
        money_total: 0,
        order_date: '',
        update_at: '',
        status_id: 0,
        paymentType_id: 0,
        shippingType_id: 0,
        email: '',
        full_name: '',
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
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getOrder() {
            try {
                const res = await GetOrderById(id);

                setOrder(res);
                setInputOrder({
                    id: res['id'],
                    user_id: res['user_id'],
                    receiving_address: res['receiving_address'],
                    phone_number: res['phone_number'],
                    money_total: res['money_total'],
                    order_date: res['order_date'],
                    update_at: res['update_at'],
                    status_id: res['status_id'],
                    paymentType_id: res['paymentType_id'],
                    shippingType_id: res['shippingType_id'],
                    email: res['email'],
                    full_name: res['full_name'],
                    orderDetails: res['orderDetails'],
                });
            } catch (e) {
                console.log(e);
                setOrder({
                    id: 0,
                    user_id: 0,
                    receiving_address: '',
                    phone_number: '',
                    money_total: 0,
                    order_date: '',
                    update_at: '',
                    status_id: 0,
                    paymentType_id: 0,
                    shippingType_id: 0,
                    email: '',
                    full_name: '',
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
            }
        }
        getOrder();
    }, [id]);
    useEffect(() => {
        function getProduct(id: any) {
            if (order.id !== 0) {
                const res = getProductById(id);
                return res;
            }
        }
        function handleGetProduct() {
            if (order.id !== 0) {
                const res = order.orderDetails.map(async (detail) => {
                    return getProduct(detail.product_id);
                });
                let newProduct: any = [];
                res.map((item) => {
                    item.then((product) => {
                        if (newProduct.length > 0) {
                            newProduct = [...newProduct, product];
                        } else {
                            newProduct = [product];
                        }
                        localStorage.setItem('productOrder', JSON.stringify(newProduct));
                    });
                });
            }
        }
        handleGetProduct();
        let productOrder: any = JSON.parse(localStorage.getItem('productOrder') || '[]');
        setProducts(productOrder)
    }, [order.id]);
    const columns: TableColumn<OrderDetails>[] = [
        {
            name: 'ID',
            selector: (row): any => row.id,
            sortable: true,
            style: { width: '50px' },
        },
        {
            name: 'Mã sản phẩm',
            selector: (row): any => row.product_id,
            sortable: true,
        },

        {
            name: 'Ảnh minh họa',
            selector: (row): any => {
                if (products.length > 0) {
                    const product: any = products.find((p: any) => p['id'] === row.product_id);
                    console.log(product);
                    if (product !== undefined) {
                        return (
                            <img
                                style={{ width: '50%', padding: '10px 0' }}
                                src={
                                    product['imageGallery'].img_src.includes('uploads')
                                        ? hostServerAdmin + product['imageGallery'].img_src
                                        : 'http://localhost:3000/' + product['imageGallery'].img_src
                                }
                                alt=""
                            />
                        );
                    }
                }
            },

            sortable: true,
        },
        {
            name: 'Tên sản phẩm',
            selector: (row): any => {
                if (products.length > 0) {
                    const product: any = products.find((p: any) => p['id'] === row.product_id);

                    if (product !== undefined) {
                        return <div>{product['pro_name']}</div>;
                    }
                }
            },
            sortable: true,
        },

        {
            name: 'Giá',
            selector: (row): any => row.price.toLocaleString(undefined) + ' VND',
            sortable: true,
        },
        {
            name: 'Cỡ',
            selector: (row): any => row.size_id,
            sortable: true,
        },

        {
            name: 'Số lượng',
            selector: (row): any => row.quantity,
            sortable: true,
        },
    ];

    return (
        <>
            <div id="form">
                <div className="card form-add">
                    <div className="card-header">
                        <h1>Chi tiết đơn hàng {id}</h1>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <h3 className="title">Thông tin đơn hàng</h3>
                                <div className="col-lg-6">
                                    <input id="order_id" className="form-control" value={inputOrder.id} hidden></input>
                                    <div className="form-group">
                                        <label htmlFor="user_id">Mã khách hàng:</label>
                                        <input
                                            name="user_id"
                                            id="user_id"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputOrder({ ...inputOrder, user_id: Number(e.target.value) })
                                            }
                                            value={inputOrder.user_id}
                                            readOnly
                                        ></input>
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="full_name">Tên khách hàng:</label>
                                        <input
                                            name="full_name"
                                            id="full_name"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputOrder({ ...inputOrder, full_name: e.target.value })
                                            }
                                            value={inputOrder.full_name}
                                        ></input>
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone_number">Số điện thoại:</label>
                                        <input
                                            name="phone_number"
                                            id="phone_number"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputOrder({ ...inputOrder, phone_number: e.target.value })
                                            }
                                            value={inputOrder.phone_number}
                                        ></input>
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="money_total">Tổng tiền đơn hàng</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="money_total"
                                            value={inputOrder.money_total}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="paymentType_id">Kiểu thanh toán</label>
                                        <select
                                            name=""
                                            id="paymentType_id"
                                            className="form-control"
                                            value={inputOrder.paymentType_id}
                                            onChange={(e) =>
                                                setInputOrder({ ...inputOrder, paymentType_id: Number(e.target.value) })
                                            }
                                        ></select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row">
                                        <div className="form-group">
                                            <label htmlFor="receiving_address">Địa chỉ nhận hàng:</label>
                                            <input
                                                type="text"
                                                name="receiving_address"
                                                id="receiving_address"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setInputOrder({
                                                        ...inputOrder,
                                                        receiving_address: e.target.value,
                                                    })
                                                }
                                                value={inputOrder.receiving_address}
                                            ></input>
                                            <div className="error_message" style={{ display: 'none' }}></div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email:</label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setInputOrder({
                                                        ...inputOrder,
                                                        email: e.target.value,
                                                    })
                                                }
                                                value={inputOrder.email}
                                            ></input>
                                            <div className="error_message" style={{ display: 'none' }}></div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="order_date">Ngày đặt hàng:</label>
                                            <input
                                                type="date"
                                                name="order_date"
                                                id="order_date"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setInputOrder({
                                                        ...inputOrder,
                                                        order_date: e.target.value,
                                                    })
                                                }
                                                value={inputOrder.order_date.slice(0, 10)}
                                            ></input>
                                            <div className="error_message" style={{ display: 'none' }}></div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="status_id">Trạng thái đơn hàng:</label>
                                            <select
                                                name="status_id"
                                                id="status_id"
                                                className="form-control"
                                                onChange={(e) => {
                                                    setInputOrder({
                                                        ...inputOrder,
                                                        status_id: Number(e.target.value),
                                                    });
                                                }}
                                                value={inputOrder.status_id}
                                            ></select>
                                            <div className="error_message" style={{ display: 'none' }}></div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="shippingType_id">Kiểu giao hàng</label>
                                            <select
                                                name=""
                                                id="shippingType_id"
                                                className="form-control"
                                                value={inputOrder.shippingType_id}
                                                onChange={(e) =>
                                                    setInputOrder({
                                                        ...inputOrder,
                                                        shippingType_id: Number(e.target.value),
                                                    })
                                                }
                                            ></select>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="form-group"
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                    <button
                                        type="button"
                                        style={{ width: '20%', padding: '10px 0px' }}
                                        name="cmd"
                                        className="btn btn-primary btn-add"
                                        // onClick={() => (id === undefined ? handleCreateProduct() : handleUpdate())}
                                    >
                                        {id !== undefined ? 'Lưu Lại' : 'Thêm mới'}
                                        <i className="fa-solid fa-plus" style={{ marginLeft: '10px' }}></i>
                                    </button>
                                    <Link
                                        to={'/admin/order'}
                                        className="btn btn-secondary btn-return"
                                        style={{ width: '20%', padding: '10px 0px' }}
                                    >
                                        Quay lại
                                        <i className="fa-solid fa-arrow-left-long" style={{ marginLeft: '10px' }}></i>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="card  ">
                <div className="card-header">
                    <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>Danh sách đơn hàng</h3>
                </div>

                <div className="card-body table_order_detail">
                    <DataTable columns={columns} data={order.orderDetails} />
                </div>
            </div>
        </>
    );
};
