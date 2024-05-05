import React, { useEffect, useState } from 'react';
import '../../../assets/css/Admin/modal_add.css';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { OrderDetails, OrderType, PaymentType, ProductType, ShippingType } from '../../../types';
import DataTable, { TableColumn } from 'react-data-table-component';
import { OrderDetailType } from '../../../store/order.atom';
import { GetOrderById, UpdateOrder } from '../../../services/order.services';
import { getProductById } from '../../../services/product.servies';
import ReactPaginate from 'react-paginate';
import { hostServerAdmin } from '../../../constant/api';
import { getListPaymentType } from '../../../services/paymentType.services';
import { getListShippingType } from '../../../services/shippingType.services';
import { AddProduct } from './AddProduct';

import { GetAll } from '../../../services/statusorder.services';
import { toast } from 'react-toastify';
import { deleteOrderDetail } from '../../../services/orderdetail.services';
import { ConfimDelete } from './ConfirmDelete';
import { checkEmptyError, handleFocusInput } from '../../../utils/global';
import { checkEmailError, checkNameError, checkPhoneError } from '../../../utils/validation_order';

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
    let inputEmail: any;
    let inputPhone: any;
    let inputName: any;
    let listInputText: any;
    let listInputDate: any;
    const { id } = useParams<DataParams>();
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');
    const navigate = useNavigate();
    const [productId, setProductId] = useState(0);
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [orderDetailId, setOrderDetailId] = useState(0);
    const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([
        { id: 0, paymentType_name: '', price: 0, thumbnail: '' },
    ]);
    const [shippingTypes, setShippingTypes] = useState<ShippingType[]>([{ id: 0, shippingType_name: '', price: 0 }]);

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
    const [statusOrders, setStatusOrders] = useState([{ id: 0, status_name: '' }]);
    const [products, setProducts] = useState([]);
    const [displayAddModal, setDisplayAddModal] = useState(false);
    const showAddProductModal = () => {
        setDisplayAddModal(true);
    };
    const hideAddModal = () => {
        setDisplayAddModal(false);
    };
    const showDeleteModal = (id: any) => {
        setDeleteMessage('Bạn chắc chắn muốn xóa sản phẩm có mã ' + id);
        setDisplayConfirmationModal(true);
        setOrderDetailId(id);
    };

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };
    const getOrder = async () => {
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
    useEffect(() => {
        listInputText = document.querySelectorAll('.form-add input[type="text"]');
        inputEmail = document.querySelector('#email');
        inputPhone = document.querySelector('#phone_number');
        inputName = document.querySelector('#full_name');
    });
    const handleUpdateOrder = async () => {
        const isInputTextEmpty = checkEmptyError(listInputText);
        const isInputDateEmpty = checkEmptyError(listInputDate);
        if (!isInputTextEmpty && !isInputDateEmpty) {
            const isEmailError = checkEmailError(inputEmail);
            const isPhoneError = checkPhoneError(inputPhone);
            const isNameError = checkNameError(inputName);
            if (!isEmailError && !isPhoneError && !isNameError) {
                const data = inputOrder;
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
            }
        }
    };
    const handleDelete = async (id: any) => {
        try {
            const res = await deleteOrderDetail(id);
            if (res.status === 200) {
                toast.success('Xóa thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                getOrder();
                setDisplayConfirmationModal(false);
            }
        } catch (err) {
            console.log(err);
            toast.error('Xóa thất bại', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setDisplayConfirmationModal(false);
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
        handleFocusInput(listInputText);
    }, [id]);

    useEffect(() => {
        handleGetProduct();
    }, [order]);

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
        {
            name: 'Chức năng',
            selector: (row): any => {
                return (
                    <>
                        <button
                            className="btnUpdate btn btn-warning"
                            onClick={(e) => {
                                showAddProductModal();
                                setProductId(row.product_id);
                                setSize(row.size_id);
                                setQuantity(row.quantity);
                                setOrderDetailId(row.id);
                            }}
                        >
                            <i style={{ color: '#fff' }} className="fa-regular fa-pen-to-square"></i>
                        </button>
                        {products.length > 1 && (
                            <button
                                style={{ marginLeft: '10px' }}
                                className="btnDelete btn btn-danger"
                                onClick={() => showDeleteModal(row.id)}
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        )}
                    </>
                );
            },
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
                                            type="text"
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
                                            type="text"
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
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="paymentType_id">Kiểu thanh toán</label>
                                        <select
                                            name=""
                                            id="paymentType_id"
                                            className="form-control"
                                            value={inputOrder.paymentType_id}
                                            onChange={(e) => {
                                                setInputOrder({
                                                    ...inputOrder,
                                                    paymentType_id: Number(e.target.value),
                                                });
                                            }}
                                        >
                                            {paymentTypes.map((paymentType) => {
                                                if (paymentType.id === inputOrder.paymentType_id) {
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
                                            >
                                                {statusOrders.length > 0 &&
                                                    statusOrders.map((statusOrder) => {
                                                        if (statusOrder.id === inputOrder.status_id) {
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
                                                value={inputOrder.shippingType_id}
                                                onChange={(e) => {
                                                    const prvId = Number(inputOrder.shippingType_id);
                                                    const prvShippingType: any = shippingTypes.find(
                                                        (shippingType) => shippingType.id === prvId,
                                                    );
                                                    const newShippingType: any = shippingTypes.find(
                                                        (shippingType) => shippingType.id === Number(e.target.value),
                                                    );

                                                    const newMoneyTotal =
                                                        inputOrder.money_total -
                                                        prvShippingType?.price +
                                                        newShippingType?.price;
                                                    console.log('money=' + newMoneyTotal);
                                                    setInputOrder({
                                                        ...inputOrder,
                                                        shippingType_id: Number(e.target.value),
                                                        money_total: newMoneyTotal,
                                                    });
                                                }}
                                            >
                                                {shippingTypes.map((shippingType) => {
                                                    if (shippingType.id === inputOrder.shippingType_id) {
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
                                    <Link
                                        to={'/admin/order'}
                                        onClick={() => {
                                            setProducts([]);
                                        }}
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
                <div className="text-start container">
                    <button
                        className="btn btn-primary"
                        style={{ width: '200px' }}
                        type="button"
                        onClick={() => {
                            showAddProductModal();
                            setProductId(0);
                            setSize(0);
                            setQuantity(0);
                        }}
                    >
                        Thêm sản phẩm +
                    </button>
                </div>
                <div className="card-body table_order_detail">
                    <DataTable columns={columns} data={order.orderDetails} />
                </div>
            </div>
            <AddProduct
                hideConfirmationModal={hideAddModal}
                displayAddModal={displayAddModal}
                orderId={order.id}
                getOrder={getOrder}
                productId={productId}
                size_id={size}
                quantity={quantity}
                orderDetailId={orderDetailId}
            />
            <ConfimDelete
                hideConfirmationModal={hideConfirmationModal}
                deleteMessage={deleteMessage}
                displayConfirmationModal={displayConfirmationModal}
                id={orderDetailId}
                handleDelete={handleDelete}
            />
        </>
    );
};
