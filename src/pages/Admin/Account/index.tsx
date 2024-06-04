import React, { useEffect, useState } from 'react';
import { UpdateUser, getUserById } from '../../../services/user.services';
import { UsersType } from '../../../types';
import axios from 'axios';
import { checkEmptyError, handleFocusInput } from '../../../utils/global';
import { Link } from 'react-router-dom';
import {
    checkBirthDayError,
    checkEmailError,
    checkNameError,
    checkPasswordError,
    checkPhoneError,
} from '../../../utils/validation_user';
import { toast } from 'react-toastify';
type InputUser = {
    id: number;
    password: string;
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
    role_id: number;
};
export const Account = () => {
    let inputEmail: any;
    let inputPhone: any;
    let inputPassword: any;
    let inputBirthday: any;
    let inputName: any;
    let listInputText: any;
    let listInputDate: any;
    let listInputPassword: any;
    const [user, setUser] = useState<UsersType>({
        id: 0,
        passowrd: '',
        role: 1,
        active: true,
        us_name: '',
        email: '',
        phone_number: '',
        birthday: '',
        created_at: '',
        updated_at: '',
        province: '',
        district: '',
        ward: '',
        token: '',
    });
    const [inputUser, setInputUser] = useState<InputUser>({
        id: 0,
        password: '',
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
        role_id: 0,
    });

    const [provinces, setProvinces] = useState([{ id: 0, name: '' }]);

    const [districts, setDistricts] = useState([{ id: 0, name: '' }]);
    const [wards, setWards] = useState([{ id: 0, name: '' }]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const queryElement = () => {
            listInputText = document.querySelectorAll('.form-control input[type="text"]');
            listInputDate = document.querySelectorAll('.form-add input[type="date"]');
            listInputPassword = document.querySelectorAll('.form-add input[type="password"]');
            inputEmail = document.querySelector('#email');
            inputPhone = document.querySelector('#phonenumber');
            inputPassword = document.querySelector('#password');
            inputName = document.querySelector('#pro_name');
            inputBirthday = document.querySelector('#birthday');
        };
        queryElement();
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
        const setEventFocusInput = () => {
            handleFocusInput(listInputDate);
            handleFocusInput(listInputText);
            handleFocusInput(listInputPassword);
        };
        getProvinces();
        setEventFocusInput();
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
    useEffect(() => {
        async function getUser() {
            const accountLocal = await JSON.parse(localStorage.getItem('user') || '{}');
            if (accountLocal['id'] !== undefined) {
                try {
                    const res = await getUserById(accountLocal['id']);
                    setUser(res);
                    setInputUser({
                        id: res['id'],
                        password: res['password'],
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
                        role_id: res['role_id'],
                    });
                } catch (e) {
                    console.error(e);
                }
            }
        }
        getUser();
    }, []);

    useEffect(() => {
        const getProvinceUser = () => {
            if (user.id !== 0) {
                let province: any = provinces.find((item) => {
                    return item.name === user.province;
                });
                if (province !== undefined) {
                    getListDistrct(province.id);
                }
            }
        };
        getProvinceUser();
    }, [provinces.length]);
    useEffect(() => {
        const getDistrictUser = () => {
            if (districts.length > 0) {
                let district: any = districts.find((item) => {
                    return item.name === user.district;
                });
                if (district !== undefined) {
                    getWards(district.id);
                }
            }
        };
        getDistrictUser();
    }, [districts.length]);
    const handleUpdate = () => {
        const isInputTextEmpty = checkEmptyError(listInputText);
        const isInputDateEmpty = checkEmptyError(listInputDate);
        const isInputPasswordEmpty = checkEmptyError(listInputPassword);
        if (!isInputTextEmpty && !isInputDateEmpty && !isInputPasswordEmpty) {
            const isEmailError = checkEmailError(inputEmail);
            const isPhoneError = checkPhoneError(inputPhone);
            const isBirthDayError = checkBirthDayError(inputBirthday);
            const isPasswordError = checkPasswordError(inputPassword);
            const isNameError = checkNameError(inputName);
            if (!isEmailError && !isPhoneError && !isPasswordError && !isBirthDayError && !isNameError) {
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
                    created_at: inputUser.created_at,
                    province: province?.name === undefined ? user.province : province?.name,
                    district: district?.name === undefined ? user.district : district?.name,
                    ward: ward?.name == undefined ? user.ward : ward?.name,
                    token: '',
                };
                Update(data);
            }
        }
    };

    const Update = async (data: any) => {
        try {
            const res = await UpdateUser(data);
            if (res.status === 200) {
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
            } else {
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
                    <h1>Thông tin người dùng </h1>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <h3 className="title">Thông tin khách hàng</h3>
                            <div className="col-lg-6">
                                <input id="product_id" className="form-control" value={inputUser.id} hidden></input>
                                <div className="error_message" style={{ display: 'none' }}></div>

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
                                    <div className="form-group" style={{ position: 'relative' }}>
                                        <label htmlFor="password">Mật khẩu:</label>
                                        <input
                                            type={showPassword === true ? 'text' : 'password'}
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
                                        <i
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '5%',
                                                transform: 'translateY(50%)',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}
                                            className={
                                                showPassword === true ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'
                                            }
                                        ></i>
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

                                    <div className="form-group">
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
                                </div>
                            </div>

                            <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    type="button"
                                    style={{ width: '20%', padding: '10px 0px' }}
                                    name="cmd"
                                    className="btn btn-primary btn-add"
                                    onClick={() => handleUpdate()}
                                >
                                    Lưu lại
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
