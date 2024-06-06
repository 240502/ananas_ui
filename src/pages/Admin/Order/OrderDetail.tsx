import { useEffect, useState } from 'react';
import '../../../assets/css/Admin/modal_add.css';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { OrderDetailsType, OrderType, PaymentType, ProductType, ShippingType } from '../../../types';
import DataTable, { TableColumn } from 'react-data-table-component';
import { GetOrderById, UpdateOrder } from '../../../services/order.services';
import { getProductById } from '../../../services/product.servies';
import { hostServerAdmin } from '../../../constant/api';
import { getListPaymentType } from '../../../services/paymentType.services';
import { getListShippingType } from '../../../services/shippingType.services';

import { GetAll } from '../../../services/statusorder.services';
import { toast } from 'react-toastify';

type DataParams = {
    id: string;
};

export const OrderDetail = () => {
    const { id } = useParams<DataParams>();
    const navigate = useNavigate();
    const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([
        { id: 0, paymentType_name: '', price: 0, thumbnail: '' },
    ]);
    const [shippingTypes, setShippingTypes] = useState<ShippingType[]>([{ id: 0, shippingType_name: '', price: 0 }]);

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
    const [statusOrders, setStatusOrders] = useState([{ id: 0, status_name: '' }]);
    const [products, setProducts] = useState([]);

    const getOrder = async () => {
        try {
            const res = await GetOrderById(id);
            setOrder(res);
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
    };
    const getProduct = (id: any) => {
        if (order.id !== 0) {
            const res = getProductById(id);
            return res;
        }
    };
    const handleGetProduct = () => {
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
                    setProducts(newProduct);
                });
            });
        }
    };

    const handleUpdateOrder = async () => {
        const data = order;
        try {
            const res = await UpdateOrder(data);
            if (res.status === 200) {
                navigate('/admin/order');

                toast.success('Sửa thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
            console.log(res);
        } catch (err) {
            console.log(err);
            toast.error('Có lỗi', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    useEffect(() => {
        getOrder();
        const getShippingTypes = async () => {
            try {
                const listShippingTypes = await getListShippingType();
                setShippingTypes(listShippingTypes);
            } catch (error) {
                console.log(error);
            }
        };
        const getPaymentTypes = async () => {
            try {
                const listPaymentTypes = await getListPaymentType();
                setPaymentTypes(listPaymentTypes);
            } catch (error) {
                console.log(error);
            }
        };
        const getStatusOrder = async () => {
            try {
                const res = await GetAll();
                setStatusOrders(res);
            } catch (err) {
                console.log(err);
            }
        };
        getPaymentTypes();
        getShippingTypes();
        getStatusOrder();
    }, [id]);

    useEffect(() => {
        handleGetProduct();
    }, [order]);

    const columns: TableColumn<OrderDetailsType>[] = [
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
                        <h1 style={{ textTransform: 'uppercase', fontWeight: '600' }}>Chi tiết đơn hàng</h1>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <h3 className="title">Thông tin đơn hàng</h3>
                                <div className="col-lg-6">
                                    <input id="order_id" className="form-control" value={order.id} hidden></input>
                                    <div className="form-group">
                                        <label htmlFor="user_id">Mã khách hàng:</label>
                                        <input
                                            name="user_id"
                                            id="user_id"
                                            className="form-control"
                                            value={order.user_id}
                                            readOnly
                                        ></input>
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="full_name">Tên khách hàng:</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            id="full_name"
                                            className="form-control"
                                            readOnly
                                            value={order.full_name}
                                        ></input>
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone_number">Số điện thoại:</label>
                                        <input
                                            type="text"
                                            name="phone_number"
                                            id="phone_number"
                                            className="form-control"
                                            readOnly
                                            value={order.phone_number}
                                        ></input>
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="money_total">Tổng tiền đơn hàng</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="money_total"
                                            value={order.money_total}
                                            readOnly
                                        />
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="paymentType_id">Kiểu thanh toán</label>
                                        <select
                                            name=""
                                            id="paymentType_id"
                                            className="form-control"
                                            value={order.paymentType_id}
                                            style={{ pointerEvents: 'none' }}
                                        >
                                            {paymentTypes.map((paymentType) => {
                                                if (paymentType.id === order.paymentType_id) {
                                                    return (
                                                        <option value={paymentType.id} selected>
                                                            {paymentType.paymentType_name}
                                                        </option>
                                                    );
                                                } else {
                                                    return (
                                                        <option value={paymentType.id} selected>
                                                            {paymentType.paymentType_name}
                                                        </option>
                                                    );
                                                }
                                            })}
                                        </select>
                                        <div className="error_message" style={{ display: 'none' }}></div>
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
                                                readOnly
                                                value={order.receiving_address}
                                            ></input>
                                            <div className="error_message" style={{ display: 'none' }}></div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email:</label>
                                            <input
                                                type="text"
                                                name="email"
                                                readOnly
                                                id="email"
                                                className="form-control"
                                                value={order.email}
                                            ></input>
                                            <div className="error_message" style={{ display: 'none' }}></div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="order_date">Ngày đặt hàng:</label>
                                            <input
                                                type="date"
                                                name="order_date"
                                                id="order_date"
                                                readOnly
                                                className="form-control"
                                                value={order.order_date.slice(0, 10)}
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
                                                    setOrder({
                                                        ...order,
                                                        status_id: Number(e.target.value),
                                                    });
                                                }}
                                                style={{ pointerEvents: `${order.status_id === 5 ? 'none' : 'auto'}` }}
                                                value={order.status_id}
                                            >
                                                {statusOrders.length > 0 &&
                                                    statusOrders.map((statusOrder) => {
                                                        if (statusOrder.id === order.status_id) {
                                                            return (
                                                                <option value={statusOrder.id} selected>
                                                                    {statusOrder.status_name}
                                                                </option>
                                                            );
                                                        } else
                                                            return (
                                                                <option value={statusOrder.id}>
                                                                    {statusOrder.status_name}
                                                                </option>
                                                            );
                                                    })}
                                            </select>
                                            <div className="error_message" style={{ display: 'none' }}></div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="shippingType_id">Kiểu giao hàng</label>
                                            <select
                                                name=""
                                                id="shippingType_id"
                                                className="form-control"
                                                value={order.shippingType_id}
                                                style={{ pointerEvents: 'none' }}
                                            >
                                                {shippingTypes.map((shippingType) => {
                                                    if (shippingType.id === order.shippingType_id) {
                                                        return (
                                                            <option value={shippingType.id} selected>
                                                                {shippingType.shippingType_name}
                                                            </option>
                                                        );
                                                    } else {
                                                        return (
                                                            <option value={shippingType.id} selected>
                                                                {shippingType.shippingType_name}
                                                            </option>
                                                        );
                                                    }
                                                })}
                                            </select>
                                            <div className="error_message" style={{ display: 'none' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="form-group"
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                    {order.status_id !== 5 && order.status_id !== 7 && (
                                        <button
                                            type="button"
                                            style={{ width: '20%', padding: '10px 0px' }}
                                            name="cmd"
                                            className="btn btn-primary btn-add"
                                            onClick={() => handleUpdateOrder()}
                                        >
                                            {id !== undefined ? 'Lưu Lại' : 'Thêm mới'}
                                            <i className="fa-solid fa-plus" style={{ marginLeft: '10px' }}></i>
                                        </button>
                                    )}

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
            <div className="card  " style={{ marginTop: '20px' }}>
                <div className="card-header">
                    <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>Danh sách sản phẩm</h3>
                </div>

                <div className="card-body table_order_detail">
                    <DataTable columns={columns} data={order.orderDetails} />
                </div>
            </div>
        </>
    );
};
