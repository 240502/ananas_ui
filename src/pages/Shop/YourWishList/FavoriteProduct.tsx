import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { FavoriteProductState } from '../../../store/favorit_products.atom';
import { Link } from 'react-router-dom';
import { CartItemType, FavoriteProductType, ProductDetailType } from '../../../types';
import { hostServerAdmin } from '../../../constant/api';
import { addToCart } from '../../../utils/cart';
import { cartState } from '../../../store/cart.atom';
import { getListSizeByProId } from '../../../services/product_detail.services';
import { getStyleById } from '../../../services/style.services';
import { handleAddAndRemoveFavoriteProduct, handleRemoveFavoriteProduct } from '../../../utils/favorite_product';

const FavoriteProduct = () => {
    const favoriteProducts = useRecoilValue(FavoriteProductState);
    const [cart, setCarts] = useRecoilState(cartState);
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const setFavorite = useSetRecoilState(FavoriteProductState);
    async function getProDetail(product: FavoriteProductType, proId: number, size: number) {
        if (size > 0) {
            try {
                const pro: any = product.productDetails.find((item: ProductDetailType) => {
                    return item.product_id == proId && item.size == size;
                });
                renderListNumberPro(pro);
            } catch (error) {
                console.log(error);
            }
        } else {
            var rowProduct = document.querySelector(`.item-left[data-id="${product.id}"]`);
            var selectElement = rowProduct?.querySelector('select[name="select_number"]');
            var option: any = selectElement?.querySelectorAll('option:not(.initial)');
            option.forEach((item: any) => selectElement?.removeChild(item));
        }
    }

    function renderListNumberPro(productDetail: ProductDetailType) {
        if (productDetail.quantity > 1) {
            var rowProduct = document.querySelector(`.item-left[data-id="${productDetail.product_id}"]`);
            var selectElement = rowProduct?.querySelector('select[name="select_number"]');
            var option: any = selectElement?.querySelectorAll('option:not(.initial)');
            option.forEach((item: any) => selectElement?.removeChild(item));
            for (let index = 1; index <= productDetail.quantity; index++) {
                let option = document.createElement('option');
                option.innerHTML = `${index}`;
                option.setAttribute('value', `${index}`);
                selectElement?.appendChild(option);
            }
        } else {
            var rowProduct = document.querySelector(`.item-left[data-id="${productDetail.product_id}"]`);
            var selectElement = rowProduct?.querySelector('select[name="select_number"]');
            var option: any = selectElement?.querySelectorAll('option:not(.initial)');

            option.forEach((item: any) => selectElement?.removeChild(item));
        }
    }
    return (
        <div className="block-wish-list row ">
            {favoriteProducts.map((product: FavoriteProductType, index: number) => {
                if (index === favoriteProducts.length - 1) {
                    return (
                        <>
                            <div
                                className="col-xs-12 col-sm-8 col-md-8 col-lg-8 item-left"
                                data-id={product.id}
                                key={product.id}
                            >
                                <div className="media">
                                    <div className="media-left">
                                        <Link to={'/product-detail/' + product.id}>
                                            <img
                                                src={
                                                    product.imageGallery.img_src.includes('uploads')
                                                        ? hostServerAdmin + product.imageGallery.img_src
                                                        : 'http://localhost:3000/' + product.imageGallery.img_src
                                                }
                                            ></img>
                                        </Link>
                                    </div>
                                    <div className="media-body">
                                        <Link className="product_name" to={'/product-detail/' + product.id}>
                                            {product.pro_name} - Low Top
                                        </Link>
                                        <h5 className="price">
                                            <strong>Giá: </strong>
                                            {product.priceModel.price.toLocaleString(undefined)} VND
                                        </h5>
                                        <div className="row bottom">
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <h5>Size</h5>
                                                <select
                                                    className="form-control"
                                                    onChange={(e: any) => {
                                                        setSize(e.target.value);
                                                        getProDetail(product, product.id, Number(e.target.value));
                                                    }}
                                                >
                                                    <option value="0" className="initial">
                                                        Chọn size
                                                    </option>
                                                    {product.productDetails.map((detail: ProductDetailType) => {
                                                        return <option value={detail.size}>{detail.size}</option>;
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <h5>Số lượng</h5>

                                                <select
                                                    name="select_number"
                                                    className="form-control"
                                                    onChange={(e: any) => setQuantity(e.target.value)}
                                                >
                                                    <option value="0" className="initial">
                                                        Chọn số lượng
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 item-right">
                                <div className="price"> {product.priceModel.price.toLocaleString(undefined)} VND</div>
                                <div className="status">Còn hàng</div>
                                <div className="button">
                                    <button
                                        className="btn-add-to-cart btn"
                                        type="button"
                                        onClick={() => {
                                            const cartItem: CartItemType = {
                                                id: product.id,
                                                name: product.pro_name,
                                                styleName: product.style_name,
                                                colorName: product.color_name,
                                                price: product.priceModel.price,
                                                qty: Number(quantity),
                                                size: Number(size),
                                                thumbnail: product.imageGallery.img_src,
                                                colorId: product.color_id,
                                                styleId: product.style_id,
                                            };
                                            console.log(cartItem);
                                            addToCart(cartItem, cart, setCarts);
                                        }}
                                    >
                                        <img src="http://localhost:3000/img/cart_ana.png" alt="" />
                                    </button>
                                    <button
                                        className="btn-delete btn"
                                        type="button"
                                        onClick={() =>
                                            handleRemoveFavoriteProduct(product.id, favoriteProducts, setFavorite)
                                        }
                                    >
                                        <i className="fa-solid fa-trash-can" />
                                    </button>
                                </div>
                            </div>
                        </>
                    );
                } else {
                    return (
                        <>
                            <div
                                className="col-xs-12 col-sm-8 col-md-8 col-lg-8 item-left"
                                data-id={product.id}
                                key={product.id}
                            >
                                <div className="media">
                                    <div className="media-left">
                                        <Link to={'/product-detail/' + product.id}>
                                            <img
                                                src={
                                                    product.imageGallery.img_src.includes('uploads')
                                                        ? hostServerAdmin + product.imageGallery.img_src
                                                        : 'http://localhost:3000/' + product.imageGallery.img_src
                                                }
                                            ></img>
                                        </Link>
                                    </div>
                                    <div className="media-body">
                                        <Link className="product_name" to={'/product-detail/' + product.id}>
                                            {product.pro_name} - Low Top
                                        </Link>
                                        <h5 className="price">
                                            <strong>Giá: </strong>
                                            {product.priceModel.price.toLocaleString(undefined)} VND
                                        </h5>
                                        <div className="row bottom">
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <h5>Size</h5>
                                                <select
                                                    name=""
                                                    id=""
                                                    className="form-control"
                                                    onChange={(e: any) => {
                                                        setSize(e.target.value);
                                                        getProDetail(product, product.id, Number(e.target.value));
                                                    }}
                                                >
                                                    <option value="0" className="initial">
                                                        Chọn size
                                                    </option>
                                                    {product.productDetails.map((detail: ProductDetailType) => {
                                                        return <option value={detail.size}>{detail.size}</option>;
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <h5>Số lượng</h5>
                                                <select
                                                    name="select_number"
                                                    className="form-control"
                                                    onChange={(e: any) => setQuantity(e.target.value)}
                                                >
                                                    <option value="0" className="initial">
                                                        Chọn số lượng
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 item-right">
                                <div className="price"> {product.priceModel.price.toLocaleString(undefined)} VND</div>
                                <div className="status">Còn hàng</div>
                                <div className="button">
                                    <button
                                        className="btn-add-to-cart btn"
                                        type="button"
                                        onClick={() => {
                                            const cartItem: CartItemType = {
                                                id: product.id,
                                                name: product.pro_name,
                                                styleName: product.style_name,
                                                colorName: product.color_name,
                                                price: product.priceModel.price,
                                                qty: Number(quantity),
                                                size: Number(size),
                                                thumbnail: product.imageGallery.img_src,
                                                colorId: product.color_id,
                                                styleId: product.style_id,
                                            };
                                            console.log(cartItem);

                                            addToCart(cartItem, cart, setCarts);
                                        }}
                                    >
                                        <img src="http://localhost:3000/img/cart_ana.png" alt="" />
                                    </button>
                                    <button
                                        className="btn-delete btn"
                                        type="button"
                                        onClick={() =>
                                            handleRemoveFavoriteProduct(product.id, favoriteProducts, setFavorite)
                                        }
                                    >
                                        <i className="fa-solid fa-trash-can" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 product-divider"></div>
                        </>
                    );
                }
            })}
        </div>
    );
};

export default FavoriteProduct;
