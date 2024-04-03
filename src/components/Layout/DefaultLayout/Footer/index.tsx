import React from 'react';
import '../../../../assets/css/Shop/footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="row">
                    <div className="col-md-3 sec-search">
                        <div className="row center">
                            <img src="img/Store.svg" />
                        </div>
                        <div className="row">
                            <button type="button" className="btn btn-search-shop">
                                Tìm cửa hàng
                            </button>
                        </div>
                    </div>
                    <div className="col-md-9 sec-cont">
                        <div className="row sec-cont-menu">
                            <div className="col-md-3">
                                <a href="#">
                                    <h4>Sản phẩm</h4>
                                </a>
                                <ul>
                                    <li className="text-left">
                                        <a href="#">Giày Nam</a>
                                    </li>
                                    <li>
                                        <a href="#">Giày Nữ</a>
                                    </li>
                                    <li>
                                        <a href="#">Thời trang &amp; Phụ kiện</a>
                                    </li>
                                    <li>
                                        <a href="#">Sale-off</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <a href="#">
                                    <h4>Về công ty</h4>
                                </a>
                                <ul>
                                    <li>
                                        <a href="#">Dưa tuyển dụng</a>
                                    </li>
                                    <li>
                                        <a href="#">Liên hệ nhượng quyền</a>
                                    </li>
                                    <li>
                                        <a href="#">Về ananas</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <a href="#">
                                    <h4>Hỗ trợ</h4>
                                </a>
                                <ul>
                                    <li>
                                        <a href="#">FAQs</a>
                                    </li>
                                    <li>
                                        <a href="#">Bảo mật thông tin</a>
                                    </li>
                                    <li>
                                        <a href="#">Chính sách chung</a>
                                    </li>
                                    <li>
                                        <a href="#">Tra cứu đơn hàng</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <a href="#">
                                    <h4>Liên hệ</h4>
                                </a>
                                <ul>
                                    <li>
                                        <a href="#">Email</a>
                                    </li>
                                    <li>
                                        <a href="#">Hotline</a>
                                    </li>
                                    <li>
                                        <a href="#">0963 429 749</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <h4>ANANAS SOCIAL</h4>
                                <a href="#" style={{ marginRight: 3 }}>
                                    {' '}
                                    <img src="img/icon_facebook.svg" />
                                </a>
                                <a href="#" style={{ marginRight: 3 }}>
                                    {' '}
                                    <img src="img/icon_instagram.svg" />
                                </a>
                                <a href="#" style={{ marginRight: 3 }}>
                                    {' '}
                                    <img src="img/icon_youtube.svg" />
                                </a>
                            </div>
                            <div className="col-md-3">
                                <h4>ĐĂNG KÝ NHẬN EMAIL</h4>
                                <div className="form-group">
                                    <input type="text" className="form-control input-email" id="email" />
                                    <button type="button" className=" btn-register">
                                        <i className="fa-solid fa-arrow-right" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6 logo-footer">
                                <a href="#">
                                    <img src="img/Logo_Ananas_Footer.svg" />
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 icon-bct">
                                <a href="#">
                                    {' '}
                                    <img src="img/icon_bocongthuong.png" />
                                </a>
                            </div>
                            <div className="col-md-9 copyright">Copyright © 2022 Ananas. All rights reserved.</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export  default Footer;