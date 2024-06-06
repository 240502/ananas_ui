import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { RevenueStatistics } from '../../../services/order.services';
import { callback } from 'chart.js/dist/helpers/helpers.core';
ChartJS.register(CategoryScale, BarElement, LinearScale, Title, Tooltip, Legend);

export const BarRevenue = ({ ...props }: any) => {
    const [listData, setData] = useState([{ totalPrice: 0, month: 0 }]);
    const [maxTotalOrder, setMaxTotalOrder] = useState(0);
    const [lables, setLables] = useState([]);
    useEffect(() => {
        async function loadData() {
            try {
                let lables: any = [];

                let data: any = {};
                if (props.quarter === 'quý 1') {
                    data = {
                        fr_month: 1,
                        to_month: 3,
                    };
                    for (var i = 1; i <= 3; i++) {
                        lables.push(i);
                    }
                }
                if (props.quarter === 'quý 2') {
                    data = {
                        fr_month: 4,
                        to_month: 6,
                    };
                    for (var i = 4; i <= 6; i++) {
                        lables.push(i);
                    }
                }
                if (props.quarter === 'quý 3') {
                    data = {
                        fr_month: 7,
                        to_month: 9,
                    };
                    let lables: any = [];
                    for (var i = 7; i <= 9; i++) {
                        lables.push(i);
                    }
                }
                if (props.quarter === 'quý 4') {
                    data = {
                        fr_month: 10,
                        to_month: 12,
                    };
                    for (var i = 10; i <= 12; i++) {
                        lables.push(i);
                    }
                }
                const res = await RevenueStatistics(data);
                if (res?.data.length > 0) {
                    setData(res?.data);
                    getMaxTotal(res?.data);
                    setLables(lables);
                } else {
                    setData([]);
                }
            } catch (err) {
                console.log(err);
            }
        }
        loadData();
    }, [props.quarter]);
    const getMaxTotal = (res: any) => {
        let max = res[0].totalPrice;
        for (let i = 0; i < res.length; i++) {
            if (max < res[i].totalPrice) max = res[i].totalPrice;
        }
        setMaxTotalOrder(max);
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: maxTotalOrder + 1000000,
                stepSize: 1,
                callback: function (value: any) {
                    return `${value} +VND`;
                },
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };
    const data = {
        labels: lables,
        datasets: [
            {
                label: 'Doanh thu',
                data: listData.length > 0 && listData.map((data: any) => data.totalPrice),
                borderColor: 'rgb(75,192,192)',
            },
        ],
    };

    return listData.length > 0 ? <Bar options={options} data={data} /> : <div>Chưa có dữ liệu</div>;
};
