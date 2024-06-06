import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { getTop5ProductBestView } from '../../../services/product.servies';
import { ProductStatisticsType } from '../../../types';
import { hostServerAdmin } from '../../../constant/api';

export const Top5BestView = () => {
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

    useEffect(() => {
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
    }, []);
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
    const date = new Date();
    return (
        <div className="card block-product">
            <div className="card-header">
                <h3 style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                    Top 5 sản phẩm có lượt xem cao nhất tháng {date.getMonth() + 1}
                </h3>
            </div>

            <div className="card-body">
                <DataTable columns={columns_best_view} data={productView} />
            </div>
        </div>
    );
};
