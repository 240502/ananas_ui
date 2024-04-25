import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../../assets/css/Shop/search_product.css';
import { searchProduct } from '../../../services/product.servies';
import ReactPaginate from 'react-paginate';
import { Thumbnail } from './Thumbnail';
import Price from '../Product/Price';
import { Color } from './Color';
import { Type } from './Type';

type DataParams = {
    value: string;
};
type ProductType = {
    id: number;
    pro_name: string;
    color_id: number;
    style_id: number;
    cate_id: number;
    status_id: number;
    out_sole: string;
    gender: string;
    material_id: number;
    collection_id: number;
};
export const SearchProduct = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalItems, setTotalItems] = useState(0);
    const { value } = useParams<DataParams>();
    useEffect(() => {
        async function Search(value: any) {
            try {
                const data = await searchProduct({
                    pageIndex: page,
                    pageSize: pageSize,
                    value: value,
                });
                setProducts(data.data);
                setPageCount(Math.ceil(data.totalItems / pageSize));
                setTotalItems(data.totalItems);
            } catch (error) {
                console.log(error);
                setTotalItems(0);

                setPageCount(0);
                setProducts([]);
            }
        }
        Search(value);
        console.log(products);
    }, [page, pageSize]);
    const handlePageClick = (event: any) => {
        setPage(event.selected + 1);
    };
    const changeInputValue = (e: any) => {
        setPageSize(+e.target.value);
    };
    return (
        <>
            <div
                className="prd1-cont container"
                style={{
                    maxWidth: '1200px',
                    marginTop: '30px',
                    marginBottom: '30px',
                }}
            >
                <div className="row">
                    <div
                        className="col-xs-12 col-sm-12 col-md-12 col-lg-12 prd-search"
                        style={{
                            paddingLeft: '10px',
                        }}
                    >
                        <div
                            className="row prd-search-title text-center"
                            style={{
                                fontSize: '30px',
                                color: '#000',
                                margin: '0px 0px 20px 0px',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            TÌM THẤY {totalItems} KẾT QUẢ CHO "{value}"
                        </div>
                        <div
                            className="row divider2"
                            style={{
                                borderBottom: '#000 2px solid ',
                                height: '1px',
                                margin: '25px -10px 30px -10px',
                            }}
                        ></div>
                        <div
                            className="row prd1-right-items"
                            style={{
                                marginLeft: '-20px',
                                marginRight: '-20px',
                                minHeight: '200px',
                                display: `${products.length >= 1 ? 'flex' : 'none'}`,
                            }}
                        >
                            {products.map((product: ProductType) => {
                                return (
                                    <div
                                        className="col-xs-6 col-sm-6 col-md-4 col-lg-4 item"
                                        style={{ marginBottom: '20px' }}
                                    >
                                        <div
                                            className="thumbnail"
                                            style={{
                                                display: 'inline-block',
                                                padding: '0px',
                                                marginBottom: '0px',
                                                backgroundColor: '#fff',
                                                border: 'none',
                                                borderRadius: '0',
                                                position: 'relative',
                                                width: '100%',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <div
                                                className="cont-item"
                                                style={{
                                                    textAlign: 'center',
                                                    overflow: 'hidden',
                                                    width: '100%',
                                                    paddingTop: '100%',
                                                    position: 'relative',
                                                }}
                                            >
                                                <Thumbnail proId={product.id}></Thumbnail>
                                            </div>
                                            <div className="button">
                                                <button type="button" className="btn btn-addtocart">
                                                    <Link to={`/product-detail/${product.id}`}>Mua ngay</Link>
                                                </button>
                                                <button type="button" className="btn btn-like">
                                                    <i className="fa-regular fa-heart" />
                                                </button>
                                            </div>
                                            <div className="caption">
                                                {product['status_id'] != 0 ? <Type id={product['status_id']} /> : null}
                                                <h3
                                                    className="divider"
                                                    style={{
                                                        display: ` block`,
                                                    }}
                                                />
                                                <h3 className="name">
                                                    <Link to={`/product-detail/${product.id}`}>{product.pro_name}</Link>
                                                </h3>
                                                <Color proId={product.color_id}></Color>
                                                <Price proId={product.id}></Price>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <section className="page" style={{ display: `${pageCount > 1 ? 'flex' : 'none'}` }}>
                            <select
                                name="pageSize"
                                className="form-control"
                                onChange={(e) => changeInputValue(e)}
                                value={pageSize}
                            >
                                <option value="5">6</option>
                                <option value="12">12</option>
                                <option value="18">18</option>
                                <option value="24">24</option>
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
        </>
    );
};
