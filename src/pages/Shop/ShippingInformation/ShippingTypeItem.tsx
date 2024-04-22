import React from 'react';
type ShippingType = {
    id: number;
    shippingType_name: string;
    price: number;
};
export const ShippingTypeItem = ({ shippingTypes, setShippingTypeId }: any) => {
    return (
        <>
            {shippingTypes.map((shippingType: ShippingType) => {
                return (
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 group-shipping-type" key={shippingType.id}>
                        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 form-group">
                            <input
                                type="radio"
                                id="shippingType-1"
                                name="shippingType"
                                className="form-check-input"
                                value={shippingType.id}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setShippingTypeId(Number(e.target.value));
                                    }
                                }}
                            />
                            <label htmlFor="shippingType-1">
                                {shippingType.shippingType_name}
                                <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_cham_hoi.svg" />
                            </label>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-group title-right normal-fee">
                            {shippingType.price.toLocaleString(undefined)} VND
                        </div>
                    </div>
                );
            })}
        </>
    );
};
