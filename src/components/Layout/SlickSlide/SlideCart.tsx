import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
export default function CartSlider() {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        cssEase: 'ease-in-out',
        arrow: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <Slider {...settings}>
            <div className="media slide-item">
                <div className="media-left">
                    <a href="#">
                        <img src="https://ananas.vn/wp-content/uploads/Pro_ATB001_1-500x500.jpeg" />
                    </a>
                </div>
                <div className="media-body">
                    <h4 className="media-heading">
                        <a href="#">Tote Bag - Go Skate</a>
                    </h4>
                    <h4 className="media-heading">Jet Black</h4>
                    <h5 className="price">220.000 VND</h5>
                    <h5 className="button">
                        <button className="btn btn-cart btn-add-product-related">Thêm</button>
                    </h5>
                </div>
                <div className="clear" />
            </div>
            <div className="media slide-item">
                <div className="media-left">
                    <a href="#">
                        <img src="https://ananas.vn/wp-content/uploads/Pro_ATB001_1-500x500.jpeg" />
                    </a>
                </div>
                <div className="media-body">
                    <h4 className="media-heading">
                        <a href="#">Tote Bag - Go Skate</a>
                    </h4>
                    <h4 className="media-heading">Jet Black</h4>
                    <h5 className="price">220.000 VND</h5>
                    <h5 className="button">
                        <button className="btn btn-cart btn-add-product-related">Thêm</button>
                    </h5>
                </div>
                <div className="clear" />
            </div>
            <div className="media slide-item">
                <div className="media-left">
                    <a href="#">
                        <img src="https://ananas.vn/wp-content/uploads/Pro_ATB001_1-500x500.jpeg" />
                    </a>
                </div>
                <div className="media-body">
                    <h4 className="media-heading">
                        <a href="#">Tote Bag - Go Skate</a>
                    </h4>
                    <h4 className="media-heading">Jet Black</h4>
                    <h5 className="price">220.000 VND</h5>
                    <h5 className="button">
                        <button className="btn btn-cart btn-add-product-related">Thêm</button>
                    </h5>
                </div>
                <div className="clear" />
            </div>
        </Slider>
    );
}
