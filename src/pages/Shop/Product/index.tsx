import { unstable_batchedUpdates } from 'react-dom';
import '../../../assets/css/Shop/product.css';
import { toggleNav, activeItemTree } from '../../../utils/product';
import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getList } from '../../../services/product.servies';
import ProductImage from './ProductImage';
import Price from './Price';
import ProductColor from './ProductColor';
import { useRecoilState } from 'recoil';
import { indexGender } from '../../../store/product.atom';
import ProductStatus from './ProductStatus';
import ReactPaginate from 'react-paginate';
import { ProductCategory } from './ProductCategory';
import { ProductPrice } from './ProductPrice';

type DataParams = {
    gender: string;
};
function Product() {
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [cateId, setCateId] = useState(0);
    const [startPrice, setStartPrice] = useState(0);
    const [endPrice, setEndPrice] = useState(0);
    const { gender } = useParams<DataParams>();
    const [index, setIndexGender] = useRecoilState(indexGender);
    useEffect(() => {
        async function loadData(cateId: any, startPrice: any, endPrice: any, gender: any) {
            try {
                let items = await getList({
                    pageIndex: page,
                    pageSize: pageSize,
                    gender: gender != undefined ? gender : '',
                    cate: cateId,
                    startPrice: startPrice,
                    endPrice: endPrice,
                });
                setProducts(items.data);
                setPageCount(Math.ceil(items.totalItems / pageSize));
            } catch (err) {
                console.log(err);
                setPageCount(0);
                setProducts([]);
            }
        }
        loadData(cateId, startPrice, endPrice, gender);
    }, [page, pageSize, cateId, startPrice, endPrice, gender]);

    const handlePageClick = (event: any) => {
        setPage(event.selected + 1);
    };
    const changeInputValue = (e: any) => {
        setPageSize(+e.target.value);
    };
    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 left hidden-xs hidden-sm">
                        <div className="left-type">
                            <ul className="nav nav-tabs" style={{ border: 'none' }}>
                                <li className={index == 0 ? 'active' : ''}>
                                    <Link
                                        to="/product-list"
                                        onClick={() => {
                                            localStorage.setItem('indexGender', JSON.stringify(0));
                                            setIndexGender(0);
                                        }}
                                    >
                                        Tất cả
                                    </Link>
                                </li>
                                <li className="type-divider"></li>
                                <li className={index == 1 ? 'active' : ''}>
                                    <Link
                                        to="/product-list/Man"
                                        onClick={() => {
                                            localStorage.setItem('indexGender', JSON.stringify(1));
                                            setIndexGender(1);
                                        }}
                                    >
                                        Nam
                                    </Link>
                                </li>
                                <li className="type-divider"></li>
                                <li className={index == 2 ? 'active' : ''}>
                                    <Link
                                        to="/product-list/Woman"
                                        onClick={() => {
                                            localStorage.setItem('indexGender', JSON.stringify(2));
                                            setIndexGender(2);
                                        }}
                                    >
                                        Nữ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="left-divider"></div>

                        <div className="left-tree">
                            <ul className="nav" style={{ display: 'block' }}>
                                <ProductCategory setCateId={setCateId} />
                                <li className="nav-divider" />
                                <ProductPrice setStartPrice={setStartPrice} setEndPrice={setEndPrice} />
                            </ul>
                        </div>
                    </div>
                    <div className="right col-xs-12 col-sm-12 col-md-9 col-lg-9">
                        <div className="row right-banner">
                            <img src="http://localhost:3000/img/Desktop_Homepage_Banner.jpg" />
                        </div>
                        <div className="row">
                            {products.length > 0 ? (
                                products.map((product): any => {
                                    return (
                                        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 item" key={product['id']}>
                                            <div className="thumbnail">
                                                <div className="cont-item">
                                                    <Link to={'/product-detail/' + product['id']}>
                                                        <ProductImage proId={product['id']} gender={gender} />
                                                    </Link>
                                                </div>
                                                <div className="button">
                                                    <button type="button" className="btn btn-addtocart">
                                                        <Link to={'/product-detail/' + product['id']}>Mua ngay</Link>
                                                    </button>
                                                    <button type="button" className="btn btn-like">
                                                        <i className="fa-regular fa-heart" />
                                                    </button>
                                                </div>
                                                <div className="caption">
                                                    {product['status_id'] != 0 ? (
                                                        <ProductStatus id={product['status_id']} />
                                                    ) : null}
                                                    <h3
                                                        className="divider"
                                                        style={{
                                                            display: `${product['status_id'] != 0 ? ' block' : 'none'}`,
                                                        }}
                                                    />
                                                    <h3 className="name">
                                                        <Link to={'/product-detail/' + product['id']}>
                                                            {product['pro_name']}
                                                        </Link>
                                                    </h3>
                                                    <ProductColor id={product['color_id']} />
                                                    <Price proId={product['id']} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <section className="page" style={{ display: `${pageCount > 1 ? 'flex' : 'none'}` }}>
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
