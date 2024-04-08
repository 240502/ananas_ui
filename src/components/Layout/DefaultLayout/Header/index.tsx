import { useEffect, useState, memo } from 'react';
import SlideHotNews from '../../SlickSlide/SlideHotNews';
import { Outlet, Link } from 'react-router-dom';
import { getMenus, getGroupSubMenu, getTitleSubMenu, getCategory } from '../../../../services/header.services';
import '../../../../assets/css/Shop/header.css';
import '../../../../assets/css/Shop/slick-slide.css';
import { useRecoilState } from 'recoil';
import { cartState } from '../../../../store/cart.atom';
function Header() {
    const [menus, setMenus] = useState([]);
    const [groupsubmenus, setGroup] = useState([]);
    const [titles, setTitles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useRecoilState(cartState);

    console.log('re-render');
    useEffect(() => {
        async function loadData() {
            let data = await getMenus();
            let groups = await getGroupSubMenu();
            let titles = await getTitleSubMenu();
            let cate = await getCategory();
            setMenus(data);
            setGroup(groups);
            setTitles(titles);
            setCategories(cate);
        }
        loadData();
    }, []);

    const token = JSON.parse(localStorage.getItem('token') || '');
    console.log(token);
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
                            <Link to={token !=='' ? '/dashboard' : '/login'}>
                                <i className="fa-solid fa-user" />
                                <span>{token !=='' ? 'Tài khoản':'Đăng nhập'}</span>
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
                <div className="row">
                    <div className="navbar center">
                        <div className="navbar-header">
                            <div className="navbar-brand">
                                <Link to="/">
                                    <img src="img/Logo_Ananas_Header.svg" alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="navs">
                            <ul className="nav">
                                {menus.map((menu: any) => {
                                    // nếu menu là sản phẩm
                                    if (menu.id == 1) {
                                        const submenu = groupsubmenus.map((group: any): any => {
                                            if (group.menu_show == 0) {
                                                return (
                                                    <li className="col" key={group.id}>
                                                        <a href="#">
                                                            {' '}
                                                            <img src={group.img_show} alt="" />
                                                        </a>
                                                        <a href="#" className="dropdown-menu-title">
                                                            {group.group_name}
                                                        </a>
                                                    </li>
                                                );
                                            }
                                        });
                                        const jsx = (
                                            <>
                                                {' '}
                                                <li className="drop-down" key={menu.id}>
                                                    <Link to="/product-list">
                                                        <span>{menu.menu_name}</span>
                                                        <i className="fa-solid fa-chevron-down" />
                                                    </Link>
                                                    <ul className="dropdown-menu style1">{submenu}</ul>
                                                </li>
                                                <li className="line"></li>
                                            </>
                                        );
                                        return jsx;
                                    }
                                    // nếu menu là nam và nữ
                                    if (menu.id > 1 && menu.id < 4) {
                                        let groupleft = <div></div>;
                                        let groupright = <div></div>;
                                        const submenu = groupsubmenus.map((group: any) => {
                                            if (group.menu_show == 1) {
                                                if (group.id == 1) {
                                                    groupleft = (
                                                        <div className="col-4 left">
                                                            <h3 className="title "> {group.group_name}</h3>
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
                                                                <h3 className="item-title">Collaboration</h3>
                                                            </div>
                                                        </div>
                                                    );
                                                } else {
                                                    let colItem = titles.map((title: any) => {
                                                        const subcateitemjsx = categories.map((cate: any) => {
                                                            if (cate.title_menu_id == title.id)
                                                                return (
                                                                    <a href="#" className="text-left">
                                                                        {cate.cate_name}
                                                                    </a>
                                                                );
                                                        });
                                                        if (title.group_id === group.id) {
                                                            return (
                                                                <div className="item ">
                                                                    <h3 className="item-title">{title.title}</h3>
                                                                    {subcateitemjsx}
                                                                </div>
                                                            );
                                                        }
                                                    });
                                                    return (groupright = (
                                                        <div className="col" key={group.id} data-id={group.id}>
                                                            <h3 className="title "> {group.group_name} </h3>
                                                            {colItem}
                                                        </div>
                                                    ));
                                                }
                                            }
                                        });
                                        const subbottom = (
                                            <div className="style2-des">
                                                <a href="#">
                                                    MỌI NGƯỜI THƯỜNG GỌI CHÚNG TÔI LÀ
                                                    <span className="highlight" style={{ color: '#fff' }}>
                                                        DƯA !
                                                    </span>
                                                </a>
                                            </div>
                                        );
                                        const html = (
                                            <>
                                                <li className="drop-down" key={menu.id}>
                                                    <Link to="/product">
                                                        <span>{menu.menu_name}</span>
                                                        <i className="fa-solid fa-chevron-down" />
                                                    </Link>
                                                    <ul className="dropdown-menu style2">
                                                        <div className="list-item">
                                                            {groupleft}
                                                            <div className="style2-divider" />
                                                            <div className="col-8 right">{submenu}</div>
                                                        </div>
                                                        {subbottom}
                                                    </ul>
                                                </li>
                                                <li className="line"></li>
                                            </>
                                        );
                                        return html;
                                    }
                                    //nếu menu là sale off
                                    if (menu.id >= 4) {
                                        return (
                                            <>
                                                <li className="drop-down" key={menu}>
                                                    <a href="#">
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
                                <i className="fa-solid fa-magnifying-glass" />
                                <input type="text" className="form-control input-search" placeholder="Tìm kiếm" />
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
