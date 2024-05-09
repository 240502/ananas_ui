import { useEffect, useState } from 'react';
import { Create } from '../../../services/category.services';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkNameError } from '../../../utils/validation_category';
import { showError, showSuccess } from '../../../utils/global';

export const AddCategory = () => {
    const [cateName, setCateName] = useState('');
    const navigate = useNavigate();
    let inputCateName: any;
    useEffect(() => {
        const queryElement = () => {
            inputCateName = document.querySelector('#cate_name') as HTMLInputElement;
        };
        queryElement();
    });
    const handleCreate = async () => {
        console.log(inputCateName.value.trim() === '');
        if (inputCateName.value.trim() !== '') {
            try {
                let result = await Create({
                    cate_name: cateName,
                });
                if (result.status === 200) {
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
                } else {
                    toast.error('Thêm không thành công', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                    console.log(result);
                }
            } catch (e) {
                console.log(e);
                toast.error('Thêm không thành công', {
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
        } else {
            showError(inputCateName, 'Không được để trống ô này!');
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
                                onFocus={(e) => showSuccess(e.target)}
                                onChange={(e) => setCateName(e.target.value)}
                            ></input>
                            <div className="error_message" style={{ display: 'none' }}></div>
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
