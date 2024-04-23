import React, { useEffect, useState } from 'react';
import { getProductPrice } from '../../../services/product.servies';

export const Price = ({ proId }: any) => {
    const [price, setPrice] = useState(0);
    useEffect(() => {
        async function getProductDetail(proId: any) {
            let price = await getProductPrice(proId);
            setPrice(price.price);
        }
        getProductDetail(proId);
    }, [proId]);
    return <h3 className="price">{price.toLocaleString(undefined)} VND</h3>;
};
