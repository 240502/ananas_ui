import { useEffect, useState } from 'react';
import '../../../assets/css/Admin/dashboard.css';
import '../../../assets/css/Admin/main_content.css';
import { getTotalOrderToday } from '../../../services/order.services';
import { getTotalUser } from '../../../services/user.services';
import { BarChart } from './BarChart';
import { getTotalView } from '../../../services/productviews.services';
import { Top5BestSale } from './Top5BestSale';
import { Top5BestView } from './Top5BestView';
function Dashboard() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalUser, setTotalUser] = useState(0);
    const [totalView, setTotalView] = useState(0);

    useEffect(() => {
        async function GetTotalView() {
            try {
                const res = await getTotalView();
                setTotalView(res);
            } catch (err) {
                console.log(err);
            }
        }

        async function getTotalOrder() {
            try {
                const res = await getTotalOrderToday();
                setTotalOrder(res['totalOrder']);
                setTotalPrice(res['totalPrice']);
            } catch (err) {
                console.log(err);
            }
        }
        async function GetTotalUser() {
            try {
                const res = await getTotalUser();
                setTotalUser(res);
            } catch (err) {
                console.log(err);
            }
        }
        GetTotalView();
        GetTotalUser();
        getTotalOrder();
    }, []);

    return (
        <>
            <div className="heading">
                <h3>Dashboard</h3>
                <p>Welcome to your dashboard</p>
            </div>
            <div className=" group-box">
                <div className=" box-item">
                    <h6 className="box-title">
                        <span>
                            <p>Tổng số người dùng</p>
                            <span className="data total-user">{totalUser}</span>
                        </span>
                        <span className="box-icon">
                            <i className="fa-solid fa-users"></i>
                        </span>
                    </h6>
                </div>
                <div className=" box-item">
                    <h6 className="box-title">
                        <span>
                            <p> Lượt xem sản phẩm trong ngày</p>
                            <span className="data total-view">{totalView}</span>
                        </span>
                        <span className="box-icon">
                            <i className="fa-solid fa-shoe-prints"></i>
                        </span>
                    </h6>
                </div>
                <div className=" box-item">
                    <h6 className="box-title">
                        <span>
                            <p>Đơn hàng trong ngày</p>
                            <span className="data total-order">{totalOrder}</span>
                        </span>
                        <span className="box-icon">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </span>
                    </h6>
                </div>
                <div className=" box-item">
                    <h6 className="box-title">
                        <span>
                            <p>Tổng doanh thu ngày</p>
                            <span className="data total-money">{totalPrice.toLocaleString(undefined)} VND</span>
                        </span>
                        <span className="box-icon">
                            <i className="fa-solid fa-money-bill"></i>
                        </span>
                    </h6>
                </div>
            </div>
            <div className="card block-line-chart" style={{ marginTop: '50px' }}>
                <div className="card-body">
                    <BarChart />
                </div>
            </div>
            <Top5BestSale />
            <Top5BestView />
        </>
    );
}
export default Dashboard;
