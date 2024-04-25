import React, { memo, useEffect, useState } from 'react';
import { getProductPrice } from '../../../services/price.services';
const Price = ({ proId }: any) => {
    const [price, setPrice] = useState(0);
    var value = price.toLocaleString(undefined);
    useEffect(() => {
        async function getProductDetail(proId: any) {
            let price = await getProductPrice(proId);
            setPrice(price.price);
        }
        getProductDetail(proId);
    }, [proId]);
    return (
        <h3 style={{ textTransform: 'capitalize' }} className="price">
            {value} VNĐ
        </h3>
    );
};
export default memo(Price);
