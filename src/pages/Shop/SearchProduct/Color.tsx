import React, { useEffect, useState } from 'react';
import { getColor } from '../../../services/color.services';

export const Color = ({ proId }: any) => {
    const [colorName, setColorName] = useState('');
    useEffect(() => {
        async function getColorById(id: any) {
            try {
                let res = await getColor(id);
                setColorName(res['color_name']);
            } catch (err) {
                console.log(err);
            }
        }
        getColorById(proId);
    }, [proId]);
    return <span className="color">{colorName}</span>;
};
