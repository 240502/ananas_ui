import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import ProductColor from '../../../pages/Shop/ProductDetail/ProductColor';
import { hostServerAdmin } from '../../../constant/api';

export default function SlickSlideProductRef({ data }: any) {
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
            {data.map((item: any) => {
                return (
                    <div className="thumbnail">
                        <div className="cont-item">
                            <a href="#">
                                <img
                                    className="main-img"
                                    src={
                                        item.imageGallery.img_src.includes('uploads')
                                            ? hostServerAdmin + item.imageGallery.img_src
                                            : 'http://localhost:3000/' + item.imageGallery.img_src
                                    }
                                />
                            </a>
                        </div>
                        <div className="caption">
                            <h3 className="name" style={{ textTransform: 'capitalize' }}>
                                {item['pro_name']}
                            </h3>
                            <ProductColor id={item.color_id} />
                            <h3 style={{ textTransform: 'capitalize' }} className="price">
                                {item.priceModel.price.toLocaleString(undefined)} VNĐ
                            </h3>
                        </div>
                    </div>
                );
            })}
        </Slider>
    );
}
