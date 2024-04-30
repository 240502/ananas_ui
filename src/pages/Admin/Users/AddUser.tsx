import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CreateUser, UpdateUser, getUserById } from '../../../services/user.services';
import { ToastContainer, toast } from 'react-toastify';
import { UsersType } from '../../../types';

type InputUser = {
    id: number;
    password: string;
    role: number;
    active: boolean;
    us_name: string;
    email: string;
    phonenumber: string;
    birthday: string;
    created_at: string;
    updated_at: string;
    province: string;
    district: string;
    ward: string;
};
type DataParams = {
    id: string;
};

export const AddUser = () => {
    const navigate = useNavigate();

    const { id } = useParams<DataParams>();
    const [provinces, setProvinces] = useState([{ id: 0, name: '' }]);

    const [districts, setDistricts] = useState([{ id: 0, name: '' }]);
    const [wards, setWards] = useState([{ id: 0, name: '' }]);
    // const [province, setProvince] = useState<any>({});
    // const [ward, setWard] = useState({ id: 0, name: '' });
    // const [district, setDistrict] = useState({ id: 0, name: '' });

    const [inputUser, setInputUser] = useState<InputUser>({
        id: 0,
        password: '',
        role: 0,
        active: false,
        us_name: '',
        email: '',
        phonenumber: '',
        birthday: '',
        created_at: '',
        updated_at: '',
        province: '',
        district: '',
        ward: '',
    });
    const [user, setUser] = useState<UsersType>({
        id: 0,
        passowrd: '',
        role: 1,
        active: true,
        us_name: '',
        email: '',
        phone_number: '',
        birhtday: '',
        created_at: '',
        updated_at: '',
        province: '',
        district: '',
        ward: '',
        token: '',
    });

    useEffect(() => {
        const getProvinces = async () => {
            try {
                const res = await axios.get(
                    'https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100',
                );
                setProvinces(res.data.results);
            } catch (err) {
                console.log(err);
            }
        };
        getProvinces();
    }, []);
    const getListDistrct = async (provinceId: any) => {
        try {
            const res = await axios.get(
                `https://vnprovinces.pythonanywhere.com/api/districts/?province_id=${provinceId}&basic=true&limit=100`,
            );
            setDistricts(res.data.results);
        } catch (err) {
            console.log(err);
        }
    };
    const getWards = async (districtId: any) => {
        try {
            const res = await axios.get(
                `https://vnprovinces.pythonanywhere.com/api/wards/?district_id=${districtId}&basic=true&limit=100`,
            );
            setWards(res.data.results);
        } catch (err) {
            console.log(err);
        }
    };
    const handleCreateProduct = () => {
        const province = provinces.find((p) => p.id == Number(inputUser.province));
        const district = districts.find((d) => d.id == Number(inputUser.district));
        const ward = wards.find((d) => d.id == Number(inputUser.ward));
        const data = {
            password: inputUser.password,
            us_name: inputUser.us_name,
            email: inputUser.email,
            phone_number: inputUser.phonenumber,
            birthday: inputUser.birthday,
            province: province?.name,
            district: district?.name,
            ward: ward?.name,
            token: '',
        };
        console.log(data);
        Create(data);
    };
    useEffect(() => {
        async function getUser() {
            if (id !== undefined) {
                try {
                    const res = await getUserById(id);
                    setInputUser({
                        id: res['id'],
                        password: res['password'],
                        role: res['role'],
                        active: res['active'],
                        us_name: res['us_name'],
                        email: res['email'],
                        phonenumber: res['phone_number'],
                        birthday: res['birthday'],
                        created_at: res['created_at'],
                        updated_at: res['updated_at'],
                        province: '',
                        district: '',
                        ward: '',
                    });
                    setUser(res);
                } catch (e) {
                    console.error(e);
                }
            }
        }
        getUser();
    }, [id]);
    useEffect(() => {
        if (user.id !== 0) {
            let province: any = provinces.find((item) => {
                return item.name === user.province;
            });
            if (province !== undefined) {
                getListDistrct(province.id);
            }
        }
    }, [provinces.length]);
    useEffect(() => {
        if (districts.length > 0) {
            let district: any = districts.find((item) => {
                return item.name === user.district;
            });
            if (district !== undefined) {
                getWards(district.id);
            }
        }
    }, [districts.length]);
    const Create = async (data: any) => {
        try {
            const res = await CreateUser(data);
            navigate('/admin/user');
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
        } catch (err) {
            console.log(err);
            toast.error('Có lỗi', {
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
    const handleUpdate = () => {
        const province = provinces.find((p) => p.id == Number(inputUser.province));
        const district = districts.find((d) => d.id == Number(inputUser.district));
        const ward = wards.find((d) => d.id == Number(inputUser.ward));
        const data = {
            id: inputUser.id,
            password: inputUser.password,
            us_name: inputUser.us_name,
            email: inputUser.email,
            phone_number: inputUser.phonenumber,
            birthday: inputUser.birthday,
            province: province?.name === undefined ? user.province : province?.name,
            district: district?.name === undefined ? user.district : district?.name,
            ward: ward?.name == undefined ? user.ward : ward?.name,
            token: '',
        };
        Update(data);
    };
    const Update = async (data: any) => {
        try {
            const res = await UpdateUser(data);
            navigate('/admin/user');
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
        } catch (err) {
            console.log(err);
            toast.error('Có lỗi', {
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
                    <h1>{id === undefined ? 'Thêm người dùng' : `Sửa thông tin người dùng có mã ${id}`} </h1>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <h3 className="title">Thông tin người dùng</h3>
                            <div className="col-lg-6">
                                {id !== undefined && (
                                    <>
                                        <input
                                            id="product_id"
                                            className="form-control"
                                            value={inputUser.id}
                                            hidden
                                        ></input>
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </>
                                )}
                                <div className="form-group">
                                    <label htmlFor="pro_name">Tên người dùng:</label>
                                    <input
                                        name="pro_name"
                                        id="pro_name"
                                        className="form-control"
                                        onChange={(e) => setInputUser({ ...inputUser, us_name: e.target.value })}
                                        value={inputUser.us_name}
                                    ></input>
                                    <div className="error_message" style={{ display: 'none' }}></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="province">Tỉnh/thành phố:</label>
                                    <select
                                        name="province"
                                        id="province"
                                        className="form-control"
                                        onChange={(e) => {
                                            setInputUser({ ...inputUser, province: e.target.value });
                                            getListDistrct(e.target.value);
                                        }}
                                    >
                                        <option value="0">Chọn tỉnh/thành phố</option>
                                        {provinces.map((item: any) => {
                                            if (item.name === user.province) {
                                                return (
                                                    <option value={item.id} key={item.id} selected>
                                                        {item.name}
                                                    </option>
                                                );
                                            } else
                                                return (
                                                    <option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                );
                                        })}
                                    </select>
                                    <div className="error_message" style={{ display: 'none' }}></div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="district">Quận/Huyện:</label>
                                    <select
                                        name="district"
                                        id="district"
                                        className="form-control"
                                        onChange={(e) => {
                                            setInputUser({ ...inputUser, district: e.target.value });
                                            getWards(e.target.value);
                                        }}
                                    >
                                        <option value="0">Chọn quận/huyện</option>
                                        {districts.map((item: any) => {
                                            if (item.name === user.district) {
                                                return (
                                                    <option value={item.id} key={item.id} selected>
                                                        {item.name}
                                                    </option>
                                                );
                                            } else
                                                return (
                                                    <option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                );
                                        })}
                                    </select>
                                    <div className="error_message" style={{ display: 'none' }}></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ward">Phường/xã:</label>
                                    <select
                                        name="ward"
                                        id="ward"
                                        className="form-control"
                                        onChange={(e) => setInputUser({ ...inputUser, ward: e.target.value })}
                                    >
                                        <option value="0">Chọn phường/xã</option>
                                        {wards.map((item: any) => {
                                            if (item.name === user.ward) {
                                                return (
                                                    <option value={item.id} key={item.id} selected>
                                                        {item.name}
                                                    </option>
                                                );
                                            } else
                                                return (
                                                    <option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                );
                                        })}
                                    </select>
                                    <div className="error_message" style={{ display: 'none' }}></div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phonenumber">Số điện thoại:</label>
                                    <input
                                        name="phonenumber"
                                        id="phonenumber"
                                        className="form-control"
                                        onChange={(e) => setInputUser({ ...inputUser, phonenumber: e.target.value })}
                                        value={inputUser.phonenumber}
                                    ></input>
                                    <div className="error_message" style={{ display: 'none' }}></div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="birthday">Ngày sinh:</label>
                                        <input
                                            type="date"
                                            name="birthday"
                                            id="birthday"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputUser({
                                                    ...inputUser,
                                                    birthday: e.target.value,
                                                })
                                            }
                                            value={inputUser.birthday.slice(0, 10)}
                                        ></input>
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Mật khẩu:</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputUser({
                                                    ...inputUser,
                                                    password: e.target.value,
                                                })
                                            }
                                            value={inputUser.password}
                                        ></input>
                                        <div className="error_message" style={{ display: 'none' }}></div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            onChange={(e) =>
                                                setInputUser({
                                                    ...inputUser,
                                                    email: e.target.value,
                                                })
                                            }
                                            value={inputUser.email}
                                        ></input>
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
                                                    setInputUser({
                                                        ...inputUser,
                                                        created_at: e.target.value,
                                                    });
                                                }}
                                                value={inputUser.created_at.slice(0, 10)}
                                            ></input>
                                            <div className="error_message" style={{ display: 'none' }}></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    type="button"
                                    style={{ width: '20%', padding: '10px 0px' }}
                                    name="cmd"
                                    className="btn btn-primary btn-add"
                                    onClick={() => (id === undefined ? handleCreateProduct() : handleUpdate())}
                                >
                                    {id !== undefined ? 'Lưu Lại' : 'Thêm mới'}
                                    <i className="fa-solid fa-plus" style={{ marginLeft: '10px' }}></i>
                                </button>
                                <Link
                                    to={'/admin/user'}
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
