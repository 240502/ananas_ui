import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { Update, getCateById } from '../../../services/category.services';
import { ToastContainer, toast } from 'react-toastify';

type ProductCategoryType = {
    id: number;
    cate_name: string;
    created_at: string;
    updated_at: string;
};
type DataParams = {
    id: string;
};
export const UpdateCategory = () => {
    const [cateName, setCateName] = useState('');
    const [createAt, setCreateAt] = useState('');
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
            setCateName(data['cate_name']);
            setCreateAt(data['created_at']);
        };
        getCategoryById(id);
    }, [id]);
    const handleUpdate = async () => {
        const data = {
            id: category.id,
            cate_name: cateName,
            created_at: createAt,
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
                        <div className="form-group">
                            <label htmlFor="id">ID:</label>
                            <input name="id" id="id" readOnly className="form-control" value={category.id}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cate_id">Tên loại sản phẩm:</label>
                            <input
                                name="cate_name"
                                id="cate_name"
                                className="form-control"
                                onChange={(e) => setCateName(e.target.value)}
                                value={cateName}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="create_at">Ngày tạo:</label>
                            <input
                                type="date"
                                name="create_at"
                                id="create_at"
                                className="form-control"
                                onChange={(e) => setCreateAt(e.target.value)}
                                value={createAt.slice(0, 10)}
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
