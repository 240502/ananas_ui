import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Delete, getList } from '../../../services/category.services';
import '../../../assets/css/Admin/toast.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { ProductCategoryType } from '../../../types';

export const Category = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [pageCount, setPageCount] = useState(0);
    const [cates, setCates] = useState<ProductCategoryType[]>([]);
    const handlePageClick = (event: any) => {
        setPage(event.selected + 1);
    };
    const changeInputValue = (e: any) => {
        setPageSize(+e.target.value);
    };
    useEffect(() => {
        async function loadData() {
            try {
                let items = await getList({
                    pageIndex: page,
                    pageSize: pageSize,
                });
                setCates(items.data);
                setPageCount(Math.ceil(items.totalItems / pageSize));
                console.log(pageCount);
            } catch (err) {
                console.log(err);
                setPageCount(0);
                setCates([]);
            }
        }
        loadData();
    }, [page, pageSize]);
    const handleDelete = async (id: number) => {
        try {
            const res = await Delete(id);
            const newList = cates.filter((cate) => cate.id !== id);
            setCates(newList);
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
        } catch (err) {
            toast.success('Xóa thất bại', {
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
    const columns: TableColumn<ProductCategoryType>[] = [
        {
            name: 'ID',
            selector: (row): any => row.id,
            sortable: true,
        },
        {
            name: 'Tên Loại Sản Phẩm',
            selector: (row): any => row.cate_name,
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
                            to={`/admin/category/${row.id}`}
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
            <div className="text-start container">
                <Link className="btn btn-primary" style={{ width: '200px' }} to={'/admin/category/create'}>
                    Thêm loại sản phẩm +
                </Link>
            </div>
            <div className="card">
                <div className="card-header">
                    <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>Danh sách loại sản phẩm</h3>
                </div>

                <div className="card-body">
                    <DataTable columns={columns} data={cates} selectableRows fixedHeader />
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
        </>
    );
};
