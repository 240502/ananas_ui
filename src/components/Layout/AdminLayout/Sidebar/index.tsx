import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../../assets/css/Admin/sidebar.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, userValue } from '../../../../store/user.atom';
import { getRoleById } from '../../../../services/role.services';
export const Sidebar = () => {
    const userInfo = useRecoilValue(userValue);
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    const [role, setRole] = useState({ id: 0, role_name: '' });
    const handleLogOut = async () => {
        setUser({
            id: 0,
            passowrd: '',
            role: 0,
            active: false,
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
        });
        navigate('/');
    };
    const hideConfirmationModal = () => {
        setActiveModalConfirm(false);
    };
    useEffect(() => {
        const getRole = async (id: any) => {
            try {
                const res = await getRoleById(id);
                setRole(res);
            } catch (err) {
                console.log(err);
            }
        };
        getRole(userInfo.user.role);
    }, []);
    const [activeModalConfirm, setActiveModalConfirm] = useState(false);
    return (
        <>
            <div className="sidebar active">
                <div className="top">
                    <Link to="/" className="logo" style={{ cursor: 'pointer' }}>
                        <i className="fa-brands fa-codepen" />
                        <span>Ananas</span>
                    </Link>
                    <i className="fa-solid fa-bars" id="btn" />
                </div>
                <div className="user" style={{ marginLeft: ' 11.235px' }}>
                    <div>
                        <p className="bole">{userInfo.user.us_name}</p>
                        <p style={{ textTransform: 'capitalize' }}>{role.role_name}</p>
                    </div>
                </div>
                <ul>
                    {userInfo.user.role === 1 && (
                        <>
                            <li className="">
                                <Link to="/admin/dashboard">
                                    <i className="fa-solid fa-chart-line"></i>
                                    <span className="nav-item">Dashboard</span>
                                </Link>
                                <span className="tooltip">Dashboard</span>
                            </li>
                            <li className="">
                                <Link to="/admin/category">
                                    <i className="fa-solid fa-list"></i>
                                    <span className="nav-item"> Loại sản phẩm</span>
                                </Link>
                                <span className="tooltip">Loại sản phẩm</span>
                            </li>
                            <li className="">
                                <Link to="/admin/product">
                                    <i className="fa-solid fa-shoe-prints"></i>
                                    <span className="nav-item">Sản phẩm</span>
                                </Link>
                                <span className="tooltip">Sản phẩm</span>
                            </li>
                            <li className="">
                                <Link to="/admin/user">
                                    <i className="fa-regular fa-user"></i>
                                    <span className="nav-item"> Khách hàng</span>
                                </Link>
                                <span className="tooltip">Khách hàng</span>
                            </li>

                            <li className="">
                                <Link to="/admin/order">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span className="nav-item"> Đơn hàng</span>
                                </Link>
                                <span className="tooltip">Đơn hàng</span>
                            </li>
                        </>
                    )}

                    {userInfo.user.role === 3 && (
                        <>
                            <li className="">
                                <Link to="/admin/dashboard">
                                    <i className="fa-solid fa-list"></i>
                                    <span className="nav-item">Dashboard</span>
                                </Link>
                                <span className="tooltip">Dashboard</span>
                            </li>
                            <li className="">
                                <Link to="/admin/user">
                                    <i className="fa-solid fa-list"></i>
                                    <span className="nav-item"> Nhân viên</span>
                                </Link>
                                <span className="tooltip">Nhân viên</span>
                            </li>
                        </>
                    )}

                    <li>
                        <Link to="/admin/account">
                            <i className="fa-regular fa-circle-user" />
                            <span className="nav-item"> Tài khoản</span>
                        </Link>
                        <span className="tooltip">Tài khoản</span>
                    </li>
                    <li>
                        <a href="#" className="btnLogoff" onClick={() => setActiveModalConfirm(true)}>
                            <span style={{ transform: 'rotate(-180deg)' }}>
                                <i className="fa-solid fa-arrow-right-from-bracket" />
                            </span>
                            <span className="nav-item"> Đăng xuất</span>
                        </a>
                        <span className="tooltip">Đăng xuất</span>
                    </li>
                </ul>
            </div>
            <div
                id="modal-confirm-delete"
                className={activeModalConfirm === true ? 'opened' : ''}
                onClick={hideConfirmationModal}
            >
                <div className="modal-confirm-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-confirm-header">
                        <h3>Thông báo</h3>
                        <div className="modal-confirm-close">
                            <i
                                className="fa-solid fa-xmark"
                                style={{ color: '#000000' }}
                                onClick={hideConfirmationModal}
                            />
                        </div>
                        <h4 className="modal-confirm-title">Bạn chắn chắn muốn đăng xuất ?</h4>
                    </div>
                    <div className="modal-confirm-action">
                        <button type="button" className="btn btnNo" onClick={hideConfirmationModal}>
                            Hủy
                        </button>
                        <button
                            type="button"
                            className="btn btnYes"
                            onClick={() => {
                                handleLogOut();
                            }}
                        >
                            Đồng ý
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
