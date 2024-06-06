import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { CountOrderYear } from '../../../services/order.services';
ChartJS.register(CategoryScale, BarElement, LinearScale, Title, Tooltip, Legend);

export const BarChart = () => {
    const [listData, setData] = useState([{ totalOrder: 0, month: 0 }]);
    const [maxTotalOrder, setMaxTotalOrder] = useState(0);
    useEffect(() => {
        async function loadData() {
            try {
                const res = await CountOrderYear();
                getMaxTotal(res);
                setData(res);
            } catch (err) {
                console.log(err);
            }
        }
        loadData();
    }, []);
    const getMaxTotal = (res: any) => {
        let max = res[0].totalOrder;
        for (let i = 0; i < res.length; i++) {
            if (max < res[i].totalOrder) max = res[i].totalOrder;
        }
        setMaxTotalOrder(max);
    };
    const date = new Date();
    let labels: any = [];
    for (var i = 1; i <= date.getMonth() + 1; i++) {
        labels.push(i);
    }
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: maxTotalOrder + 5,
                stepSize: 1,
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text:
                    date.getMonth() + 1 == 1
                        ? 'Biểu đố số lượng đơn hàng tháng 1'
                        : 'Biểu đồ số lượng đơn hàng từ tháng 1 tới tháng ' + (date.getMonth() + 1),
                fontSize: 24,
            },
        },
    };
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Order',
                data: listData.map((data) => data.totalOrder),
                borderColor: 'rgb(75,192,192)',
            },
        ],
    };
    return <Bar options={options} data={data} />;
};
