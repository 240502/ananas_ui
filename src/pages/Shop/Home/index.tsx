import SliderBannerHome from "../../../components/Layout/SlickSlide/SildeBannerHome";
import '../../../assets/css/Shop/slick-slide.css';
import '../../../assets/css/Shop/home.css';

function Home() {
    return (
        <main>
            <div className="home-banner">
                <div className="slide-banner">
                    <SliderBannerHome />
                </div>
            </div>
            <div className="home-collection container">
                <div className="row">
                    <div className="collection-item col-sm-5 col-md-6">
                        <div className="collection-img">
                            <a href="#">
                                <img src="img/home_collection_left.jpg" />
                            </a>
                        </div>
                        <div className="content-collection">
                            <h3 className="title">
                                <a href="#">All black in black</a>
                            </h3>
                            <p className="description">
                                Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát lên một vẻ huyền bí
                                không nhàm chán
                            </p>
                        </div>
                    </div>
                    <div className="collection-item col-sm-5 col-md-6">
                        <div className="collection-img">
                            <a href="#">
                                <img src="img/home_collection_left.jpg" />
                            </a>
                        </div>
                        <div className="content-collection">
                            <h3 className="title">
                                <a href="#">OUTLET SALE</a>
                            </h3>
                            <p className="description">
                                Danh mục những sản phẩm bán tại "giá tốt hơn" chỉ được bán kênh online - Online Only,
                                chúng đã từng làm mưa làm gió một thời gian và hiện đang rơi vào tình trạng bể size, bể
                                số.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-category-buy container">
                <div className="row">
                    <h3 className="title">Danh mục mua hàng</h3>
                </div>
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 item">
                        <div className="item-background">
                            <div className="black-background" />
                            <img src="img/home_catalogy_1.jpg" />
                        </div>
                        <div className="item-group">
                            <a href="#" className="title">
                                Giày nam
                            </a>
                            <a href="#" className="sub">
                                {' '}
                                New arrivals
                            </a>
                            <a href="#" className="sub">
                                {' '}
                                Best seller
                            </a>
                            <a href="#" className="sub">
                                {' '}
                                Sale-off
                            </a>
                        </div>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 item">
                        <div className="item-background">
                            <div className="black-background" />
                            <img src="img/home_category_2.jpg" />
                        </div>
                        <div className="item-group">
                            <a href="#" className="title">
                                Giày nữ
                            </a>
                            <a href="#" className="sub">
                                {' '}
                                New arrivals
                            </a>
                            <a href="#" className="sub">
                                {' '}
                                Best seller
                            </a>
                            <a href="#" className="sub">
                                {' '}
                                Sale-off
                            </a>
                        </div>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 item">
                        <div className="item-background">
                            <div className="black-background" />
                            <img src="img/home_catalogy_3.jpg" />
                        </div>
                        <div className="item-group">
                            <a href="#" className="title">
                                Giày nam
                            </a>
                            <a href="#" className="sub">
                                {' '}
                                New arrivals
                            </a>
                            <a href="#" className="sub">
                                {' '}
                                Best seller
                            </a>
                            <a href="#" className="sub">
                                {' '}
                                Sale-off
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-banner-2">
                <a href="#">
                    <img src="img/home_banner_2.jpg" />
                </a>
            </div>
            <div className="home-instagram container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 left">
                        <div className="row">
                            <h3 className="title">Instagram</h3>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 right">
                        <div className="row">
                            <h3 className="title">Tin tức &amp; bài viết</h3>
                        </div>
                        <div className="row news-list">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 post-item">
                                <a href="#">
                                    <img src="img/img_new_1.jpg" />
                                </a>
                                <h3 className="post-title">
                                    <a href="#">URBAS CORLURAY PACK</a>
                                </h3>
                                <h3 className="post-des">
                                    Urbas Corluray Pack đem đến lựa chọn “làm mới mình” với sự kết hợp 5 gam màu mang
                                    sắc thu; phù hợp với những người trẻ năng động, mong muốn thể hiện cá tính riêng
                                    biệt khó trùng lặp.
                                </h3>
                                <h3 className="post-detail">
                                    <a href="#">Đọc thêm</a>
                                </h3>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 post-item">
                                <a href="#">
                                    <img src="img/img_new_2.jpg" />
                                </a>
                                <h3 className="post-title">
                                    <a href="#">VINTAS SAIGON 1980s</a>
                                </h3>
                                <h3 className="post-des">
                                    Với bộ 5 sản phẩm, Vintas Saigon 1980s Pack đem đến một sự lựa chọn “cũ kỹ thú vị”
                                    cho những người trẻ sống giữa thời hiện đại nhưng lại yêu nét bình dị của Sài Gòn
                                    ngày xưa ...
                                </h3>
                                <h3 className="post-detail">
                                    <a href="#">Đọc thêm</a>
                                </h3>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 post-item">
                                <a href="#">
                                    <img src="img/img_new_3.jpg" />
                                </a>
                                <h3 className="post-title">
                                    <a href="#">SNEAKER FEST VIETNAM VÀ SỰ KẾT HỢP</a>
                                </h3>
                                <h3 className="post-des">
                                    Việc sử dụng dáng giày Vulcanized High Top của Ananas trong thiết kế và cảm hứng bắt
                                    nguồn từ linh vật Peeping - đại diện cho tinh thần xuyên suốt 6 năm qua Sneaker Fest
                                    Vietnam, chúng tôi tự tin đây sẽ là sản phẩm đáng mong chờ cho mọi “đầu giày” vào
                                    mùa hè năm nay...
                                </h3>
                                <h3 className="post-detail">
                                    <a href="#">Đọc thêm</a>
                                </h3>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 post-item">
                                <a href="#">
                                    <img src="img/img_new_4.jpg" />
                                </a>
                                <h3 className="post-title">
                                    <a href="#">"GIẢI PHẪU" GIÀY VULCANIZED</a>
                                </h3>
                                <h3 className="post-des">
                                    Trong phạm vi bài viết ngắn, hãy cùng nhau tìm hiểu cấu tạo giày Vulcanized Sneaker
                                    - loại sản phẩm mà Ananas đã chọn làm "cốt lõi" để theo đuổi trong suốt hành trình
                                    của mình...
                                </h3>
                                <h3 className="post-detail">
                                    <a href="#">Đọc thêm</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row text-center ">
                    <button type="button" className="btn btn-dark">
                        Muốn xem nữa
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Home;