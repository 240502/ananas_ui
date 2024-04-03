import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';



export default function SlideHotNews() {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1500,
        cssEase: 'ease-in-out',
        arrow: true,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow />,
    };
    return (
        <Slider {...settings}>
            <div className="cont-item">
                <a href="#">BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE</a>
            </div>
            <div className="cont-item">
                <a href="#">FREE SHIPPING VỚI HOÁ ĐƠN TỪ 900K !</a>
            </div>
            <div className="cont-item">
                <a href="#">HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH</a>
            </div>
            <div className="cont-item">
                <a href="#">BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN</a>
            </div>
        </Slider>
    );
}
