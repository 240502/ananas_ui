import React from 'react';
import '../../../assets/css/Shop/your_wishlist.css';
import { Link } from 'react-router-dom';

export const YourWishList = () => {
    return (
        <div className="main-cart container">
            <div className="row wishlist">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 title">Danh mục yêu thích của bạn</div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 infor-bar">
                    <span className="number-product">1</span>
                    sản phẩm
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 item-divider"></div>
                <div className="block-wish-list row ">
                    <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8 item-left">
                        <div className="media">
                            <div className="media-left">
                                <Link to={''}>
                                    <img src="https://ananas.vn/wp-content/uploads/Pro_AV00207_1-500x500.jpg"></img>
                                </Link>
                            </div>
                            <div className="media-body">
                                <Link className="product_name" to={''}>
                                    Vintas Public 2000s - Low Top
                                </Link>
                                <h5 className="price">
                                    <strong>Giá: </strong>
                                    620.000 VND
                                </h5>
                                <div className="row bottom">
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <h5>Size</h5>
                                        <select name="" id="" className="form-control">
                                            <option value="1">10</option>
                                        </select>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <h5>Số lượng</h5>
                                        <select name="" id="" className="form-control">
                                            <option value="1">10</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 item-right">
                        <div className="price">620.000 VND</div>
                        <div className="status">Còn hàng</div>
                        <div className="button">
                            <button className="btn-add-to-cart btn" type="button">
                                <img src="http://localhost:3000/img/cart_ana.png" alt="" />
                            </button>
                            <button className="btn-delete btn" type="button">
                                <i className="fa-solid fa-trash-can" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 item-divider"></div>
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
            </div>
        </div>
    );
};
