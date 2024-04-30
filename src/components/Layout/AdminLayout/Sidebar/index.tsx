import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../assets/css/Admin/sidebar.css';
export const Sidebar = () => {
    return (
        <div className="sidebar active">
            <div className="top">
                <div className="logo">
                    <i className="fa-brands fa-codepen" />
                    <span>Ananas</span>
                </div>
                <i className="fa-solid fa-bars" id="btn" />
            </div>
            <div className="user">
                <img
                    src="https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/373658815_1239626233412960_2893644615644052814_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH4uhilOpPHjX84-F8MW6PW7zBD8G69ZlTvMEPwbr1mVM0BS1ZHGYyDy0CWwLui4umPZ5jdVi6zEmg5RqRYXOzD&_nc_ohc=h8lKptMZRx8Ab6MXBQ-&_nc_ht=scontent.fhan3-2.fna&oh=00_AfBmQ1w0r80yx4oPU4dpg9xjh6JQNeP9WI2ZI5yd1Vmt3w&oe=66307A12"
                    className="user-img"
                />
                <div>
                    <p className="bole">Nguyễn Văn Sang</p>
                    <p>Admin</p>
                </div>
            </div>
            <ul>
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
                <li className="giangvien">
                    <Link to="/admin/user">
                        <i className="fa-regular fa-user"></i>
                        <span className="nav-item"> Người dùng</span>
                    </Link>
                    <span className="tooltip">Người dùng</span>
                </li>
                <li className="giangvien">
                    <a href="#">
                        <i className="fa-solid fa-people-arrows" />
                        <span className="nav-item"> Giao đề thi</span>
                    </a>
                    <span className="tooltip">Giao đề thi</span>
                </li>
                <li className="giangvien">
                    <a href="./QLLop.html">
                        <i className="fa-solid fa-person-shelter" />
                        <span className="nav-item"> Lớp</span>
                    </a>
                    <span className="tooltip">Lớp</span>
                </li>
                <li className="admin">
                    <a href="./QuanLyUsers.html">
                        <i className="fa-solid fa-users" />
                        <span className="nav-item">Quản lý users</span>
                    </a>
                    <span className="tooltip">Quản lý users</span>
                </li>
                <li>
                    <a href="./TaiKhoan.html">
                        <i className="fa-regular fa-circle-user" />
                        <span className="nav-item"> Tài khoản</span>
                    </a>
                    <span className="tooltip">Tài khoản</span>
                </li>
                <li>
                    <a href="#" className="btnLogoff">
                        <span style={{ transform: 'rotate(-180deg)' }}>
                            <i className="fa-solid fa-arrow-right-from-bracket" />
                        </span>
                        <span className="nav-item"> Đăng xuất</span>
                    </a>
                    <span className="tooltip">Đăng xuất</span>
                </li>
            </ul>
        </div>
    );
};
