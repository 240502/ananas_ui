import React, { useEffect, useState } from 'react';
import { getProductStatus } from '../../../services/product_status.services';
export const Type = ({ id }: any) => {
    const [statusName, setStatus] = useState('');
    useEffect(() => {
        async function getProductStatusById(id: any) {
            const status = await getProductStatus(id);
            setStatus(status.status_name);
        }
        getProductStatusById(id);
    }, [id]);

    return (
        <>
            <h3 className="type"> {statusName}</h3>
            <h3
                className="divider"
                style={{
                    display: ` block`,
                    height: ` 1px`,
                    margin: ` 10px 0px`,
                    fontFamily: `GeometricExtraBold`,
                    fontWeight: `normal`,
                    color: ` #000`,
                    border: `#000 dashed 1px`,
                }}
            />
        </>
    );
};
