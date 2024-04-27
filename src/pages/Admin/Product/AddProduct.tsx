import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../../../services/category.services';
import { getAllMaterial } from '../../../services/material.services';
import { getAllProductStatus, getProductStatus } from '../../../services/product_status.services';
import { getAllStyle } from '../../../services/style.services';
import { getAllCollection } from '../../../services/collection.services';
import { getAllColor } from '../../../services/color.services';
import { upload } from '../../../services/image_product.services';
import { create } from '../../../services/product.servies';
import { createImage } from '../../../services/image_product.services';
import { createProductDetail } from '../../../services/product_detail.services';
import { createProductPrice } from '../../../services/price.services';
import { toast } from 'react-toastify';
type CategoryType = {
    id: number;
    cate_name: string;
};

type StatusType = {
    id: number;
    status_name: string;
};
type StyleType = {
    id: number;
    name_style: string;
};

type CollectionType = {
    id: number;
    collection_name: string;
};
type MaterialType = {
    id: number;
    material_name: string;
};

type ColorType = {
    id: number;
    color_name: string;
};
type InputProductType = {
    proName: string;
    statusId: number;
    cateId: number;
    styleId: number;
    collectionId: number;
    materialId: number;
    gender: string;
    outSole: string;
    colorId: number;
    quantity: number;
    startSize: number;

    endSize: number;
    price: number;
    startDate: string;
    endDate: string;
    file: any;
};
export const AddProduct = () => {
    const navigate = useNavigate();
    const [cates, setCates] = useState<CategoryType[]>();
    const [status, setStatus] = useState<StatusType[]>();
    const [styles, setStyles] = useState<StyleType[]>();
    const [collections, setCollections] = useState<CollectionType[]>();
    const [materials, setMaterials] = useState<MaterialType[]>();
    const [colors, setColors] = useState<ColorType[]>();
    const [inputProduct, setInputProduct] = useState<InputProductType>({
        proName: '',
        cateId: 0,
        statusId: 0,
        styleId: 0,
        collectionId: 0,
        materialId: 0,
        gender: 'unisex',
        outSole: '',
        colorId: 0,
        quantity: 0,
        startSize: 0,

        endSize: 0,
        price: 0,
        startDate: '',
        endDate: '',
        file: '',
    });
    useEffect(() => {
        async function getCategory() {
            try {
                const data = await getCategories();
                setCates(data);
            } catch (err) {
                console.log(err);
            }
        }
        async function getStatus() {
            try {
                const data = await getAllProductStatus();
                setStatus(data);
            } catch (err) {
                console.log(err);
            }
        }
        async function getStyle() {
            try {
                const data = await getAllStyle();
                setStyles(data);
            } catch (err) {
                console.log(err);
            }
        }

        async function getCollection() {
            try {
                const data = await getAllCollection();
                setCollections(data);
            } catch (err) {
                console.log(err);
            }
        }
        async function getMaterial() {
            try {
                const data = await getAllMaterial();
                setMaterials(data);
            } catch (err) {
                console.log(err);
            }
        }
        async function getColor() {
            try {
                const data = await getAllColor();
                setColors(data);
            } catch (err) {
                console.log(err);
            }
        }
        getCategory();
        getStatus();
        getStyle();
        getCollection();
        getMaterial();
        getColor();
    }, []);
    const handleCreateProduct = async () => {
        console.log('data=', inputProduct);
        try {
            const data = {
                pro_name: inputProduct.proName,
                status_id: inputProduct.statusId,
                cate_id: inputProduct.cateId,
                style_id: inputProduct.styleId,
                collection_id: inputProduct.collectionId,
                material_id: inputProduct.materialId,
                color_id: inputProduct.colorId,
                gender: inputProduct.gender,
                out_sole: inputProduct.outSole,
            };
            const res = await create(data);
            handleCreateImageGallery(Number(res));
            handleCreatePrice(Number(res));
            handleCreateDetail(Number(res));
            navigate('/admin/product');
            toast.success('Thêm thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } catch (e) {
            console.log(e);
            toast.error('Thêm không thành công', {
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
    const handleCreateImageGallery = async (proId: number) => {
        try {
            var formData: FormData = new FormData();
            formData.append('file', inputProduct.file, inputProduct.file['name']);
            const path = await upload(formData);
            const data = {
                img_src: path.data['fullPath'],
                product_id: proId,
            };
            const res = await createImage(data);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };
    const handleCreatePrice = async (proId: number) => {
        try {
            const data = {
                price: inputProduct.price,
                product_id: proId,
                start_date: inputProduct.startDate,
                end_date: inputProduct.endDate,
            };
            const res = await createProductPrice(data);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    const handleCreateDetail = async (proId: number) => {
        try {
            let data: any = [];
            for (var i = inputProduct.startSize; i <= inputProduct.endSize; i++) {
                data.push({ quantity: inputProduct.quantity, product_id: proId, size: i });
            }
            data.forEach(async (element: any) => {
                const res = await createProductDetail(element);
                console.log(res);
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="main-content">
            <div id="form">
                <div className="card form-add">
                    <div className="card-header">
                        <h1>Thêm sản phẩm</h1>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <h3 className="title">Thông tin sản phẩm</h3>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="pro_name">Tên sản phẩm:</label>
                                        <input
                                            name="pro_name"
                                            id="pro_name"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputProduct({ ...inputProduct, proName: e.target.value })
                                            }
                                        ></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="status_id">Trạng thái sản phẩm:</label>
                                        <select
                                            name="status_id"
                                            id="status_id"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputProduct({ ...inputProduct, statusId: Number(e.target.value) })
                                            }
                                        >
                                            <option value="0">Chọn trạng thái sản phẩm</option>

                                            {status?.map((status) => (
                                                <option value={status.id} key={status.id}>
                                                    {status.status_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cate_id">Loại sản phẩm:</label>
                                        <select
                                            name="cate_id"
                                            id="cate_id"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputProduct({ ...inputProduct, cateId: Number(e.target.value) })
                                            }
                                        >
                                            <option value="0">Chọn loại sản phẩm</option>

                                            {cates?.map((cate) => (
                                                <option value={cate.id} key={cate.id}>
                                                    {cate.cate_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="style_id">Kiểu dáng sản phẩm:</label>
                                        <select
                                            name="style_id"
                                            id="style_id"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputProduct({ ...inputProduct, styleId: Number(e.target.value) })
                                            }
                                        >
                                            <option value="0">Chọn kiểu dáng sản phẩm</option>

                                            {styles?.map((style) => (
                                                <option value={style.id} key={style.id}>
                                                    {style.name_style}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="collection_id">Bộ sưu tập sản phẩm:</label>
                                        <select
                                            name="collection_id"
                                            id="collection_id"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputProduct({
                                                    ...inputProduct,
                                                    collectionId: Number(e.target.value),
                                                })
                                            }
                                        >
                                            <option value="0">Chọn bộ sưu tập</option>
                                            {collections?.map((collection) => (
                                                <option value={collection.id} key={collection.id}>
                                                    {collection.collection_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="material_id">Chất liệu sản phẩm:</label>
                                        <select
                                            name="material_id"
                                            id="material_id"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputProduct({ ...inputProduct, materialId: Number(e.target.value) })
                                            }
                                        >
                                            <option value="0">Chọn chất liệu sản phẩm</option>

                                            {materials?.map((material) => (
                                                <option value={material.id} key={material.id}>
                                                    {material.material_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="gender">Giới tính:</label>
                                        <select
                                            name="gender"
                                            id="gender"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputProduct({ ...inputProduct, gender: e.target.value })
                                            }
                                        >
                                            <option value="unisex">Unisex</option>
                                            <option value="woman">Nữ</option>
                                            <option value="man">Nam</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="out_sole">Chất liệu đế:</label>
                                        <input
                                            name="out_sole"
                                            id="out_sole"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputProduct({ ...inputProduct, outSole: e.target.value })
                                            }
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row">
                                        <div className="form-group">
                                            <label htmlFor="color_id">Màu sản phẩm:</label>
                                            <select
                                                name="color_id"
                                                id="color_id"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setInputProduct({
                                                        ...inputProduct,
                                                        colorId: Number(e.target.value),
                                                    })
                                                }
                                            >
                                                <option value="0">Chọn màu sản phẩm</option>

                                                {colors?.map((color) => (
                                                    <option value={color.id} key={color.id}>
                                                        {color.color_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Số lượng:</label>
                                            <input
                                                type="text"
                                                className="form-control quantity"
                                                onChange={(e) =>
                                                    setInputProduct({
                                                        ...inputProduct,
                                                        quantity: Number(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Size nhỏ nhất:</label>
                                            <input
                                                type="text"
                                                className="form-control size"
                                                onChange={(e) =>
                                                    setInputProduct({
                                                        ...inputProduct,
                                                        startSize: Number(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>{' '}
                                        <div className="form-group">
                                            <label htmlFor="">Size bé nhất:</label>
                                            <input
                                                type="text"
                                                className="form-control size"
                                                onChange={(e) =>
                                                    setInputProduct({
                                                        ...inputProduct,
                                                        endSize: Number(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>{' '}
                                        <div className="form-group">
                                            <label htmlFor="price">Giá sản phẩm:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="price"
                                                onChange={(e) =>
                                                    setInputProduct({ ...inputProduct, price: Number(e.target.value) })
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="startDate">Ngày bắt đầu áp dụng</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="startDate"
                                                onChange={(e) =>
                                                    setInputProduct({ ...inputProduct, startDate: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="endDate">Ngày kết thúc áp dụng</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="endDate"
                                                onChange={(e) =>
                                                    setInputProduct({ ...inputProduct, endDate: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="image">Hình ảnh</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="image"
                                                onChange={(e) =>
                                                    setInputProduct({ ...inputProduct, file: e.target.files?.[0] })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="form-group"
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                    <button
                                        type="button"
                                        style={{ width: '20%', padding: '10px 0px' }}
                                        name="cmd"
                                        className="btn btn-primary btn-add"
                                        onClick={() => handleCreateProduct()}
                                    >
                                        Thêm Mới
                                        <i className="fa-solid fa-plus" style={{ marginLeft: '10px' }}></i>
                                    </button>
                                    <Link
                                        to={'/admin/product'}
                                        className="btn btn-secondary btn-return"
                                        style={{ width: '20%', padding: '10px 0px' }}
                                    >
                                        Quay lại
                                        <i className="fa-solid fa-arrow-left-long" style={{ marginLeft: '10px' }}></i>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
