import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import RelatedProductImage from '../../../pages/Shop/ProductDetail/RelatedProductImage';
import ProductColor from '../../../pages/Shop/ProductDetail/ProductColor';
import ProductPrice from '../../../pages/Shop/Product/Price';

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
                                <RelatedProductImage proId={item['id']} />
                            </a>
                        </div>
                        <div className="caption">
                            <h3 className="name" style={{ textTransform: 'capitalize' }}>
                                {item['pro_name']}
                            </h3>
                            <ProductColor id={item['color_id']} />
                            <ProductPrice proId={item['id']} />
                        </div>
                    </div>
                );
            })}
        </Slider>
    );
}
