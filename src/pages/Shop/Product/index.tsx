import { unstable_batchedUpdates } from 'react-dom';
import '../../../assets/css/Shop/product.css';
import { toggleNav, activeItemTree } from '../../../utils/product';
import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getList } from '../../../services/product.servies';
import ProductImage from './ProductImage';
import ProductPrice from './ProductPrice';
import ProductColor from './ProductColor';
import ProductStatus from './ProductStatus';
import ReactPaginate from 'react-paginate';
function Product() {
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [cateId, setCateId] = useState(null);
    const [styleId, setstyleId] = useState(null);
    const [gender, setGender] = useState(null);

    useEffect(() => {
        async function loadData(cateId: any, styleId: any, gender: any) {
            let items = await getList({
                pageIndex: page,
                pageSize: pageSize,
            });
            setProducts(items.data);
            setPageCount(Math.ceil(items.totalItems / pageSize));
        }
        loadData(cateId, styleId, gender);
    }, [page, pageSize, cateId, styleId, gender]);
   
    const handlePageClick = (event: any) => {
        setPage(event.selected + 1);
    };
    const changeInputValue = (e: any) => {
        setPageSize(+e.target.value);
    };
    const productListJSX = products.map((product): any => {
        return (
            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 item" key={product['id']}>
                <div className="thumbnail">
                    <div className="cont-item">
                        <Link to={'/product-detail/' + product['id']}>
                            <ProductImage proId={product['id']} />
                        </Link>
                    </div>
                    <div className="button">
                        <button type="button" className="btn btn-addtocart">
                        <Link to={'/product-detail/' + product['id']}>
                            Mua ngay
                            </Link>
                        </button>
                        <button type="button" className="btn btn-like">
                            <i className="fa-regular fa-heart" />
                        </button>
                    </div>
                    <div className="caption">
                        {product['status_id'] != 0 ? <ProductStatus id={product['status_id']} /> : null}
                        <h3
                            className="divider"
                            style={{ display: `${product['status_id'] != 0 ? ' block' : 'none'}` }}
                        />
                        <h3 className="name">
                            <Link to={'/product-detail/' + product['id']}>{product['pro_name']}</Link>
                        </h3>
                        <ProductColor id={product['color_id']} />
                        <ProductPrice proId={product['id']} />
                    </div>
                </div>
            </div>
        );
    });
    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 left hidden-xs hidden-sm">
                        <div className="left-type">
                            <ul className="nav nav-tabs" style={{ border: 'none' }}>
                                <li>
                                    <a href="#all">Tất cả</a>
                                </li>
                                <li className="type-divider"></li>
                                <li>
                                    <a href="#Nam">Nam</a>
                                </li>
                                <li className="type-divider"></li>
                                <li>
                                    <a href="#Nữ">Nữ</a>
                                </li>
                            </ul>
                        </div>
                        <div className="left-divider"></div>

                        <div className="left-tree">
                            <ul className="nav" style={{ display: 'block' }}>
                                <li className="first-lv1 open">
                                    <button type="button" className="tree-title" onClick={toggleNav}>
                                        Kiểu dáng <i className="fa-solid fa-angle-down" />
                                    </button>
                                    <ul className=" tree">
                                        <li onClick={activeItemTree}>
                                            <input value="Low Top"></input>
                                        </li>
                                        <li onClick={activeItemTree}>
                                            <input value="High Top"></input>
                                        </li>
                                        <li onClick={activeItemTree}>
                                            <input value="Slip-on"></input>
                                        </li>
                                        <li onClick={activeItemTree}>
                                            <input value="Mid Top"></input>
                                        </li>
                                        <li onClick={activeItemTree}>
                                            <input value="Mule"></input>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-divider" />
                                <li className="first-lv1 open">
                                    <button type="button" className="tree-title" onClick={toggleNav}>
                                        Dòng sản phẩm
                                        <i className="fa-solid fa-angle-down" />
                                    </button>
                                    <ul className=" tree">
                                        <li onClick={activeItemTree}>
                                            <input value="basas"></input>
                                        </li>
                                        <li onClick={activeItemTree}>
                                            <input value="Vintas"></input>
                                        </li>
                                        <li onClick={activeItemTree}>
                                            <input value="Urbas"></input>
                                        </li>
                                        <li onClick={activeItemTree}>
                                            <input value="Pattas"></input>
                                        </li>
                                        <li onClick={activeItemTree}>
                                            <input value="Track 6"></input>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-divider" />
                                <li className="first-lv1 open">
                                    <button type="button" className="tree-title" onClick={toggleNav}>
                                        Giá
                                        <i className="fa-solid fa-angle-down" />
                                    </button>
                                    <ul className=" tree">
                                        <li onClick={activeItemTree}>
                                            <input value="500k - 599k"></input>
                                        </li>
                                        <li onClick={activeItemTree}>
                                            <input value="&gt; 600k"></input>
                                        </li>
                                        <li onClick={activeItemTree}>
                                            <input value="400k - 499k"></input>
                                        </li>
                                        <li onClick={activeItemTree}>
                                            <input value="300k - 399k"></input>
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
                        <div className="row">{productListJSX}</div>
                        <section className="page">
                            <select
                                name="pageSize"
                                className="form-control"
                                onChange={(e) => changeInputValue(e)}
                                value={pageSize}
                            >
                                <option value="5">6</option>
                                <option value="10">12</option>
                                <option value="15">18</option>
                                <option value="20">24</option>
                            </select>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel={<i className="fa-solid fa-angle-left"></i>}
                                renderOnZeroPageCount={null}
                            />
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Product;
