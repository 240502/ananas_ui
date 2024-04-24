import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { optionSearch, orderId } from '../../../store/order.atom';
import { useNavigate } from 'react-router-dom';

export const SearchOrder = () => {
    const navigate = useNavigate();
    const [id, setId] = useRecoilState(orderId);
    const [option, setOption] = useRecoilState(optionSearch);
    const handleSearchOrder = () => {
        if (id === 0 || option === '') {
            alert('Vui lòng nhập đầy đủ thông tin yêu cầu !');
        } else {
            navigate('/tracking-order');
        }
    };
    return (
        <>
            <div
                className="search-order container"
                style={{ maxWidth: '800px', marginTop: '30px', marginBottom: '80px' }}
            >
                <div className="row">
                    <div
                        className="col-xs-12 col-sm-12 col-md-12 col-lg-12 title-1"
                        style={{
                            color: '#000',
                            fontSize: '30px',
                            margin: '10px 0px 40px 0px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        TRA CỨU ĐƠN HÀNG
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">
                        <input
                            type="text"
                            className="form-control text-uppercase"
                            placeholder="MÃ ĐƠN HÀNG"
                            id="order_id"
                            onChange={(e) => {
                                setId(Number(e.target.value));
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email / Số điện thoại"
                            id="input"
                            onChange={(e) => setOption(e.target.value)}
                        />
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 title-3">
                        <button
                            className="btn btn-search-order"
                            type="button"
                            style={{
                                backgroundColor: '#f15e2c',
                                borderRadius: 0,
                                height: '40px',
                                width: '240px',
                                border: 'none',
                                color: '#fff',
                                fontSize: '18px',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }}
                            onClick={handleSearchOrder}
                        >
                            Tra cứu đơn hàng
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
