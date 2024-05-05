import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../../assets/css/Shop/search_product.css';
import { searchProduct } from '../../../services/product.servies';
import ReactPaginate from 'react-paginate';
import { Color } from './Color';
import { Type } from './Type';
import { ProductType } from '../../../types';

type DataParams = {
    value: string;
};

export const SearchProduct = () => {
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
                                                <img
                                                    src={'http://localhost:3000/' + product.imageGallery.img_src}
                                                    alt=""
                                                    style={{
                                                        display: 'block',
                                                        width: '100%',
                                                        height: '100%',
                                                        position: 'absolute',
                                                        objectFit: 'cover',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                    }}
                                                />
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

                                                <h3 className="name">
                                                    <Link to={`/product-detail/${product.id}`}>{product.pro_name}</Link>
                                                </h3>
                                                <Color proId={product.color_id}></Color>
                                                <h3 style={{ textTransform: 'capitalize' }} className="price">
                                                    {product.priceModel.price.toLocaleString(undefined)} VNĐ
                                                </h3>
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
