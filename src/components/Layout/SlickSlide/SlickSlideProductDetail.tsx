import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

export default function SlickSlideProductDetail() {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 1500,
        cssEase: 'ease-in-out',
        arrow: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <Slider {...settings}>
            <div className="thumbnail">
                <div className="cont-item">
                    <img src="https://ananas.vn/wp-content/uploads/Pro_AV00207_1.jpg" />
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <img src="https://ananas.vn/wp-content/uploads/Pro_AV00207_2.jpg" />
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <img src="https://ananas.vn/wp-content/uploads/Pro_AV00207_3.jpg" />
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <img src="https://ananas.vn/wp-content/uploads/Pro_AV00207_4.jpg" />
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <img src="https://ananas.vn/wp-content/uploads/Pro_AV00207_5.jpg" />
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <img src="https://ananas.vn/wp-content/uploads/Pro_AV00207_6.jpg" />
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <img src="https://ananas.vn/wp-content/uploads/Pro_AV00207_7.jpg" />
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <img src="https://ananas.vn/wp-content/uploads/Pro_AV00207_8.jpg" />
                </div>
            </div>
        </Slider>
    );
}
