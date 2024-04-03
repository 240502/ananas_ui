import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function SliderBannerHome() {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 3000,
        cssEase: 'ease-in-out',
        arrows: false,
    };
    return (
        <Slider {...settings}>
            <div className="slide-item">
                <img src="img/slide_home_1.jpeg" />
            </div>
            <div className="slide-item">
                <img src="img/slide_home_2.jpeg" />
            </div>
        </Slider>
    );
}
