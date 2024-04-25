import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { getList } from '../../../services/category.services';
type ProductCategoryType = {
    id: number;
    cate_name: string;
    created_at: string;
    updated_at: string;
};
export const Category = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [pageCount, setPageCount] = useState(0);
    const [cates, setCates] = useState<ProductCategoryType[]>([]);
    useEffect(() => {
        async function loadData() {
            try {
                let items = await getList({
                    pageIndex: page,
                    pageSize: pageSize,
                });
                setCates(items.data);
                setPageCount(Math.ceil(items.totalItems / pageSize));
            } catch (err) {
                console.log(err);
            }
        }
        loadData();
    }, [page, pageSize]);
    // async function handleCreate() {
    //     let result = await Create({
    //         cate_name: cateName,
    //     });

    //     if (result.status === 200) {
    //         alert('Thêm thành công!');
    //     }
    // }
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
                        <button className="btn btn-success" style={{ marginRight: '10px' }}>
                            Sửa
                        </button>
                        <button className="btn btn-danger">Xóa</button>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <div className="main-content">
                <div className="text-start container">
                    <Link to={'/admin/category/create'} className="btn btn-primary" style={{ width: '200px' }}>
                        Thêm loại sản phẩm +
                    </Link>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>Danh sách loại sản phẩm</h3>
                    </div>

                    <div className="card-body">
                        <DataTable columns={columns} data={cates} selectableRows pagination fixedHeader />
                    </div>
                </div>
            </div>
            <div id="form">
            <div className="card form-add">
                <div className="card-header">
                    <h1>Thêm loại sản phẩm</h1>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="cate_id">Tên loại sản phẩm</label>
                            <input name="cate_name" id="cate_name" className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <button
                                type="button"
                                style={{ width: '30%', marginLeft: '35%', padding: '10px 0px' }}
                                name="cmd"
                                className="btn btn-primary"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
           
        </>
    );
};
