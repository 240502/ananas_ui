import React, { useEffect, useState } from 'react';
import { ProductCategoryType, ProductDetailType, ProductType } from '../../../types';
import { getCategories } from '../../../services/category.services';
import { getProductByCateId } from '../../../services/product.servies';
import { createOrderDetail } from '../../../services/orderdetail.services';
import { toast } from 'react-toastify';
import { getListSizeByProId, getProDetailByProIdAndSize } from '../../../services/product_detail.services';

export const AddProduct = ({
    hideConfirmationModal,
    displayConfirmationModal,
    orderId,
    getOrder,
    handleGetProduct,
}: any) => {
    const [categories, setCategories] = useState<ProductCategoryType[]>([
        {
            id: 0,
            cate_name: '',
            created_at: '',
            updated_at: '',
        },
    ]);
    const [products, setProducts] = useState<ProductType[]>([
        {
            id: 0,
            pro_name: '',
            color_id: 0,
            style_id: 0,
            cate_id: 0,
            amountOfSale: 0,
            status_id: 0,
            out_sole: '',
            gender: '',
            material_id: 0,
            collection_id: 0,
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
    const [detail, setDetail] = useState<ProductDetailType>({ id: 0, quantity: 0, product_id: 0, size: 0 });
    const [productDetails, setProductDetails] = useState<ProductDetailType[]>([
        { id: 0, quantity: 0, product_id: 0, size: 0 },
    ]);
    const [product, setProduct] = useState<ProductType>({
        id: 0,
        pro_name: '',
        color_id: 0,
        style_id: 0,
        cate_id: 0,
        amountOfSale: 0,
        status_id: 0,
        out_sole: '',
        gender: '',
        material_id: 0,
        collection_id: 0,
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
    });
    const [quantity, setQuantity] = useState(0);
    const [size, setSize] = useState(0);

    useEffect(() => {
        async function getAllCategory() {
            if (displayConfirmationModal === true) {
                try {
                    const res = await getCategories();
                    setCategories(res);
                } catch (err) {
                    console.log(err);
                }
            }
        }
        getAllCategory();
    }, [displayConfirmationModal]);
    const handleGetProductByCateId = async (cateId: any) => {
        try {
            if (cateId > 0) {
                const res = await getProductByCateId(cateId);
                setProducts(res);
            } else {
                setProducts([
                    {
                        id: 0,
                        pro_name: '',
                        color_id: 0,
                        style_id: 0,
                        cate_id: 0,
                        amountOfSale: 0,
                        status_id: 0,
                        out_sole: '',
                        gender: '',
                        material_id: 0,
                        collection_id: 0,
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
                setProductDetails([{ id: 0, quantity: 0, product_id: 0, size: 0 }]);
                setProduct({
                    id: 0,
                    pro_name: '',
                    color_id: 0,
                    style_id: 0,
                    cate_id: 0,
                    amountOfSale: 0,
                    status_id: 0,
                    out_sole: '',
                    gender: '',
                    material_id: 0,
                    collection_id: 0,
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
                });
                setDetail({ id: 0, quantity: 0, product_id: 0, size: 0 });
            }
        } catch (err) {
            console.log(err);
        }
    };
    const GetProduct = async (proId: any) => {
        if (proId > 0) {
            const pro: any = products.find((item) => item.id === proId);
            getProductDetail(pro.id);
            setProduct(pro);
        } else {
            setProductDetails([{ id: 0, quantity: 0, product_id: 0, size: 0 }]);
            setProduct({
                id: 0,
                pro_name: '',
                color_id: 0,
                style_id: 0,
                cate_id: 0,
                amountOfSale: 0,
                status_id: 0,
                out_sole: '',
                gender: '',
                material_id: 0,
                collection_id: 0,
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
            });
            setDetail({ id: 0, quantity: 0, product_id: 0, size: 0 });
        }
    };
    const getProductDetail = async (proId: any) => {
        try {
            if (proId > 0) {
                const detail = await getListSizeByProId(proId);
                setProductDetails(detail);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleCreateOrderDetail = () => {
        const data = {
            product_id: product.id,
            order_id: orderId,
            quantity: quantity,
            price: product.priceModel.price,
            size_id: size,
            color_id: product.color_id,
            style_id: product.style_id,
        };
        CreateOrderDetail(data);
    };
    async function getProDetail(proId: any, size: any) {
        if (size > 0) {
            try {
                const pro: any = productDetails.find((item: ProductDetailType) => {
                    return item.product_id == proId && item.size == size;
                });
                setDetail(pro);
            } catch (error) {
                console.log(error);
            }
        } else {
            setDetail({ id: 0, quantity: 0, product_id: 0, size: 0 });
        }
    }

    useEffect(() => {
        function renderListNumberPro() {
            if (detail.quantity > 1) {
                var selectElement = document.getElementById('select_number');
                var option: any = selectElement?.querySelectorAll('#select_number option:not(.inital)');
                option.forEach((item: any) => selectElement?.removeChild(item));
                for (let index = 1; index <= detail.quantity; index++) {
                    let option = document.createElement('option');
                    option.innerHTML = `${index}`;
                    option.setAttribute('value', `${index}`);
                    selectElement?.appendChild(option);
                }
            } else {
                var selectElement = document.getElementById('select_number');
                var option: any = selectElement?.querySelectorAll('#select_number option:not(.inital)');
                option.forEach((item: any) => selectElement?.removeChild(item));
            }
        }
        renderListNumberPro();
    }, [detail]);
    const CreateOrderDetail = async (data: any) => {
        try {
            const res = await createOrderDetail(data);
            console.log(res);
            if (res.status == 200) {
                toast.success('Thêm sản phẩm thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                getOrder();
                hideConfirmationModal();
            }
        } catch (err) {
            console.log(err);
            toast.error('Thêm sản phẩm thất bại', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };
    return (
        <div id="modal-add" className={displayConfirmationModal === true ? 'opened' : ''}>
            <div className="modal-add-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-add-header">
                    <h3>Thêm sản phẩm</h3>
                    <div className="modal-add-close">
                        <i
                            className="fa-solid fa-xmark"
                            style={{ color: '#000000' }}
                            onClick={() => {
                                hideConfirmationModal();
                                setProducts([
                                    {
                                        id: 0,
                                        pro_name: '',
                                        color_id: 0,
                                        style_id: 0,
                                        cate_id: 0,
                                        amountOfSale: 0,
                                        status_id: 0,
                                        out_sole: '',
                                        gender: '',
                                        material_id: 0,
                                        collection_id: 0,
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
                                setProductDetails([{ id: 0, quantity: 0, product_id: 0, size: 0 }]);
                                setProduct({
                                    id: 0,
                                    pro_name: '',
                                    color_id: 0,
                                    style_id: 0,
                                    cate_id: 0,
                                    amountOfSale: 0,
                                    status_id: 0,
                                    out_sole: '',
                                    gender: '',
                                    material_id: 0,
                                    collection_id: 0,
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
                                });
                                setDetail({ id: 0, quantity: 0, product_id: 0, size: 0 });
                                setCategories([
                                    {
                                        id: 0,
                                        cate_name: '',
                                        created_at: '',
                                        updated_at: '',
                                    },
                                ]);
                            }}
                        />
                    </div>
                </div>
                <div className="modal-add-form row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label htmlFor="cate_id">Loại sản phẩm:</label>
                            <select
                                className="form-control"
                                id="cate_id"
                                onChange={(e) => {
                                    handleGetProductByCateId(e.target.value);
                                    setProducts([
                                        {
                                            id: 0,
                                            pro_name: '',
                                            color_id: 0,
                                            style_id: 0,
                                            cate_id: 0,
                                            amountOfSale: 0,
                                            status_id: 0,
                                            out_sole: '',
                                            gender: '',
                                            material_id: 0,
                                            collection_id: 0,
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
                                    setProductDetails([{ id: 0, quantity: 0, product_id: 0, size: 0 }]);
                                    setProduct({
                                        id: 0,
                                        pro_name: '',
                                        color_id: 0,
                                        style_id: 0,
                                        cate_id: 0,
                                        amountOfSale: 0,
                                        status_id: 0,
                                        out_sole: '',
                                        gender: '',
                                        material_id: 0,
                                        collection_id: 0,
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
                                    });
                                    setDetail({ id: 0, quantity: 0, product_id: 0, size: 0 });
                                }}
                            >
                                <option value="0">Chọn loại sản phẩm</option>

                                {categories.length > 1 &&
                                    categories.map((category) => {
                                        return <option value={category.id}>{category.cate_name}</option>;
                                    })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_id">Sản phẩm:</label>
                            <select
                                className="form-control"
                                id="product_id"
                                onChange={(e) => {
                                    GetProduct(Number(e.target.value));
                                }}
                            >
                                <option value="0">Chọn sản phẩm</option>
                                {products.length > 1 &&
                                    products.map((product) => {
                                        return <option value={product.id}>{product.pro_name}</option>;
                                    })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="size_id">Kích cỡ:</label>
                            <select
                                className="form-control"
                                id="size_id"
                                onChange={(e) => {
                                    setSize(Number(e.target.value));
                                    getProDetail(product.id, Number(e.target.value));
                                }}
                            >
                                <option value={0}>Chọn size</option>

                                {productDetails.length > 1 &&
                                    productDetails.map((detail) => {
                                        return (
                                            <option value={detail.size} onChange={() => {}}>
                                                {detail.size}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Số lượng:</label>
                            <select
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                name=""
                                id="select_number"
                                className=" form-select selectpicker bs-select-hidden"
                            >
                                <option className="inital" value={0}>
                                    Chọn số lượng
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label htmlFor="color_id">Màu sắc:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="color_id"
                                readOnly
                                value={product.color_id}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Giá:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                readOnly
                                value={product.priceModel.price}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="style_id">Kiểu dáng:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="style_id"
                                readOnly
                                value={product.style_id}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-add-action">
                    <button
                        type="button"
                        className="btn btnNo"
                        onClick={() => {
                            hideConfirmationModal();
                            setProducts([
                                {
                                    id: 0,
                                    pro_name: '',
                                    color_id: 0,
                                    style_id: 0,
                                    cate_id: 0,
                                    amountOfSale: 0,
                                    status_id: 0,
                                    out_sole: '',
                                    gender: '',
                                    material_id: 0,
                                    collection_id: 0,
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
                            setProductDetails([{ id: 0, quantity: 0, product_id: 0, size: 0 }]);
                            setProduct({
                                id: 0,
                                pro_name: '',
                                color_id: 0,
                                style_id: 0,
                                cate_id: 0,
                                amountOfSale: 0,
                                status_id: 0,
                                out_sole: '',
                                gender: '',
                                material_id: 0,
                                collection_id: 0,
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
                            });
                            setDetail({ id: 0, quantity: 0, product_id: 0, size: 0 });
                            setCategories([
                                {
                                    id: 0,
                                    cate_name: '',
                                    created_at: '',
                                    updated_at: '',
                                },
                            ]);
                        }}
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        className="btn btnYes"
                        onClick={() => {
                            handleCreateOrderDetail();
                        }}
                    >
                        Thêm +
                    </button>
                </div>
            </div>
        </div>
    );
};
