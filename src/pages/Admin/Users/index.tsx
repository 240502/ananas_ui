import { useEffect, useState } from 'react';
import { UsersType } from '../../../types';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { Delete, getListUsers, getUserById } from '../../../services/user.services';
import axios from 'axios';
type ProvinceType = {
    id: number;
    name: string;
};

export const Users = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [pageCount, setPageCount] = useState(0);

    const [users, setUsers] = useState<UsersType[]>([
        {
            id: 0,
            passowrd: '',
            role: 1,
            active: true,
            us_name: '',
            email: '',
            phone_number: '',
            birthday: '',
            created_at: '',
            updated_at: '',
            province: '',
            district: '',
            ward: '',
            token: '',
        },
    ]);

    const handlePageClick = (event: any) => {
        setPage(event.selected + 1);
    };
    const changeInputValue = (e: any) => {
        setPageSize(+e.target.value);
    };
    useEffect(() => {
        async function loadData() {
            try {
                const res = await getListUsers({ pageIndex: page, pageSize: pageSize });
                setUsers(res.data);
                setPageCount(Math.ceil(res.totalItems / pageSize));
            } catch (e) {
                console.error(e);
                setPageCount(0);
                setUsers([]);
            }
        }

        loadData();
    }, [pageSize, page]);
    const handleDelete = async (id: number) => {
        try {
            const res = await Delete(id);
            const newList = users.filter((user) => user.id !== id);
            setUsers(newList);
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

    const columns: TableColumn<UsersType>[] = [
        {
            name: 'ID',
            selector: (row): any => row.id,
            sortable: true,
        },
        {
            name: 'Họ và tên',
            selector: (row): any => row.us_name,
            sortable: true,
        },

        {
            name: 'Số điện thoại',
            selector: (row): any => row.phone_number,
            sortable: true,
        },
        {
            name: 'Địa chỉ',
            selector: (row): any => row.ward + '-' + row.district + '-' + row.province,
            sortable: true,
        },
        {
            name: 'Chức năng',
            cell: (row) => {
                return (
                    <>
                        <Link
                            to={`/admin/user/update/${row.id}`}
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
                <Link className="btn btn-primary" style={{ width: '200px' }} to={'/admin/user/create'}>
                    Thêm người dùng +
                </Link>
            </div>
            <div className="card card-data">
                <div className="card-header">
                    <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>Danh sách người dùng</h3>
                </div>

                <div className="card-body">
                    <DataTable columns={columns} data={users} selectableRows fixedHeader />
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
