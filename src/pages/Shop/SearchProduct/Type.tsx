import React, { useEffect, useState } from 'react';
import { getProductStatus } from '../../../services/product.servies';

export const Type = ({ id }: any) => {
    const [statusName, setStatus] = useState('');
    useEffect(() => {
        async function getProductStatusById(id: any) {
            const status = await getProductStatus(id);
            setStatus(status.status_name);
        }
        getProductStatusById(id);
    }, [id]);

    return <h3 className="type"> {statusName}</h3>;
};
