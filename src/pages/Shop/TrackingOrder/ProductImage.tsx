import React, { useEffect, useState } from 'react';
import { getImageFeature } from '../../../services/image_product.services';
import { hostServerAdmin } from '../../../constant/api';

export const ProductImage = ({ proId }: any) => {
    const [image, setImage] = useState({ id: 0, img_src: '' });
    useEffect(() => {
        async function getProductImage(proId: any) {
            try {
                const data = await getImageFeature(proId);
                setImage(data);
            } catch (err) {
                console.log(err);
            }
        }
        getProductImage(proId);
    }, []);
    return (
        <a href="#">
            <img
                src={
                    image.img_src.includes('uploads')
                        ? hostServerAdmin + image.img_src
                        : 'http://localhost:3000/' + image.img_src
                }
                alt=""
            />
        </a>
    );
};
