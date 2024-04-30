import React, { memo, useEffect, useState } from 'react';
import { getColor } from '../../../services/color.services';
const ProductColor = ({ id }: any) => {
    const [colorName, setColorName] = useState('');
    useEffect(() => {
        async function getColorById(id: any) {
            try {
                let res = await getColor(id);
                setColorName(res.color_name);
            } catch (err) {
                console.log(err);
            }
        }
        getColorById(id);
    }, [id]);
    return <span className="color">{colorName}</span>;
};
export default memo(ProductColor);
