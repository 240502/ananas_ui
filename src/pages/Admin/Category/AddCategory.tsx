import React, { useState } from 'react';
import { Create } from '../../../services/category.services';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const AddCategory = () => {
    const [cateName, setCateName] = useState('');
    const navigate = useNavigate();
    const handleCreate = async () => {
        try {
            let result = await Create({
                cate_name: cateName,
            });
            toast.success('Thêm thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            navigate('/admin/category');
        } catch (e) {
            console.log(e);
            toast.error('Thêm thành công', {
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

    return (
        <div id="form">
            <div className="card form-add">
                <div className="card-header">
                    <h1>Thêm loại sản phẩm</h1>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="cate_id">Tên loại sản phẩm:</label>
                            <input
                                name="cate_name"
                                id="cate_name"
                                className="form-control"
                                onChange={(e) => setCateName(e.target.value)}
                            ></input>
                        </div>
                        <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button
                                type="button"
                                style={{ width: '20%', padding: '10px 0px' }}
                                name="cmd"
                                className="btn btn-primary btn-add"
                                onClick={() => handleCreate()}
                            >
                                Thêm Mới
                                <i className="fa-solid fa-plus" style={{ marginLeft: '10px' }}></i>
                            </button>
                            <Link
                                to={'/admin/category'}
                                className="btn btn-secondary btn-return"
                                style={{ width: '20%', padding: '10px 0px' }}
                            >
                                Quay lại
                                <i className="fa-solid fa-arrow-left-long" style={{ marginLeft: '10px' }}></i>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
