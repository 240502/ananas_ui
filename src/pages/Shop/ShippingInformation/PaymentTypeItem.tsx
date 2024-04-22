import React from 'react';
type PaymentType = {
    id: number;
    paymentType_name: string;
    price: number;
    thumbnail: string;
};
export const PaymentTypeItem = ({ paymentTypes, setPaymentTypeId }: any) => {
    return (
        <>
            {paymentTypes.map((paymentType: PaymentType) => {
                return (
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group" key={paymentType.id}>
                        <input
                            type="radio"
                            name="paymentType"
                            id="paymentType-1"
                            className="form-check-input"
                            value={paymentType.id}
                            onChange={(e) => {
                                if (e.target.checked == true) setPaymentTypeId(Number(e.target.value));
                            }}
                        />
                        <label htmlFor="paymentType-1">
                            {paymentType.paymentType_name}
                            <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_cham_hoi.svg" />
                            <img src={`http://localhost:3000/${paymentType.thumbnail}`} />
                        </label>
                    </div>
                );
            })}
        </>
    );
};
