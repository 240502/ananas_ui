import React from 'react';

export const Sidebar = () => {
    return (
        <div className="form-us ">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/">Trang chủ</a>
                    </li>
                    <li className="line" />
                    <li className="breadcrumb-item active" aria-current="page">
                        Tài khoản
                    </li>
                </ol>
            </nav>
            <div className="content">
                <div className="nav " >
                    <ul className="list-nav">
                        <li className="nav-item">
                            <a style={{ color: '#000', textDecoration: 'none' }} href="#">
                                {' '}
                                Thông tin tài khoản
                            </a>
                        </li>
                        <li className="nav-item  active">
                            <a style={{ color: '#000', textDecoration: 'none' }} href="/dashboard">
                                {' '}
                                Quản lý loại sản phẩm
                            </a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color: '#000', textDecoration: 'none' }} href="./ManageProduct.html">
                                {' '}
                                Quản lý sản phẩm
                            </a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color: '#000', textDecoration: 'none' }} href="./ManageOrder.html">
                                {' '}
                                Quản lý đơn hàng
                            </a>
                        </li>
                        <li className="nav-item  ">
                            <span> Báo cáo kết quả</span>
                            <i className="fa-solid fa-caret-down" style={{ color: '#000000' }} />
                        </li>
                        <li>
                            <ul className="sub-nav" style={{ display: 'none' }}>
                                <li className="active">
                                    <a href="./BaoCaoChung.html">Báo cáo chung</a>
                                </li>
                                <li>
                                    <a href="./ThongKeDoanhThu.html">Kết quả bán hàng</a>
                                </li>
                                <li>
                                    <a href="./KetQuaMakerting.html">Kết quả marketing</a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item  nav-parent">
                            <span>Cài đặt chung</span>
                            <i className="fa-solid fa-caret-down" style={{ color: '#000000' }} />
                        </li>
                        <li>
                            <ul className="sub-nav" style={{ display: 'none' }}>
                                <li>
                                    <a href="#">Đổi mật khẩu</a>
                                </li>
                                <li className="logout">
                                    <button className=" btnLogout">Đăng xuất</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
