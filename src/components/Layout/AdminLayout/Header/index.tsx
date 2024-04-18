import { Link } from 'react-router-dom';
import '../../../../assets/css/Shop/header.css';
import { useRecoilState } from 'recoil';
import { cartState } from '../../../../store/cart.atom';
import { useEffect } from 'react';

function Header() {
    const token = JSON.parse(localStorage.getItem('token') || '');
    
    const [cart, setCart] = useRecoilState(cartState);
    useEffect(()=>{
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(cart);
    },[])
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
                            <Link to={token !== '' ? '/dashboard' : '/login'}>
                                <i className="fa-solid fa-user" />
                                <span>{token !== '' ? 'Tài khoản' : 'Đăng nhập'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/your-cart">
                                <i className="fa-solid fa-cart-shopping" />
                                <span>
                                    Giỏ hàng{' '}
                                    <span style={{ display: `${cart.length == 0 ? 'none' : 'inline-block'}` }}>
                                        ({cart.length})
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
