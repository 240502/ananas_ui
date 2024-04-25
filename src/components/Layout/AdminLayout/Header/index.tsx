import { Link } from 'react-router-dom';
import '../../../../assets/css/Shop/header.css';
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState, infoValue } from '../../../../store/cart.atom';
import { useEffect } from 'react';
import { userState, userValue } from '../../../../store/user.atom';

function Header() {
    const userInfo = useRecoilValue(userValue);
    const info = useRecoilValue(infoValue);

    return (
        <header>
            <div className="container-fluid header hidden-sm hidden-xs">
                <div className="row">
                    <ul className="menu">
                        <li>
                            <Link to="/search-order">
                                <i className="fa-brands fa-dropbox" />
                                <span>Tra cứu đơn hàng</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <i className="fa-solid fa-location-dot" />
                                <span>Tìm cửa hàng</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <i className="fa-solid fa-heart" />
                                <span>Yêu thích</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={userInfo.user.token !== undefined ? '/dashboard' : '/login'}>
                                <i className="fa-solid fa-user" />
                                <span>{userInfo.user.token !== undefined ? 'Tài khoản' : 'Đăng nhập'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/your-cart">
                                <i className="fa-solid fa-cart-shopping" />
                                <span>
                                    Giỏ hàng{' '}
                                    <span style={{ display: `${info.carts.length == 0 ? 'none' : 'inline-block'}` }}>
                                        ({info.total})
                                    </span>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
