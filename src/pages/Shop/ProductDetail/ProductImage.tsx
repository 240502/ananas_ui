import React, { memo, useState, useEffect } from 'react';
import { getImageFeature } from '../../../services/product.servies';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from '../../../components/Layout/SlickSlide/NextArrow';
import PrevArrow from '../../../components/Layout/SlickSlide/PrevArrow';
const ProductImage = ({ proId, setImage, image }: any) => {
    const [img_src, setUrl] = useState('');
    useEffect(() => {
        async function getProductDetail(proId: any) {
            let image = await getImageFeature(proId);
            setUrl(image.img_src);
            setImage(image);
        }
        getProductDetail(proId);
    }, [proId]);

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
        <div className="wrapper-slide">
            <div className="prd-detail-main-img">
                <img className="main-img" src={'http://localhost:3000/' + img_src} />
            </div>
            <div className="prd-detail-slide">
                {/* <Slider {...settings}>
                    <div className="thumbnail">
                        <div className="cont-item">
                            <img src={'/' + img_src} />
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="cont-item">
                            <img src={'/' + img_src} />
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="cont-item">
                            <img src={'/' + img_src} />
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="cont-item">
                            <img src={'/' + img_src} />
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="cont-item">
                            <img src={'/' + img_src} />
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="cont-item">
                            <img src={'/' + img_src} />
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="cont-item">
                            <img src={'/' + img_src} />
                        </div>
                    </div>
                </Slider> */}
            </div>
        </div>
    );
};
export default memo(ProductImage);
