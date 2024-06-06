import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { Update, getCateById } from '../../../services/category.services';
import { toast } from 'react-toastify';
import { ProductCategoryType } from '../../../types';

type DataParams = {
    id: string;
};
export const UpdateCategory = () => {
    const [category, setCategory] = useState<ProductCategoryType>({
        id: 0,
        cate_name: '',
        created_at: '',
        updated_at: '',
    });
    const navigate = useNavigate();
    const { id } = useParams<DataParams>();
    useEffect(() => {
        const getCategoryById = async (id: any) => {
            const data = await getCateById(id);
            setCategory(data);
        };
        getCategoryById(id);
    }, [id]);
    const handleUpdate = async () => {
        const data = {
            id: category.id,
            cate_name: category.cate_name,
            created_at: category.created_at,
        };
        try {
            const res = await Update(data);
            if (res.status === 200) {
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
                navigate('/admin/category');
            } else {
                toast.error('Sửa thất bại', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                console.log(res);
            }
        } catch (err) {
            toast.error('Sửa thất bại', {
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
    return (
        <div id="form">
            <div className="card form-add">
                <div className="card-header">
                    <h1>Sửa loại sản phẩm</h1>
                </div>
                <div className="card-body">
                    <form>
                        <input name="id" id="id" hidden className="form-control" value={category.id}></input>
                        <div className="form-group">
                            <label htmlFor="cate_id">Tên loại sản phẩm:</label>
                            <input
                                name="cate_name"
                                id="cate_name"
                                className="form-control"
                                onChange={(e) => setCategory({ ...category, cate_name: e.target.value })}
                                value={category.cate_name}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="create_at">Ngày tạo:</label>
                            <input
                                type="date"
                                name="create_at"
                                id="create_at"
                                className="form-control"
                                onChange={(e) => setCategory({ ...category, created_at: e.target.value })}
                                value={category.created_at.slice(0, 10)}
                            ></input>
                        </div>
                        <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button
                                type="button"
                                style={{ width: '20%', padding: '10px 0px' }}
                                name="cmd"
                                className="btn btn-primary btn-add"
                                onClick={() => handleUpdate()}
                            >
                                Lưu
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
