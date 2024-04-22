import { Link } from 'react-router-dom';
import '../../../../assets/css/Shop/header.css';
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState, infoValue } from '../../../../store/cart.atom';
import { useEffect } from 'react';
import { userState, userValue } from '../../../../store/user.atom';

function Header() {
    const userInfo = useRecoilValue(userValue);
    const info = useRecoilValue(infoValue);

    const [carts, setCarts] = useRecoilState(cartState);
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCarts(cart);
    }, []);
    return (
        <header>
            <div className="container-fluid header hidden-sm hidden-xs">
                <div className="row">
                    <ul className="menu">
                        <li key={1}>
                            <Link to="#" key={1}>
                                <i className="fa-brands fa-dropbox" key={1} />
                                <span key={1}>Tra cứu đơn hàng</span>
                            </Link>
                        </li>
                        <li key={2}>
                            <Link to="#" key={2}>
                                <i key={2} className="fa-solid fa-location-dot" />
                                <span key={2}>Tìm cửa hàng</span>
                            </Link>
                        </li>
                        <li key={3}>
                            <Link to="#" key={3}>
                                <i key={3} className="fa-solid fa-heart" />
                                <span key={3}>Yêu thích</span>
                            </Link>
                        </li>
                        <li key={4}>
                            <Link to={userInfo.user.token !== undefined ? '/dashboard' : '/login'} key={4}>
                                <i className="fa-solid fa-user" key={4} />
                                <span key={4}>{userInfo.user.token !== undefined ? 'Tài khoản' : 'Đăng nhập'}</span>
                            </Link>
                        </li>
                        <li key={5}>
                            <Link key={5} to="/your-cart">
                                <i key={5} className="fa-solid fa-cart-shopping" />
                                <span>
                                    Giỏ hàng{' '}
                                    <span style={{ display: `${carts.length == 0 ? 'none' : 'inline-block'}` }}>
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
