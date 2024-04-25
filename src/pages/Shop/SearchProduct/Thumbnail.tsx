import React, { useEffect, useState } from 'react';
import { getImageFeature } from '../../../services/image_product.services';
export const Thumbnail = ({ proId }: any) => {
    const [img_src, setUrl] = useState('');
    useEffect(() => {
        async function getProductDetail(proId: any) {
            let image = await getImageFeature(proId);
            setUrl(image.img_src);
        }
        getProductDetail(proId);
    }, [proId]);
    return (
        <img
            src={'http://localhost:3000/' + img_src}
            alt=""
            style={{
                display: 'block',
                width: '100%',
                height: '100%',
                position: 'absolute',
                objectFit: 'cover',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        />
    );
};
