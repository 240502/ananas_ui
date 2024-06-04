import '../../../assets/css/Shop/product.css';
import { toggleNav, activeItemTree } from '../../../utils/product';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getList, getProductById } from '../../../services/product.servies';
import ProductColor from './ProductColor';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { indexGender } from '../../../store/product.atom';
import ProductStatus from './ProductStatus';
import ReactPaginate from 'react-paginate';
import { SideBarCategory } from './SideBarCategory';
import { SideBarPrice } from './SideBarPrice';
import { ProductDetailType, ProductType } from '../../../types';
import { hostServerAdmin } from '../../../constant/api';
import { FavoriteProductState, FavoriteProductValue } from '../../../store/favorit_products.atom';
import { handleAddAndRemoveFavoriteProduct } from '../../../utils/favorite_product';
import { getListSizeByProId } from '../../../services/product_detail.services';
import { getStyleById } from '../../../services/style.services';

type DataParams = {
    gender: string;
};
function Product() {
    const [favoriteProducts, setFavoriteProducts] = useRecoilState(FavoriteProductState);
    const [products, setProducts] = useState<ProductType[]>([
        {
            id: 0,
            pro_name: '',
            color_id: 0,
            style_id: 0,
            cate_id: 0,
            status_id: 0,
            out_sole: '',
            gender: '',
            material_id: 0,
            collection_id: 0,
            created_at: '',
            imageGallery: { id: 0, img_src: '', product_id: 0, feature: false },
            priceModel: {
                id: 0,
                price: 0,
                product_id: 0,
                start_date: '',
                end_date: '',
                created_at: '',
                updated_at: '',
            },
            productDetails: [{ id: 0, quantity: 0, product_id: 0, size: 0 }],
        },
    ]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [cateId, setCateId] = useState(0);
    const [startPrice, setStartPrice] = useState(0);
    const [endPrice, setEndPrice] = useState(0);
    const { gender } = useParams<DataParams>();
    const [index, setIndexGender] = useRecoilState(indexGender);

    useEffect(() => {
        async function getProducts(cateId: any, startPrice: any, endPrice: any, gender: any) {
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
        getProducts(cateId, startPrice, endPrice, gender);
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
                                <SideBarCategory setCateId={setCateId} setPage={setPage} />
                                <li className="nav-divider" />
                                <SideBarPrice
                                    setStartPrice={setStartPrice}
                                    setEndPrice={setEndPrice}
                                    setPage={setPage}
                                />
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
                                        <div
                                            className="col-xs-6 col-sm-6 col-md-4 col-lg-4 item"
                                            key={product['id']}
                                            data-id={product.id}
                                        >
                                            <div className="thumbnail">
                                                <div className="cont-item">
                                                    <Link to={'/product-detail/' + product.id}>
                                                        <img
                                                            src={
                                                                product.imageGallery.img_src.includes('uploads')
                                                                    ? hostServerAdmin + product.imageGallery.img_src
                                                                    : 'http://localhost:3000/' +
                                                                      product.imageGallery.img_src
                                                            }
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="button">
                                                    <button type="button" className="btn btn-addtocart">
                                                        <Link to={'/product-detail/' + product.id}>Mua ngay</Link>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={
                                                            favoriteProducts.find(
                                                                (favorite: ProductType) => favorite.id === product.id,
                                                            )
                                                                ? 'btn btn-like active'
                                                                : 'btn btn-like'
                                                        }
                                                        onClick={async () => {
                                                            const res = await getProductById(product.id);
                                                            const style = await getStyleById(product.style_id);
                                                            const rowProduct = document.querySelector(
                                                                `.item[data-id = '${product.id}']`,
                                                            );
                                                            const color_name: string =
                                                                rowProduct?.querySelector('.color')?.textContent || '';
                                                            handleAddAndRemoveFavoriteProduct(
                                                                res,
                                                                color_name,
                                                                style,
                                                                favoriteProducts,
                                                                setFavoriteProducts,
                                                            );
                                                        }}
                                                    >
                                                        <i
                                                            className={
                                                                favoriteProducts.find(
                                                                    (favorite: ProductType) =>
                                                                        favorite.id === product.id,
                                                                )
                                                                    ? 'fa-solid fa-heart'
                                                                    : 'fa-regular fa-heart'
                                                            }
                                                        />
                                                    </button>
                                                </div>
                                                <div className="caption">
                                                    {product.status_id != 0 ? (
                                                        <ProductStatus id={product.status_id} />
                                                    ) : null}
                                                    <h3
                                                        className="divider"
                                                        style={{
                                                            display: `${product['status_id'] != 0 ? ' block' : 'none'}`,
                                                        }}
                                                    />
                                                    <h3 className="name">
                                                        <Link to={'/product-detail/' + product.id}>
                                                            {product.pro_name}
                                                        </Link>
                                                    </h3>
                                                    <ProductColor id={product['color_id']} />
                                                    <h3 style={{ textTransform: 'capitalize' }} className="price">
                                                        {product.priceModel.price.toLocaleString(undefined)} VNĐ
                                                    </h3>
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
