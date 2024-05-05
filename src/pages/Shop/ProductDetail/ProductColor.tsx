import React, { memo, useEffect, useState } from 'react';
import { getColor } from '../../../services/color.services';
const ProductColor = ({ id }: any) => {
    const [colorName, setColorName] = useState('');
    useEffect(() => {
        async function getColorById(id: any) {
            if (id !== 0) {
                try {
                    let res = await getColor(id);
                    setColorName(res.color_name);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        getColorById(id);
    }, [id]);
    return (
        <h3 className="color" style={{ textTransform: 'capitalize' }}>
            {colorName}
        </h3>
    );
};
export default memo(ProductColor);
