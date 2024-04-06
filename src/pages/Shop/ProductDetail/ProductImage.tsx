import React, { memo, useState, useEffect } from 'react';
import { getImageFeature } from '../../../services/product.servies';

const ProductImage = ({ proId }: any) => {
    const [img_src, setUrl] = useState('');
    useEffect(() => {
        async function getProductDetail(proId: any) {
            let image = await getImageFeature(proId);
            setUrl(image.img_src);
        }
        getProductDetail(proId);
    }, [proId]);

    return <img  className="main-img" src={img_src} />;
};
export default memo(ProductImage);
