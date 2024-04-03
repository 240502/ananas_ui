


import SlickSlideProductDetail from '../../../components/Layout/SlickSlide/SlickSlideProductDetail';
import SlickSlideProductRef from '../../../components/Layout/SlickSlide/SlickSlideProductRef';
import { toggleInfo } from '../../../utils/product-detail';
import SlickSlideProductViewed from '../../../components/Layout/SlickSlide/SlickSlideProductViewed';
import '../../../assets/css/Shop/product_detail.css';
function ProductDetail() {
    return (
        <main>
            <div className="container product-detail">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 hidden-xs hidden-sm">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="/product">Home</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="#">Library</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Data
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                        <div className="wrapper-slide">
                            <div className="prd-detail-main-img">
                                <img
                                    src="https://ananas.vn/wp-content/uploads/Pro_AV00207_1.jpg"
                                    className="main-img"
                                />
                            </div>
                            <div className="prd-detail-slide">
                                <SlickSlideProductDetail />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 prd-detail-right">
                        <h4 className="pro-name">Vintas Public 2000s - Low Top - Insignia Blue</h4>
                        <div className="detail">
                            <span className="pull-left col">
                                Mã sản phẩm:<strong> AV00207</strong>
                            </span>
                            <span className="pull-right col">
                                Tình trạng: <strong>New Arrival</strong>
                            </span>
                        </div>
                        <div className="detail">
                            <span className="saleprice">620.000 VND</span>
                        </div>
                        <div className="divider" />
                        <div className="color">
                            <ul>
                                <li>
                                    <label htmlFor="">
                                        <span className="bg-color" style={{ backgroundColor: 'red' }} />
                                        <input type="checkbox" name="cbColor" hidden />
                                    </label>
                                    <label htmlFor="">
                                        <span className="bg-color" style={{ backgroundColor: 'red' }} />
                                        <input type="checkbox" name="cbColor" hidden />
                                    </label>
                                    <label htmlFor="">
                                        <span className="bg-color" style={{ backgroundColor: 'red' }} />
                                        <input type="checkbox" name="cbColor" hidden />
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className="divider" />
                        <div className="row">
                            <div className="col">
                                <h5>size</h5>
                                <select name="" id="" className=" form-select selectpicker bs-select-hidden">
                                    <option>35</option>
                                    <option>35</option>
                                    <option>35</option>
                                </select>
                            </div>
                            <div className="col">
                                <h5>Số lượng</h5>
                                <select name="" id="" className=" form-select selectpicker bs-select-hidden">
                                    <option>35</option>
                                    <option>35</option>
                                    <option>35</option>
                                </select>
                            </div>
                        </div>
                        <div className="row group-btn1">
                            <button type="button" className="  btn btn-addcart ">
                                Thêm vào giỏ hàng
                            </button>
                            <button type="button" className=" btn btn-like">
                                <i className="fa-regular fa-heart" style={{ color: '#f15e2c', fontSize: 24 }} />
                            </button>
                        </div>
                        <div className="row group-btn2">
                            <button className="btn btn-payment">Thanh toán</button>
                        </div>
                        <div className="panel-group">
                            <div className="panel open">
                                <div className="panel-heading">
                                    <h3 className="panel-title" onClick={() => toggleInfo()}>
                                        Thông tin sản phẩm
                                        <i className="fa-solid fa-angle-down" />
                                    </h3>
                                </div>
                                <div className="divider" />
                                <div className="panel-body">
                                    <h6 className="gender">
                                        Gender: <span>Unisex</span>
                                    </h6>
                                    <h6 className="size-run">
                                        Size run: <span>35 - 46</span>
                                    </h6>
                                    <h6 className="upper">
                                        Upper: <span>Canvas</span>
                                    </h6>
                                    <h6 className="outsole">
                                        Outsole: <span>Rubber</span>
                                    </h6>
                                    <div className="size-table">
                                        <img src="img/Ananas_SizeChart.jpg" />
                                    </div>
                                    <div className="divider" />
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3 className="panel-title" onClick={() => toggleInfo()}>
                                        Quy định đổi sản phẩm
                                        <i className="fa-solid fa-angle-down" />
                                    </h3>
                                </div>
                                <div className="divider" />
                                <div className="panel-body">
                                    <ul>
                                        <li>Chỉ đổi hàng 1 lần duy nhất, mong bạn cân nhắc kĩ trước khi quyết định.</li>
                                        <li>
                                            Thời hạn đổi sản phẩm khi mua trực tiếp tại cửa hàng là 07 ngày, kể từ ngày
                                            mua. Đổi sản phẩm khi mua online là 14 ngày, kể từ ngày nhận hàng.
                                        </li>
                                        <li>
                                            Sản phẩm đổi phải kèm hóa đơn. Bắt buộc phải còn nguyên tem, hộp, nhãn mác.
                                        </li>
                                        <li>
                                            Sản phẩm đổi không có dấu hiệu đã qua sử dụng, không giặt tẩy, bám bẩn, biến
                                            dạng.
                                        </li>
                                        <li>
                                            Ananas chỉ ưu tiên hỗ trợ đổi size. Trong trường hợp sản phẩm hết size cần
                                            đổi, bạn có thể đổi sang 01 sản phẩm khác:
                                            <br />
                                            - Nếu sản phẩm muốn đổi ngang giá trị hoặc có giá trị cao hơn, bạn sẽ cần bù
                                            khoảng chênh lệch tại thời điểm đổi (nếu có).
                                            <br />- Nếu bạn mong muốn đổi sản phẩm có giá trị thấp hơn, chúng tôi sẽ
                                            không hoàn lại tiền.
                                        </li>
                                        <li>
                                            Trong trường hợp sản phẩm - size bạn muốn đổi không còn hàng trong hệ thống.
                                            Vui lòng chọn sản phẩm khác.
                                        </li>
                                        <li>
                                            Không hoàn trả bằng tiền mặt dù bất cứ trong trường hợp nào. Mong bạn thông
                                            cảm.
                                        </li>
                                    </ul>
                                    <div className="divider" />
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3 className="panel-title" onClick={() => toggleInfo()}>
                                        Bảo hành thế nào?
                                        <i className="fa-solid fa-angle-down" />
                                    </h3>
                                </div>
                                <div className="divider" />
                                <div className="panel-body">
                                    <p>
                                        Mỗi đôi giày Ananas trước khi xuất xưởng đều trải qua nhiều khâu kiểm tra. Tuy
                                        vậy, trong quá trình sử dụng, nếu nhận thấy các lỗi: gãy đế, hở đế, đứt chỉ
                                        may,...trong thời gian 6 tháng từ ngày mua hàng, mong bạn sớm gửi sản phẩm về
                                        Ananas nhằm giúp chúng tôi có cơ hội phục vụ bạn tốt hơn. Vui lòng gửi sản phẩm
                                        về bất kỳ cửa hàng Ananas nào, hoặc gửi đến trung tâm bảo hành Ananas ngay trong
                                        trung tâm TP.HCM trong giờ hành chính:
                                    </p>
                                    <p>
                                        Địa chỉ: 5C Tân Cảng, P.25, Q.Bình Thạnh , TP. Hồ Chí Minh.
                                        <br />
                                        Hotline: 028 2211 0067
                                    </p>
                                    <div className="divider" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider" />
                <div className="row  related-product">
                    <div className="container">
                        <h3 className="heading ">Sản phẩm liên quan</h3>
                        <div className="pro-list">
                            <SlickSlideProductRef />
                        </div>
                    </div>
                </div>
                <div className="divider" />
                <div className="row  product-viewed">
                    <div className="container">
                        <h3 className="heading ">Sản phẩm đã xem</h3>
                        <div className="pro-list">
                            <SlickSlideProductViewed />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetail;