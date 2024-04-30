import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Delete, getList } from '../../../services/product.servies';
import { ProductType } from '../../../types';
import { hostServerAdmin } from '../../../constant/api';
import { DeleteFile } from '../../../services/image_product.services';
import path from 'path';

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
            imageGallery: { id: 0, img_src: '', product_id: 0, feature: false },
            priceModel: {
                id: 0,
                price: 0,
                product_id: 0,
                start_date: '',
                end_date: '',
                created_at: '',
                updated_at: '',
            },
            productDetails: [{ id: 0, quantity: 0, product_id: 0, size: 0 }],
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
    const handleDelete = async (id: number, img_src: string) => {
        try {
            const res = await Delete(id);
            if (img_src.includes('uploads')) {
                let path: string = img_src.slice(18, img_src.length);
                console.log(img_src.slice(18, img_src.length));

                const resDeleteFile = await DeleteFile(path);
                console.log(resDeleteFile);
            }
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
            selector: (row): any => {
                return (
                    <img
                        style={{ width: '50%', padding: '10px 0' }}
                        src={
                            row.imageGallery.img_src.includes('uploads')
                                ? hostServerAdmin + row.imageGallery.img_src
                                : 'http://localhost:3000/' + row.imageGallery.img_src
                        }
                        alt=""
                    />
                );
            },
        },
        {
            name: 'Tên Loại Sản Phẩm',
            selector: (row): any => row.pro_name,
            sortable: true,
        },
        {
            name: 'Giá',
            selector: (row): any => row.priceModel.price.toLocaleString(undefined) + ' VND',
            sortable: true,
        },
        {
            name: 'Chức năng',
            cell: (row) => {
                return (
                    <>
                        <Link
                            to={`/admin/product/update/${row.id}`}
                            className="btn btn-success"
                            style={{ marginRight: '10px' }}
                        >
                            Sửa
                        </Link>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(row.id, row.imageGallery.img_src)}
                        >
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
        </>
    );
};
