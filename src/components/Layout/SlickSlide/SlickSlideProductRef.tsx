import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

export default function SlickSlideProductRef() {
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
                    <a href="#">
                        <img src="img/img_pro_demo.jpg" />
                    </a>
                </div>
                <div className="caption">
                    <h3 className="name">Nguyễn Văn Sang</h3>
                    <h3 className="color">Insignia Blue</h3>
                    <h3 className="price">620.000 VND</h3>
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <a href="#">
                        <img src="img/img_pro_demo.jpg" />
                    </a>
                </div>
                <div className="caption">
                    <h3 className="name">Nguyễn Văn Sang</h3>
                    <h3 className="color">Insignia Blue</h3>
                    <h3 className="price">620.000 VND</h3>
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <a href="#">
                        <img src="img/img_pro_demo.jpg" />
                    </a>
                </div>
                <div className="caption">
                    <h3 className="name">Nguyễn Văn Sang</h3>
                    <h3 className="color">Insignia Blue</h3>
                    <h3 className="price">620.000 VND</h3>
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <a href="#">
                        <img src="img/img_pro_demo.jpg" />
                    </a>
                </div>
                <div className="caption">
                    <h3 className="name">Nguyễn Văn Sang</h3>
                    <h3 className="color">Insignia Blue</h3>
                    <h3 className="price">620.000 VND</h3>
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <a href="#">
                        <img src="img/img_pro_demo.jpg" />
                    </a>
                </div>
                <div className="caption">
                    <h3 className="name">Nguyễn Văn Sang</h3>
                    <h3 className="color">Insignia Blue</h3>
                    <h3 className="price">620.000 VND</h3>
                </div>
            </div>
            <div className="thumbnail">
                <div className="cont-item">
                    <a href="#">
                        <img src="img/img_pro_demo.jpg" />
                    </a>
                </div>
                <div className="caption">
                    <h3 className="name">Nguyễn Văn Sang</h3>
                    <h3 className="color">Insignia Blue</h3>
                    <h3 className="price">620.000 VND</h3>
                </div>
            </div>
        </Slider>
    );
}
