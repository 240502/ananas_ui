import React, { memo, useEffect, useState } from 'react';
import { getColor } from '../../../services/product.servies';

const ProductColor = ({ id }: any) => {
    const [colorName, setColorName] = useState('');
    useEffect(() => {
        async function getColorById(id: any) {
            let res = await getColor(id);
            setColorName(res.color_name);
        }
        getColorById(id);
    }, [id]);
    return <span className="color">{colorName}</span>;
};
export default memo(ProductColor);
