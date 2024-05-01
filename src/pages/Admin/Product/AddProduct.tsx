import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCategories } from '../../../services/category.services';
import { getAllMaterial } from '../../../services/material.services';
import { getAllProductStatus, getProductStatus } from '../../../services/product_status.services';
import { getAllStyle } from '../../../services/style.services';
import { getAllCollection } from '../../../services/collection.services';
import { getAllColor } from '../../../services/color.services';
import { upload } from '../../../services/image_product.services';
import { create, getProductById, update } from '../../../services/product.servies';
import { toast } from 'react-toastify';
import {
    checkDateError,
    checkDateWithCurrentDate,
    checkOutSoleNotIsNumber,
    checkPriceIsNumber,
    checkQuantityIsNumber,
    checkSizeError,
    checkSizeIsNumber,
} from '../../../utils/validation_product';
import { handleFocusInput } from '../../../utils/global';
import { checkEmptyError } from '../../../utils/global';
import { ImageGalleryType, ProductDetailType, ProductPriceType, ProductType } from '../../../types';
import { hostServerAdmin } from '../../../constant/api';
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
    proId: number;
    endSize: number;
    price: number;
    startDate: string;
    endDate: string;
    file: any;
    create_at: string;
};
type DataParams = {
    id: string;
};
export const AddProduct = () => {
    let listInput: any;
    let inputEndSize: any;
    let inputStartSize: any;
    let inputPrice: any;
    let inputOutSole: any;
    let inputStartDate: any;
    let inputEndDate: any;
    let inputQuantity: any;
    const [product, setProduct] = useState<ProductType>({
        id: 0,
        pro_name: '',
        color_id: 0,
        style_id: 0,
        amountOfSale: 0,
        cate_id: 0,
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
    const { id } = useParams<DataParams>();
    const genders = ['unisex', 'man', 'woman'];
    const navigate = useNavigate();
    const [oldMaxSize, setOldMaxSize] = useState(0);
    const [oldMinSize, setOldMinSize] = useState(0);
    const [price, setPrice] = useState<ProductPriceType>({
        id: 0,
        product_id: 0,
        price: 0,
        end_date: '',
        start_date: '',
        created_at: '',
        updated_at: '',
    });
    const [productDetails, setProductDetails] = useState<ProductDetailType[]>([
        { id: 0, quantity: 0, product_id: 0, size: 0 },
    ]);
    const [imageGallery, setImageGallery] = useState<ImageGalleryType>({
        id: 0,
        img_src: '',
        feature: false,
        product_id: 0,
    });
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
        proId: 0,
        endSize: 0,
        price: 0,
        startDate: '',
        endDate: '',
        file: '',
        create_at: '',
    });
    useEffect(() => {
        listInput = document.querySelectorAll(`${id === undefined ? '.form-add input' : '.form-add input[text]'}`);
        inputEndSize = document.querySelector('#endSize');
        inputStartSize = document.querySelector('#startSize');
        inputPrice = document.querySelector('#price');
        inputOutSole = document.querySelector('#outSole');
        inputStartDate = document.querySelector('#startDate');
        inputEndDate = document.querySelector('#endDate');
        inputQuantity = document.querySelector('#quantity');
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
        const getProduct = async (id: any) => {
            if (id !== undefined) {
                const product = await getProductById(id);
                let maxSize = product['productDetails'][0]['size'];
                let minSize = product['productDetails'][0]['size'];
                for (var i = 1; i < product['productDetails'].length; i++) {
                    if (maxSize < product['productDetails'][i]['size']) {
                        maxSize = product['productDetails'][i]['size'];
                    }
                    if (minSize > product['productDetails'][i]['size']) {
                        minSize = product['productDetails'][i]['size'];
                    }
                }
                setOldMaxSize(maxSize);
                setOldMinSize(minSize);
                console.log(maxSize);
                console.log(minSize);

                setProductDetails(product['productDetails']);
                setInputProduct({
                    proName: product['pro_name'],
                    cateId: product['cate_id'],
                    statusId: product['status_id'],
                    styleId: product['style_id'],
                    collectionId: product['collection_id'],
                    materialId: product['material_id'],
                    gender: product['gender'],
                    outSole: product['out_sole'],
                    colorId: product['color_id'],
                    quantity: product['productDetails'][0]['quantity'],
                    startSize: minSize,
                    proId: product['id'],
                    endSize: maxSize,
                    price: product['priceModel']['price'],
                    startDate: product['priceModel']['start_date'],
                    endDate: product['priceModel']['end_date'],
                    file: product['imageGallery']['img_src'],
                    create_at: product['created_at'],
                });
                setPrice(product['priceModel']);
                setImageGallery(product['imageGallery']);
                console.log('re-render');
            }
        };

        getCategory();
        getStatus();
        getStyle();
        getCollection();
        getMaterial();
        getColor();
        handleFocusInput(listInput);

        getProduct(id);
    }, [id]);

    const handleCreateProduct = async () => {
        const isEmpty = checkEmptyError(listInput);
        if (!isEmpty) {
            const isOutSoleError = checkOutSoleNotIsNumber(inputOutSole);
            const isPriceError = checkPriceIsNumber(inputPrice);
            const isEndSizeError = checkSizeIsNumber(inputEndSize);
            const isStartSizeError = checkSizeIsNumber(inputStartSize);
            const isEndDateError = checkDateWithCurrentDate(inputEndDate);
            const isStartDateError = checkDateWithCurrentDate(inputStartDate);
            const isQuantityError = checkQuantityIsNumber(inputQuantity);
            if (
                isOutSoleError &&
                isPriceError &&
                isEndSizeError &&
                isStartSizeError &&
                !isEndDateError &&
                !isStartDateError &&
                isQuantityError
            ) {
                const isSizeError = checkSizeError(inputEndSize, inputStartSize);
                const isDateError = checkDateError(inputEndDate, inputStartDate);
                if (!isSizeError && !isDateError) {
                    if (id === undefined) {
                        let imageGallery: any;
                        var formFile: FormData = new FormData();
                        if (inputProduct.file != '') {
                            formFile.append('formFile', inputProduct.file, inputProduct.file['name']);
                            const path = await upload(formFile);
                            imageGallery = {
                                img_src: path.data,
                            };
                        }
                        let details: any = [];
                        for (var i = inputProduct.startSize; i <= inputProduct.endSize; i++) {
                            details.push({ quantity: inputProduct.quantity, size: i });
                        }
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

                            productDetails: details,
                            priceModel: {
                                price: inputProduct.price,
                                start_date: inputProduct.startDate,
                                end_date: inputProduct.endDate,
                            },
                            imageGallery: imageGallery,
                        };
                        Create(data);
                    } else {
                        let tmpDetails: any = [];
                        console.log(inputProduct.create_at);
                        let data: any = {};
                        let newImage: any = {};
                        if (inputProduct.file !== imageGallery.img_src) {
                            var formFile: FormData = new FormData();
                            if (inputProduct.file != '') {
                                formFile.append('formFile', inputProduct.file, inputProduct.file['name']);
                                const path = await upload(formFile);

                                newImage = { ...imageGallery, img_src: path.data };
                            }
                        } else newImage = { ...imageGallery };
                        if (inputProduct.startSize === oldMinSize && inputProduct.endSize == oldMaxSize) {
                            tmpDetails = productDetails.map((detail) => ({ ...detail, status: 1 }));
                            data = {
                                id: inputProduct.proId,
                                pro_name: inputProduct.proName,
                                status_id: inputProduct.statusId,
                                cate_id: inputProduct.cateId,
                                style_id: inputProduct.styleId,
                                collection_id: inputProduct.collectionId,
                                material_id: inputProduct.materialId,
                                color_id: inputProduct.colorId,
                                gender: inputProduct.gender,
                                out_sole: inputProduct.outSole,
                                created_at: inputProduct.create_at,
                                productDetails: tmpDetails,
                                priceModel: {
                                    ...price,
                                    price: inputProduct.price,
                                    start_date: inputProduct.startDate,
                                    end_date: inputProduct.endDate,
                                },
                                imageGallery: newImage,
                            };
                        } else {
                            let newdetails: any = [];
                            if (inputProduct.startSize > oldMinSize) {
                                tmpDetails = productDetails.map((detail) => {
                                    if (detail.size == oldMinSize) {
                                        return { ...detail, status: 2 };
                                    } else return detail;
                                });

                                console.log('oge1');
                            }
                            if (inputProduct.endSize > oldMaxSize) {
                                for (var j = oldMaxSize + 1; j <= inputProduct.endSize; j++) {
                                    newdetails.push({ quantity: inputProduct.quantity, size: j, status: 1 });
                                }
                            }
                            if (inputProduct.startSize < oldMinSize) {
                                for (var j = inputProduct.startSize; j < oldMinSize; j++) {
                                    newdetails.push({ quantity: inputProduct.quantity, size: j, status: 1 });
                                }
                            }
                            if (inputProduct.endSize < oldMaxSize) {
                                if (tmpDetails.length > 0) {
                                    tmpDetails = tmpDetails.map((item: any) => {
                                        if (item['size'] === oldMaxSize) {
                                            return { ...item, status: 2 };
                                        } else return item;
                                    });
                                } else {
                                    tmpDetails = productDetails.map((detail) => {
                                        if (detail.size == oldMinSize) {
                                            return { ...detail, status: 2 };
                                        } else return detail;
                                    });
                                }
                                console.log('oge2');
                            }
                            data = {
                                id: inputProduct.proId,
                                pro_name: inputProduct.proName,
                                status_id: inputProduct.statusId,
                                cate_id: inputProduct.cateId,
                                style_id: inputProduct.styleId,
                                collection_id: inputProduct.collectionId,
                                material_id: inputProduct.materialId,
                                color_id: inputProduct.colorId,
                                gender: inputProduct.gender,
                                created_at: inputProduct.create_at,
                                out_sole: inputProduct.outSole,
                                productDetails: [...tmpDetails, ...newdetails],
                                priceModel: {
                                    ...price,
                                    price: inputProduct.price,
                                    start_date: inputProduct.startDate,
                                    end_date: inputProduct.endDate,
                                },
                                imageGallery: newImage,
                            };
                        }
                        console.log('update');
                        Update(data);
                    }
                }
            }
        }
    };
    const Update = async (data: any) => {
        console.log(data);
        try {
            const res = await update(data);
            navigate('/admin/product');
            toast.success('Sửa thành công', {
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
            toast.error('Sửa không thành công', {
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
    const Create = async (data: any) => {
        console.log(data);
        try {
            const res = await create(data);
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

    return (
        <div id="form">
            <div className="card form-add">
                <div className="card-header">
                    <h1>{id === undefined ? 'Thêm sản phẩm' : `Sửa sản phẩm có mã ${id}`} </h1>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <h3 className="title">Thông tin sản phẩm</h3>
                            <div className="col-lg-6">
                                {id !== undefined && (
                                    <div className="form-group">
                                        <input
                                            id="product_id"
                                            className="form-control"
                                            value={inputProduct.proId}
                                        ></input>
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                )}
                                <div className="form-group">
                                    <label htmlFor="pro_name">Tên sản phẩm:</label>
                                    <input
                                        name="pro_name"
                                        id="pro_name"
                                        className="form-control"
                                        onChange={(e) => setInputProduct({ ...inputProduct, proName: e.target.value })}
                                        value={inputProduct.proName}
                                    ></input>
                                    <div className="error_message" style={{ display: 'none' }}></div>
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
                                        value={inputProduct.statusId}
                                    >
                                        <option value="0">Chọn trạng thái sản phẩm</option>

                                        {status?.map((item: any) => {
                                            if (item.id === inputProduct.statusId) {
                                                return (
                                                    <option value={item.id} key={item.id} selected>
                                                        {item.status_name}
                                                    </option>
                                                );
                                            } else
                                                return (
                                                    <option value={item.id} key={item.id}>
                                                        {item.status_name}
                                                    </option>
                                                );
                                        })}
                                    </select>
                                    <div className="error_message" style={{ display: 'none' }}></div>
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

                                        {cates?.map((cate) => {
                                            if (cate.id === inputProduct.cateId) {
                                                return (
                                                    <option value={cate.id} key={cate.id} selected>
                                                        {cate.cate_name}
                                                    </option>
                                                );
                                            } else
                                                return (
                                                    <option value={cate.id} key={cate.id}>
                                                        {cate.cate_name}
                                                    </option>
                                                );
                                        })}
                                    </select>
                                    <div className="error_message" style={{ display: 'none' }}></div>
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
                                        value={inputProduct.styleId}
                                    >
                                        <option value="0">Chọn kiểu dáng sản phẩm</option>

                                        {styles?.map((style) => {
                                            if (style.id === inputProduct.styleId) {
                                                return (
                                                    <option value={style.id} key={style.id} selected>
                                                        {style.name_style}
                                                    </option>
                                                );
                                            } else
                                                return (
                                                    <option value={style.id} key={style.id}>
                                                        {style.name_style}
                                                    </option>
                                                );
                                        })}
                                    </select>
                                    <div className="error_message" style={{ display: 'none' }}></div>
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
                                        value={inputProduct.collectionId}
                                    >
                                        <option value="0">Chọn bộ sưu tập</option>
                                        {collections?.map((collection) => {
                                            if (collection.id === inputProduct.collectionId) {
                                                return (
                                                    <option value={collection.id} key={collection.id} selected>
                                                        {collection.collection_name}
                                                    </option>
                                                );
                                            } else
                                                return (
                                                    <option value={collection.id} key={collection.id}>
                                                        {collection.collection_name}
                                                    </option>
                                                );
                                        })}
                                    </select>
                                    <div className="error_message" style={{ display: 'none' }}></div>
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
                                        value={inputProduct.materialId}
                                    >
                                        <option value="0">Chọn chất liệu sản phẩm</option>

                                        {materials?.map((material) => {
                                            if (material.id === inputProduct.materialId) {
                                                return (
                                                    <option value={material.id} key={material.id} selected>
                                                        {material.material_name}
                                                    </option>
                                                );
                                            } else
                                                return (
                                                    <option value={material.id} key={material.id}>
                                                        {material.material_name}
                                                    </option>
                                                );
                                        })}
                                    </select>
                                    <div className="error_message" style={{ display: 'none' }}></div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender">Giới tính:</label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        className="form-control"
                                        onChange={(e) => setInputProduct({ ...inputProduct, gender: e.target.value })}
                                        value={inputProduct.gender}
                                    >
                                        {genders.map((g: any) => {
                                            if (g === inputProduct.gender) {
                                                return (
                                                    <option value={g} selected>
                                                        {g}
                                                    </option>
                                                );
                                            } else return <option value={g}>{g}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="outSole">Chất liệu đế:</label>
                                    <input
                                        name="out_sole"
                                        id="outSole"
                                        className="form-control"
                                        onChange={(e) => setInputProduct({ ...inputProduct, outSole: e.target.value })}
                                        value={inputProduct.outSole}
                                    ></input>
                                    <div className="error_message" style={{ display: 'none' }}></div>
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
                                            value={inputProduct.colorId}
                                        >
                                            <option value="0">Chọn màu sản phẩm</option>

                                            {colors?.map((color) => {
                                                if (color.id === inputProduct.colorId) {
                                                    return (
                                                        <option value={color.id} key={color.id} selected>
                                                            {color.color_name}
                                                        </option>
                                                    );
                                                } else
                                                    return (
                                                        <option value={color.id} key={color.id}>
                                                            {color.color_name}
                                                        </option>
                                                    );
                                            })}
                                        </select>
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    {id !== undefined && (
                                        <div
                                            className="form-group"
                                            style={{ display: `${id !== undefined ? 'block' : 'none'}` }}
                                        >
                                            <label htmlFor="create_at">Ngày tạo:</label>
                                            <input
                                                type="date"
                                                name="create_at"
                                                id="create_at"
                                                className="form-control"
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setInputProduct({
                                                        ...inputProduct,
                                                        create_at: e.target.value,
                                                    });
                                                }}
                                                value={inputProduct.create_at.slice(0, 10)}
                                            ></input>
                                            <div className="error_message" style={{ display: 'none' }}></div>
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label htmlFor="">Số lượng:</label>
                                        <input
                                            type="text"
                                            id="quantity"
                                            className="form-control quantity"
                                            onChange={(e) =>
                                                setInputProduct({
                                                    ...inputProduct,
                                                    quantity: Number(e.target.value),
                                                })
                                            }
                                            value={inputProduct.quantity != 0 ? inputProduct.quantity : ''}
                                        />

                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Size nhỏ nhất:</label>
                                        <input
                                            type="text"
                                            id="startSize"
                                            className="form-control size"
                                            onChange={(e) =>
                                                setInputProduct({
                                                    ...inputProduct,
                                                    startSize: Number(e.target.value),
                                                })
                                            }
                                            value={inputProduct.startSize != 0 ? inputProduct.startSize : ''}
                                        />
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>{' '}
                                    <div className="form-group">
                                        <label htmlFor="">Size lớn nhất:</label>
                                        <input
                                            type="text"
                                            id="endSize"
                                            className="form-control size"
                                            onChange={(e) =>
                                                setInputProduct({
                                                    ...inputProduct,
                                                    endSize: Number(e.target.value),
                                                })
                                            }
                                            value={inputProduct.endSize != 0 ? inputProduct.endSize : ''}
                                        />
                                        <div className="error_message" style={{ display: 'none' }}></div>
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
                                            value={inputProduct.price != 0 ? inputProduct.price : ''}
                                        />
                                        <div className="error_message" style={{ display: 'none' }}></div>
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
                                            value={inputProduct.startDate.slice(0, 10)}
                                        />
                                        <div className="error_message" style={{ display: 'none' }}></div>
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
                                            value={inputProduct.endDate.slice(0, 10)}
                                        />
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Hình ảnh</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="image"
                                            onChange={(e) =>
                                                setInputProduct({
                                                    ...inputProduct,
                                                    file: e.target.files?.[0],
                                                })
                                            }
                                        />
                                        <img
                                            style={{
                                                display: `${id === undefined ? `none` : `block`}`,
                                                width: '30%',
                                                padding: '10px 0',
                                            }}
                                            src={
                                                id !== undefined
                                                    ? typeof inputProduct.file == 'string'
                                                        ? inputProduct.file.includes('uploads')
                                                            ? hostServerAdmin + inputProduct.file
                                                            : 'http://localhost:3000/' + inputProduct.file
                                                        : ''
                                                    : ''
                                            }
                                            alt=""
                                        />
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    type="button"
                                    style={{ width: '20%', padding: '10px 0px' }}
                                    name="cmd"
                                    className="btn btn-primary btn-add"
                                    onClick={() => handleCreateProduct()}
                                >
                                    {id !== undefined ? 'Lưu Lại' : 'Thêm mới'}
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
    );
};
