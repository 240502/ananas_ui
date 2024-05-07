import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarRevenue } from './BarRevenue';

export const Revenue = () => {
    const [quarter, setQuarter] = useState('');
    return (
        <>
            <div className="text-start container">
                <select
                    className="form-control"
                    style={{ width: '200px' }}
                    onChange={(e) => {
                        setQuarter(e.target.value);
                    }}
                >
                    <option value="0">Chọn quý</option>
                    <option value="quý 1">Quý 1</option>
                    <option value="quý 2">Quý 2</option>
                    <option value="quý 3">Quý 3</option>
                    <option value="quý 4">Quý 4</option>
                </select>
            </div>
            <div className="card">
                <div className="card-header">
                    <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                        Doanh thu quý {quarter != '0' ? quarter : ''}
                    </h3>
                </div>

                <div className="card-body">
                    <BarRevenue quarter={quarter} />
                </div>
            </div>
        </>
    );
};
