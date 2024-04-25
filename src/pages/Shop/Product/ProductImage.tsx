import React, { memo, useState, useEffect } from 'react';
import { getImageFeature } from '../../../services/image_product.services';
const ProductImage = ({ proId, gender }: any) => {
    const [img_src, setUrl] = useState('');
    useEffect(() => {
        async function getProductDetail(proId: any) {
            let image = await getImageFeature(proId);
            setUrl(image.img_src);
        }
        getProductDetail(proId);
    }, [proId]);

    return <img src={'http://localhost:3000/' + img_src} />;
};
export default memo(ProductImage);
