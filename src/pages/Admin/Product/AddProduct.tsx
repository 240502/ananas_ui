import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../../services/category.services';
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
    style_name: string;
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
export const AddProduct = () => {
    const [cates, setCates] = useState<CategoryType[]>();
    const [status, setStatus] = useState<StatusType[]>();
    const [styles, setStyles] = useState<StyleType[]>();
    const [collections, setCollections] = useState<CollectionType[]>();
    const [materials, setMaterials] = useState<MaterialType[]>();
    const [colors, setColors] = useState<ColorType[]>();

    useEffect(() => {
        async function getCategory() {
            try{
                const data = await getCategories();
                setCates(data);
            }
            catch(err){
                console.log(err);
            }
        }
    }, []);
    return (
        <div className="main-content">
            <div id="form">
                <div className="card form-add">
                    <div className="card-header">
                        <h1>Thêm sản phẩm</h1>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="pro_name">Tên sản phẩm:</label>
                                <input
                                    name="pro_name"
                                    id="pro_name"
                                    className="form-control"
                                    // onChange={(e) => setCateName(e.target.value)}
                                ></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status_id">Trạng thái sản phẩm:</label>
                                <select
                                    name="status_id"
                                    id="status_id"
                                    className="form-control"
                                    // onChange={(e) => setCateName(e.target.value)}
                                >
                                    {status?.map((status) =><option value={status.id}  key={status.id}>{status.status_name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cate_id">Loại sản phẩm:</label>
                                <select
                                    name="cate_id"
                                    id="cate_id"
                                    className="form-control"
                                    // onChange={(e) => setCateName(e.target.value)}
                                >
                                    {cates?.map((cate) =><option value={cate.id}  key={cate.id}>{cate.cate_name}</option>)}

                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="style_id">Kiểu dáng sản phẩm:</label>
                                <select
                                    name="style_id"
                                    id="style_id"
                                    className="form-control"
                                    // onChange={(e) => setCateName(e.target.value)}
                                >
                                    {styles?.map((style) =><option value={style.id}  key={style.id}>{style.style_name}</option>)}

                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="collection_id">Bộ sưu tập sản phẩm:</label>
                                <select
                                    name="collection_id"
                                    id="collection_id"
                                    className="form-control"
                                    // onChange={(e) => setCateName(e.target.value)}
                                >
                                    {collections?.map((collection) =><option value={collection.id}  key={collection.id}>{collection.collection_name}</option>)}

                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="material_id">Chất liệu sản phẩm:</label>
                                <input
                                    name="material_id"
                                    id="material_id"
                                    className="form-control"
                                    // onChange={(e) => setCateName(e.target.value)}
                                ></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="gender">Giới tính:</label>
                                <input
                                    name="gender"
                                    id="gender"
                                    className="form-control"
                                    // onChange={(e) => setCateName(e.target.value)}
                                ></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="out_sole">Chất liệu đế:</label>
                                <input
                                    name="out_sole"
                                    id="out_sole"
                                    className="form-control"
                                    // onChange={(e) => setCateName(e.target.value)}
                                ></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="color_id">Màu sản phẩm:</label>
                                <select
                                    name="color_id"
                                    id="color_id"
                                    className="form-control"
                                    // onChange={(e) => setCateName(e.target.value)}
                                >
                                    {colors?.map((color) =><option value={color.id}  key={color.id}>{color.color_name}</option>)}

                                </select>
                            </div>
                            <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    type="button"
                                    style={{ width: '20%', padding: '10px 0px' }}
                                    name="cmd"
                                    className="btn btn-primary btn-add"
                                    // onClick={() => handleCreate()}
                                >
                                    Thêm Mới
                                    <i className="fa-solid fa-plus" style={{ marginLeft: '10px' }}></i>
                                </button>
                                <Link
                                    to={'/admin/category'}
                                    className="btn btn-secondary btn-return"
                                    style={{ width: '20%', padding: '10px 0px' }}
                                >
                                    Quay lại
                                    <i className="fa-solid fa-arrow-left-long" style={{ marginLeft: '10px' }}></i>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
