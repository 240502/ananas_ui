import { Outlet, Link } from 'react-router-dom';
import '../../../../assets/css/Shop/header.css';
import '../../../../assets/css/Shop/slick-slide.css';
function Header() {
    return (
        <header>
            <div className="container-fluid header hidden-sm hidden-xs">
                <div className="row">
                    <ul className="menu">
                        <li>
                            <a href="#">
                                <i className="fa-brands fa-dropbox" />
                                <span>Tra cứu đơn hàng</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-location-dot" />
                                <span>Tìm cửa hàng</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-heart" />
                                <span>Yêu thích</span>
                            </a>
                        </li>
                        <li>
                            <a href="/login">
                                <i className="fa-solid fa-user" />
                                <span>Đăng nhập</span>
                            </a>
                        </li>
                        <li>
                            <Link to="your-cart">
                                <i className="fa-solid fa-cart-shopping" />
                                <span>Giỏ hàng</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <div className="navbar center">
                        <div className="navbar-brand">
                            <Link to="/">
                                <img src="img/Logo_Ananas_Header.svg" alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
