import React from 'react';
import '../../../assets/css/Shop/your_wishlist.css';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { FavoriteProductValue } from '../../../store/favorit_products.atom';
import FavoriteProduct from './FavoriteProduct';

export const YourWishList = () => {
    const favoriteProducts = useRecoilValue(FavoriteProductValue);

    return (
        <div className="main-cart container">
            <div className="row wishlist">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 title">Danh mục yêu thích của bạn</div>
                <div
                    className="col-xs-12 col-sm-12 col-md-12 col-lg-12 infor-bar"
                    style={{ display: `${favoriteProducts.total === 0 ? 'none' : 'block'}` }}
                >
                    <span className="number-product">{favoriteProducts.total}</span>
                    sản phẩm
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 item-divider"></div>
                {favoriteProducts.total > 0 && (
                    <>
                        <FavoriteProduct /> <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 item-divider"></div>
                        <div className=" group-btn-button">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6  ">
                                <button type="button" className=" btn">
                                    xóa hết
                                </button>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <button type="button" className="btn">
                                    Tiếp tục mua hàng
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {favoriteProducts.total === 0 && (
                    <>
                        <div style={{ marginTop: '55px', textAlign: 'center' }}>Bạn đang không thích sản phẩm nào!</div>
                        <div
                            className=" group-btn-button"
                            style={{ justifyContent: 'center', marginTop: '60px', marginBottom: '100px' }}
                        >
                            <button type="button" className="btn">
                                Tiếp tục mua hàng
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
