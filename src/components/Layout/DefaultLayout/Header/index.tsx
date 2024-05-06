import { useEffect, useState, memo } from 'react';
import SlideHotNews from '../../SlickSlide/SlideHotNews';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { getMenus } from '../../../../services/header.services';
import '../../../../assets/css/Shop/header.css';
import '../../../../assets/css/Shop/slick-slide.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState, infoValue } from '../../../../store/cart.atom';
import { indexGender } from '../../../../store/product.atom';
import { userState, userValue } from '../../../../store/user.atom';

function Header() {
    const [menus, setMenus] = useState([]);
    const [index, setIndexGender] = useRecoilState(indexGender);
    const info = useRecoilValue(infoValue);
    const userInfo = useRecoilValue(userValue);
    const [inputSearch, setInputSearch] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        async function loadData() {
            try {
                let data = await getMenus();
                setMenus(data);
                const indexLocal = JSON.parse(localStorage.getItem('indexGender') || '0');
                setIndexGender(indexLocal);
            } catch (error) {
                console.log(error);
            }
        }
        loadData();
    }, []);

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
                            <Link
                                to={
                                    userInfo.user.token !== ''
                                        ? userInfo.user.role === 2
                                            ? '/admin/account'
                                            : '/admin/dashboard'
                                        : '/login'
                                }
                            >
                                <i className="fa-solid fa-user" />
                                <span>{userInfo.user.token !== '' ? 'Tài khoản' : 'Đăng nhập'}</span>
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
                <div className="row">
                    <div className="navbar center">
                        <div className="navbar-header">
                            <div className="navbar-brand">
                                <Link
                                    to="/"
                                    onClick={() => {
                                        setIndexGender(0);
                                        localStorage.setItem('indexGender', JSON.stringify(0));
                                    }}
                                >
                                    <img src="http://localhost:3000/img/Logo_Ananas_Header.svg" alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="navs">
                            <ul className="nav">
                                {menus.map((menu: any) => {
                                    // nếu menu là sản phẩm
                                    if (menu.id == 1) {
                                        return (
                                            <>
                                                <li className="drop-down" key={menu.menu_name}>
                                                    <Link
                                                        to={menu.url}
                                                        onClick={() => {
                                                            setIndexGender(0);
                                                            localStorage.setItem('indexGender', JSON.stringify(0));
                                                        }}
                                                    >
                                                        <span>{menu.menu_name}</span>
                                                        <i className="fa-solid fa-chevron-down"></i>
                                                    </Link>
                                                    <ul className="dropdown-menu style1">
                                                        <li className="col">
                                                            <a href="#">
                                                                {' '}
                                                                <img src="http://localhost:3000/img/menu_nam.jpg" />
                                                            </a>
                                                            <a href="#" className="dropdown-menu-title">
                                                                Cho nam
                                                            </a>
                                                        </li>
                                                        <li className="col">
                                                            <a href="#">
                                                                {' '}
                                                                <img src="http://localhost:3000/img/Menu_Nu.jpg" />
                                                            </a>
                                                            <a href="#" className="dropdown-menu-title">
                                                                Cho nữ
                                                            </a>
                                                        </li>
                                                        <li className="col">
                                                            <a href="#">
                                                                {' '}
                                                                <img src="http://localhost:3000/img/Menu_Sale-off.jpg" />
                                                            </a>
                                                            <a href="#" className="dropdown-menu-title">
                                                                outlet sale
                                                            </a>
                                                        </li>
                                                        <li className="col">
                                                            <a href="#">
                                                                {' '}
                                                                <img src="http://localhost:3000/img/Menu_Phu-kien.jpg" />
                                                            </a>
                                                            <a href="#" className="dropdown-menu-title">
                                                                Thời trang &amp; phụ kiện
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="line"></li>
                                            </>
                                        );
                                    }
                                    // nếu menu là nam và nữ
                                    if (menu.id > 1 && menu.id < 4) {
                                        return (
                                            <>
                                                <li className="drop-down " key={menu.menu_name}>
                                                    <Link
                                                        to={menu.url}
                                                        onClick={() => {
                                                            localStorage.setItem(
                                                                'indexGender',
                                                                JSON.stringify(menu.id == 2 ? 1 : 2),
                                                            );
                                                            setIndexGender(menu.id == 2 ? 1 : 2);
                                                        }}
                                                    >
                                                        <span>{menu.menu_name}</span>
                                                        <i className="fa-solid fa-chevron-down" />
                                                    </Link>
                                                    <div className="dropdown-menu style2">
                                                        <div className="list-item">
                                                            <div className="col-4 left">
                                                                <h3 className="title ">Nổi bật</h3>
                                                                <div className="item ">
                                                                    <a href="#" className="text-left">
                                                                        Best seller
                                                                    </a>
                                                                    <a href="#" className="text-left">
                                                                        New arrival
                                                                    </a>
                                                                    <a href="#" className="text-left">
                                                                        Sale off
                                                                    </a>
                                                                </div>
                                                                <div className="item">
                                                                    <h3 className="item-title">Bộ sản phẩm</h3>
                                                                    <a href="#">Pattas Living Journey</a>
                                                                    <a href="#">Pattas Polka Dots</a>
                                                                    <a href="#">Basas Evergreen</a>
                                                                    <a href="#">Urbas Ruler</a>
                                                                    <a href="#">Track 6 Class E</a>
                                                                </div>
                                                                <div className="item">
                                                                    <h3 className="item-title">Collaboration</h3>
                                                                </div>
                                                            </div>
                                                            <div className="style2-divider" />
                                                            <div className="col-8 right">
                                                                <div className="col">
                                                                    <h3 className="title "> Giày </h3>
                                                                    <div className="item ">
                                                                        <h3 className="item-title">Dòng sản phẩm</h3>
                                                                        <a href="#">Basas</a>
                                                                        <a href="#">Vintas</a>
                                                                        <a href="#">Urbas</a>
                                                                        <a href="#">Pattas</a>
                                                                        <a href="#">Creas</a>
                                                                        <a href="#">Track 6</a>
                                                                    </div>
                                                                    <div className="item ">
                                                                        <h3 className="item-title">Style</h3>
                                                                        <a href="#">High Top</a>
                                                                        <a href="#">Low Top</a>
                                                                        <a href="#">Slip-on</a>
                                                                    </div>
                                                                    <div className="item ">
                                                                        <h3 className="item-title">Tất cả giày</h3>
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <h3 className="title ">
                                                                        {' '}
                                                                        Thời trang &amp; phụ kiện{' '}
                                                                    </h3>
                                                                    <div className="item ">
                                                                        <h3 className="item-title">Nửa trên</h3>
                                                                        <a href="#">Basic Tee</a>
                                                                        <a href="#">Graphic Tee</a>
                                                                        <a href="#">Sweatshirt</a>
                                                                        <a href="#">Hoodie</a>
                                                                    </div>
                                                                    <div className="item ">
                                                                        <h3 className="item-title">Phụ kiện</h3>
                                                                        <a href="#">Nón</a>
                                                                        <a href="#">Dây giày</a>
                                                                        <a href="#">Vớ</a>
                                                                        <a href="#">Túi Tote</a>
                                                                    </div>
                                                                    <div className="item ">
                                                                        <h3 className="item-title">Xem tất cả</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="style2-des">
                                                            <a href="#">
                                                                MỌI NGƯỜI THƯỜNG GỌI CHÚNG TÔI LÀ
                                                                <span className="highlight" style={{ color: '#fff' }}>
                                                                    DƯA !
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="line" />
                                            </>
                                        );
                                    }
                                    //nếu menu là sale off
                                    if (menu.id >= 4) {
                                        return (
                                            <>
                                                <li className="drop-down" key={menu.id}>
                                                    <a href={menu.url}>
                                                        <span>{menu.menu_name}</span>
                                                    </a>
                                                </li>
                                                <li className="line"></li>
                                            </>
                                        );
                                    }
                                })}
                                <li className="drop-down">
                                    <a href="#">
                                        <img
                                            src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/DiscoverYOU.svg"
                                            alt=""
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <form action="" className="navbar-form navbar-right">
                            <div className="form-group form-search">
                                <i
                                    className="fa-solid fa-magnifying-glass"
                                    onClick={() => {
                                        navigate(`/search-product/${inputSearch}`);
                                    }}
                                />
                                <input
                                    type="text"
                                    className="form-control input-search"
                                    placeholder="Tìm kiếm"
                                    onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            navigate(`/search-product/${inputSearch}`);
                                        }
                                    }}
                                    onChange={(e) => setInputSearch(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="hot-news-cont">
                        <div className="hot-news-slide">
                            <SlideHotNews />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
