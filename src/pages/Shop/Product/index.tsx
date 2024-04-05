import '../../../assets/css/Shop/product.css';
import {toggleNav,activeItemTree} from '../../../utils/product';
function Product() {
    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 left hidden-xs hidden-sm">
                        <div className="left-type">
                            <ul className="nav nav-tabs" style={{ border: 'none' }}>
                                <li>
                                    <a href="#">Tất cả</a>
                                </li>
                                <li className="type-divider"></li>
                                <li>
                                    <a href="#">Nam</a>
                                </li>
                                <li className="type-divider"></li>
                                <li>
                                    <a href="#">Nữ</a>
                                </li>
                            </ul>
                        </div>
                        <div className="left-divider"></div>

                        <div className="left-tree">
                            <ul className="nav" style={{ display: 'block' }}>
                                <li className="first-lv1 open">
                                    <button type="button" className="tree-title" onClick={() => toggleNav()}>
                                        Kiểu dáng <i className="fa-solid fa-angle-down" />
                                    </button>
                                    <ul className=" tree">
                                        <li onClick={() => activeItemTree()} >
                                            <a href="#">Low Top</a>
                                        </li>
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">High Top</a>
                                        </li>
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">Slip-on</a>
                                        </li>
                                        <li onClick={() => activeItemTree()}> 
                                            <a href="#">Mid Top</a>
                                        </li>
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">Mule</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-divider" />
                                <li className="first-lv1 open">
                                    <button type="button" className="tree-title"  onClick={() => toggleNav()}>
                                        Dòng sản phẩm
                                        <i className="fa-solid fa-angle-down" />
                                    </button>
                                    <ul className=" tree">
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">Basas</a>
                                        </li>
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">Vintas</a>
                                        </li>
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">Urbas</a>
                                        </li>
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">Pattas</a>
                                        </li>
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">Track 6</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-divider" />
                                <li className="first-lv1 open">
                                    <button type="button" className="tree-title"  onClick={() => toggleNav()}>
                                        Giá
                                        <i className="fa-solid fa-angle-down" />
                                    </button>
                                    <ul className=" tree">
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">500k - 599k</a>
                                        </li>
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">&gt; 600k</a>
                                        </li>
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">400k - 499k</a>
                                        </li>
                                        <li onClick={() => activeItemTree()}>
                                            <a href="#">300k - 399k</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="right col-xs-12 col-sm-12 col-md-9 col-lg-9">
                        <div className="row right-banner">
                            <img src="img/Desktop_Homepage_Banner.jpg" />
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 item">
                                <div className="thumbnail">
                                    <div className="cont-item">
                                        <a href="/product-detail">
                                            <img src="img/img_pro_demo.jpg" />
                                        </a>
                                    </div>
                                    <div className="button">
                                        <button type="button" className="btn btn-addtocart">
                                            Mua ngay
                                        </button>
                                        <button type="button" className="btn btn-like">
                                            <i className="fa-regular fa-heart" />
                                        </button>
                                    </div>
                                    <div className="caption">
                                        <h3 className="type"> New Arrival</h3>
                                        <h3 className="divider" />
                                        <h3 className="name">Nguyễn Văn Sang</h3>
                                        <h3 className="color">Insignia Blue</h3>
                                        <h3 className="price">620.000 VND</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 item">
                                <div className="thumbnail">
                                    <div className="cont-item">
                                        <a href="#">
                                            <img src="img/img_pro_demo.jpg" />
                                        </a>
                                    </div>
                                    <div className="button">
                                        <button type="button" className="btn btn-addtocart">
                                            Mua ngay
                                        </button>
                                        <button type="button" className="btn btn-like">
                                            <i className="fa-regular fa-heart" />
                                        </button>
                                    </div>
                                    <div className="caption">
                                        <h3 className="type"> New Arrival</h3>
                                        <h3 className="divider" />
                                        <h3 className="name">Nguyễn Văn Sang</h3>
                                        <h3 className="color">Insignia Blue</h3>
                                        <h3 className="price">620.000 VND</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 item">
                                <div className="thumbnail">
                                    <div className="cont-item">
                                        <a href="">
                                            <img src="img/img_pro_demo.jpg" />
                                        </a>
                                    </div>
                                    <div className="button" />
                                    <div className="caption">
                                        <h3 className="type"> New Arrival</h3>
                                        <h3 className="divider" />
                                        <h3 className="name">Nguyễn Văn Sang</h3>
                                        <h3 className="color">Insignia Blue</h3>
                                        <h3 className="price">620.000 VND</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 item">
                                <div className="thumbnail">
                                    <div className="cont-item">
                                        <a href="">
                                            <img src="img/img_pro_demo.jpg" />
                                        </a>
                                    </div>
                                    <div className="button" />
                                    <div className="caption">
                                        <h3 className="type"> New Arrival</h3>
                                        <h3 className="divider" />
                                        <h3 className="name">Nguyễn Văn Sang</h3>
                                        <h3 className="color">Insignia Blue</h3>
                                        <h3 className="price">620.000 VND</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Product;
