import { useEffect, useState } from 'react';
import '../../../assets/css/Admin/dashboard.css';
import '../../../assets/css/Admin/main_content.css';
import { getTotalOrderToday } from '../../../services/order.services';
import { getTotalUser } from '../../../services/user.services';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ProductStatisticsType, ProductType } from '../../../types';
import { hostServerAdmin } from '../../../constant/api';
import { Link } from 'react-router-dom';
import { getTop5ProductBestSale, getTop5ProductBestView } from '../../../services/product.servies';
import { BarChart } from './BarChart';
import { getTotalView } from '../../../services/productviews.services';
function Dashboard() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalUser, setTotalUser] = useState(0);
    const [totalView, setTotalView] = useState(0);
    const [productView, setProductView] = useState<ProductStatisticsType[]>([
        {
            id: 0,
            pro_name: '',
            color_id: 0,
            style_id: 0,
            cate_id: 0,
            status_id: 0,
            out_sole: '',
            gender: '',
            material_id: 0,
            collection_id: 0,
            amountOfSale: 0,
            amount_view: 0,
            created_at: '',
            imageGallery: { id: 0, img_src: '', product_id: 0, feature: false },
            priceModel: {
                id: 0,
                price: 0,
                product_id: 0,
                start_date: '',
                end_date: '',
                created_at: '',
                updated_at: '',
            },
            productDetails: [{ id: 0, quantity: 0, product_id: 0, size: 0 }],
        },
    ]);
    const [productsSale, setProductsSale] = useState<ProductStatisticsType[]>([
        {
            id: 0,
            pro_name: '',
            color_id: 0,
            style_id: 0,
            cate_id: 0,
            status_id: 0,
            out_sole: '',
            gender: '',
            material_id: 0,
            collection_id: 0,
            amountOfSale: 0,
            amount_view: 0,
            created_at: '',
            imageGallery: { id: 0, img_src: '', product_id: 0, feature: false },
            priceModel: {
                id: 0,
                price: 0,
                product_id: 0,
                start_date: '',
                end_date: '',
                created_at: '',
                updated_at: '',
            },
            productDetails: [{ id: 0, quantity: 0, product_id: 0, size: 0 }],
        },
    ]);

    useEffect(() => {
        async function GetTotalView() {
            try {
                const res = await getTotalView();
                setTotalView(res);
            } catch (err) {
                console.log(err);
            }
        }
        GetTotalView();
        async function getTop5Product() {
            const date = new Date();
            const data = {
                month: date.getMonth() + 1,
                year: date.getFullYear(),
            };
            try {
                const res = await getTop5ProductBestSale(data);
                setProductsSale(res);
            } catch (err) {
                console.log(err);
            }
        }
        async function getTop5ProBestView() {
            const date = new Date();
            const data = {
                month: date.getMonth() + 1,
                year: date.getFullYear(),
            };
            try {
                const res = await getTop5ProductBestView(data);
                setProductView(res);
            } catch (err) {
                console.log(err);
            }
        }
        getTop5ProBestView();
        getTop5Product();
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
        GetTotalUser();
        getTotalOrder();
    }, []);
    const columns_best_sale: TableColumn<ProductStatisticsType>[] = [
        {
            name: 'ID',
            selector: (row): any => row.id,
            sortable: true,
        },
        {
            name: 'Hình Ảnh Sản Phẩm',
            selector: (row): any => {
                return (
                    <img
                        style={{ width: '50%', padding: '10px 0' }}
                        src={
                            row.imageGallery.img_src.includes('uploads')
                                ? hostServerAdmin + row.imageGallery.img_src
                                : 'http://localhost:3000/' + row.imageGallery.img_src
                        }
                        alt=""
                    />
                );
            },
        },
        {
            name: 'Tên Loại Sản Phẩm',
            selector: (row): any => row.pro_name,
            sortable: true,
        },
        {
            name: 'Giá',
            selector: (row): any => row.priceModel.price.toLocaleString(undefined) + ' VND',
            sortable: true,
        },

        {
            name: 'Số lượng bán',
            selector: (row): any => row.amountOfSale,
            sortable: true,
        },
    ];

    const columns_best_view: TableColumn<ProductStatisticsType>[] = [
        {
            name: 'ID',
            selector: (row): any => row.id,
            sortable: true,
        },
        {
            name: 'Hình Ảnh Sản Phẩm',
            selector: (row): any => {
                return (
                    <img
                        style={{ width: '50%', padding: '10px 0' }}
                        src={
                            row.imageGallery.img_src.includes('uploads')
                                ? hostServerAdmin + row.imageGallery.img_src
                                : 'http://localhost:3000/' + row.imageGallery.img_src
                        }
                        alt=""
                    />
                );
            },
        },
        {
            name: 'Tên Loại Sản Phẩm',
            selector: (row): any => row.pro_name,
            sortable: true,
        },
        {
            name: 'Giá',
            selector: (row): any => row.priceModel.price.toLocaleString(undefined) + ' VND',
            sortable: true,
        },

        {
            name: 'Lượt xem',
            selector: (row): any => row.amount_view,
            sortable: true,
        },
    ];

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
                            <p> Lượt xem sản phẩm</p>
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
            <div className="card block-product">
                <div className="card-header">
                    <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>Top 5 sản phẩm bán chạy nhất</h3>
                </div>

                <div className="card-body">
                    <DataTable columns={columns_best_sale} data={productsSale} />
                </div>
            </div>

            <div className="card block-product">
                <div className="card-header">
                    <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                        Top 5 sản phẩm có lượt xem cao nhất
                    </h3>
                </div>

                <div className="card-body">
                    <DataTable columns={columns_best_view} data={productView} />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
