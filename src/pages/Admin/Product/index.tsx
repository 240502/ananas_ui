import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Delete, getList } from '../../../services/product.servies';

type ProductType = {
    id: number;
    pro_name: string;
    color_id: number;
    style_id: number;
    cate_id: number;
    status_id: number;
    out_sole: string;
    gender: string;
    material_id: number;
    collection_id: number;
    created_at: string;
};
export const ProductAdmin = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [pageCount, setPageCount] = useState(0);
    const [products, setProducts] = useState<ProductType[]>([
        {
            id: 0,
            pro_name: '',
            color_id: 0,
            style_id: 0,
            cate_id: 0,
            status_id: 0,
            out_sole: '',
            gender: '',
            material_id: 0,
            collection_id: 0,
            created_at: '',
        },
    ]);

    useEffect(() => {
        const loadData = async () => {
            try {
                let items = await getList({
                    pageIndex: page,
                    pageSize: pageSize,
                    gender: '',
                    cate: 0,
                    startPrice: 0,
                    endPrice: 0,
                });
                setProducts(items.data);
                setPageCount(Math.ceil(items.totalItems / pageSize));
            } catch (err) {
                console.log(err);
                setPageCount(0);
                setProducts([]);
            }
        };
        loadData();
    }, [page, pageSize]);

    const handlePageClick = (event: any) => {
        setPage(event.selected + 1);
    };
    const changeInputValue = (e: any) => {
        setPageSize(+e.target.value);
    };
    const handleDelete = async (id: number) => {
        try {
            const res = await Delete(id);
            if (res.status === 200) {
                const newList = products.filter((pro) => pro.id !== id);
                setProducts(newList);
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
            }
        } catch (err) {
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
            console.log(err);
        }
    };
    const columns: TableColumn<ProductType>[] = [
        {
            name: 'ID',
            selector: (row): any => row.id,
            sortable: true,
        },
        {
            name: 'Hình Ảnh Sản Phẩm',
            selector: (row): any => row.created_at,

        },
        {
            name: 'Tên Loại Sản Phẩm',
            selector: (row): any => row.pro_name,
            sortable: true,
        },
        {
            name: 'Ngày Tạo',
            selector: (row): any => row.created_at,
            sortable: true,
        },
        {
            name: 'Chức năng',
            cell: (row) => {
                return (
                    <>
                        <Link
                            to={`/admin/product/${row.id}`}
                            className="btn btn-success"
                            style={{ marginRight: '10px' }}
                        >
                            Sửa
                        </Link>
                        <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>
                            Xóa
                        </button>
                    </>
                );
            },
        },
    ];
    return (
        <>
            <div className="main-content">
                <div className="text-start container">
                    <Link className="btn btn-primary" style={{ width: '200px' }} to={'/admin/product/create'}>
                        Thêm sản phẩm +
                    </Link>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>Danh sách sản phẩm</h3>
                    </div>

                    <div className="card-body">
                        <DataTable columns={columns} data={products} selectableRows fixedHeader />
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
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};
