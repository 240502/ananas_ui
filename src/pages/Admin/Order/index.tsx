import React, { useEffect, useState } from 'react';
import { OrderType } from '../../../types';
import { CancelOrder, GetListOrderWaitConfirmation } from '../../../services/order.services';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { GetAll } from '../../../services/statusorder.services';
import { ConfirmDelete } from './ConfirmDelete';
import { toast } from 'react-toastify';
import { ConfirmCancel } from './ConfirmCancel';

export const Order = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [pageCount, setPageCount] = useState(0);
    const [statusId, setStatusId] = useState(3);
    const [liststatus, setListStatus] = useState([{ id: 0, status_name: '' }]);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [id, setId] = useState(0);
    const [activeCancelAll, setActiveCancelAll] = useState(false);
    const [orders, setOrders] = useState<OrderType[]>([
        {
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
        },
    ]);
    const [orderCancellations, setOrderCancellations] = useState<OrderType[]>([
        {
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
        },
    ]);
    const showDeleteModal = (id: any = 0) => {
        if (id !== 0) {
            setDeleteMessage('Bạn chắc chắn muốn hủy đơn hàng có mã ' + id);
        } else {
            setDeleteMessage('Bạn chắc chắn muốn hủy các đơn hàng đã chọn ');
        }
        setDisplayConfirmationModal(true);
        setId(id);
    };
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };
    useEffect(() => {
        async function getListStatus() {
            try {
                const res = await GetAll();
                setListStatus(res);
            } catch (err) {
                console.log(err);
            }
        }
        getListStatus();
    }, []);
    const loadData = async () => {
        try {
            const res = await GetListOrderWaitConfirmation({
                pageIndex: page,
                pageSize: pageSize,
                status_id: statusId,
            });
            setOrders(res.data);
            setPageCount(Math.ceil(res.totalItems / pageSize));
        } catch (err) {
            console.log(err);
            setPageCount(0);
            setOrders([]);
        }
    };
    useEffect(() => {
        loadData();
    }, [statusId, page, pageSize]);
    const handlePageClick = (event: any) => {
        setPage(event.selected + 1);
    };
    const changeInputValue = (e: any) => {
        setPageSize(+e.target.value);
    };
    const handleCancel = async (id: any) => {
        try {
            const res = await CancelOrder(id);
            if (res.status === 200) {
                toast.success('Hủy thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                hideConfirmationModal();
                loadData();
            }
        } catch (err) {
            console.log(err);
            hideConfirmationModal();
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
    const handleCancelAll = async (orders: any) => {
        if (orders.length > 0) {
            orders.map(async (order: OrderType) => {
                try {
                    const res = await CancelOrder(order.id);
                    if (res.status === 200) {
                        hideConfirmationModal();
                        loadData();
                        var checkBoxAll = document.querySelector(`input[name="select-all-rows"]`) as HTMLInputElement;
                        checkBoxAll.checked = false;

                        setChecked(order.id);
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        }
    };
    const setChecked = (id: any) => {
        var checkBox = document.querySelector(`input[name="select-row-${id}"]`) as HTMLInputElement;
        checkBox.checked = false;
    };
    const columns: TableColumn<OrderType>[] = [
        {
            name: 'ID',
            selector: (row): any => row.id,
            sortable: true,
        },
        {
            name: 'Họ và tên',
            selector: (row): any => row.full_name,
            sortable: true,
        },

        {
            name: 'Số điện thoại',
            selector: (row): any => row.phone_number,
            sortable: true,
        },
        {
            name: 'Địa chỉ',
            selector: (row): any => row.receiving_address,
            sortable: true,
        },

        {
            name: 'Số sản phẩm',
            selector: (row): any => row.totalProduct,
            sortable: true,
        },
        {
            name: 'Tổng tiền',
            selector: (row): any => row.money_total.toLocaleString(undefined) + ' VND',
            sortable: true,
        },
        {
            name: 'Chức năng',
            cell: (row) => {
                return (
                    <>
                        <Link
                            to={`/admin/order/order-detail/${row.id}`}
                            className="btn btn-success"
                            style={{ marginRight: '10px' }}
                        >
                            Chi tiết
                        </Link>
                        {statusId !== 5 && (
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    showDeleteModal(row.id);
                                }}
                            >
                                Hủy
                            </button>
                        )}
                    </>
                );
            },
        },
    ];
    return (
        <>
            <div
                className="text-start container"
                style={{
                    marginLeft: 0,
                }}
            >
                <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="status_id">Chọn loại đơn hàng</label>
                    <select
                        name="status_id"
                        id="status_id"
                        className="form-control"
                        style={{ width: '20%', marginLeft: '10px' }}
                        onChange={(e) => setStatusId(Number(e.target.value))}
                    >
                        {liststatus.map((status) => {
                            return <option value={status.id}>{status.status_name}</option>;
                        })}
                    </select>
                </div>
            </div>
            <div className="card card-data">
                <div className="card-header">
                    <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>Danh sách đơn hàng</h3>
                </div>
                <div className="card-body">
                    {statusId !== 5 && (
                        <button
                            className="btn btn-danger"
                            style={{
                                marginBottom: '10px',
                                pointerEvents: `${activeCancelAll ? 'all' : 'none'}`,
                                opacity: `${activeCancelAll ? '1' : '0.5'}`,
                                textTransform: 'capitalize',
                            }}
                            onClick={(e) => showDeleteModal()}
                        >
                            Hủy tất cả lựa chọn
                        </button>
                    )}
                    <DataTable
                        columns={columns}
                        data={orders}
                        selectableRows
                        onSelectedRowsChange={(e) => {
                            e.selectedCount > 0 ? setActiveCancelAll(true) : setActiveCancelAll(false);

                            if (e.selectedCount > 0) {
                                setOrderCancellations(e.selectedRows);
                            }
                        }}
                        selectableRowsHighlight
                        fixedHeader
                    />
                    <section className="page" style={{ display: `${pageCount > 1 ? 'flex' : 'none'}` }}>
                        <select
                            name="pageSize"
                            className="form-control"
                            onChange={(e) => changeInputValue(e)}
                            value={pageSize}
                        >
                            <option value="5">6</option>
                            <option value="10">12</option>
                            <option value="15">18</option>
                            <option value="20">24</option>
                        </select>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel={<i className="fa-solid fa-angle-left"></i>}
                            renderOnZeroPageCount={null}
                        />
                    </section>
                </div>
            </div>
            <ConfirmCancel
                hideConfirmationModal={hideConfirmationModal}
                deleteMessage={deleteMessage}
                displayConfirmationModal={displayConfirmationModal}
                id={id}
                handleCancel={handleCancel}
                handleCancelAll={handleCancelAll}
                orderCancellations={orderCancellations}
            />
        </>
    );
};
