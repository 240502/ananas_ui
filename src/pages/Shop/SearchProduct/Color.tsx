import React, { useEffect, useState } from 'react';
import { getColor } from '../../../services/color.services';

export const Color = ({ proId }: any) => {
    const [colorName, setColorName] = useState('');
    useEffect(() => {
        async function getColorById(id: any) {
            let res = await getColor(id);
            setColorName(res['color_name']);
        }
        getColorById(proId);
    }, [proId]);
    return <span className="color">{colorName}</span>;
};
