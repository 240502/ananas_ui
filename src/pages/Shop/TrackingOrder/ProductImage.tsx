import React, { useEffect, useState } from 'react';
import { getImageFeature } from '../../../services/image_product.services';

export const ProductImage = ({ proId }: any) => {
    const [image, setImage] = useState({ id: 0, img_src: '' });
    useEffect(() => {
        async function getProductImage(proId: any) {
            const data = await getImageFeature(proId);
            setImage(data);
        }
        getProductImage(proId);
    }, []);
    return (
        <a href="#">
            <img src={'http://localhost:3000/' + image.img_src} alt="" />
        </a>
    );
};
