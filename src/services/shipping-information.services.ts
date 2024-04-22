import axios from 'axios';
import { apiClient } from '../constant/api';
export const getListPaymentType = async (): Promise<any> => {
    const res = await apiClient.get('/api-customer/PaymentType/getList');
    return res?.data;
};

export const getListShippingType = async (): Promise<any> => {
    const res = await apiClient.get('/api-customer/ShippingType/getList');
    return res?.data;
};
export const getAllProvinces = async (): Promise<any> => {
    const res = await axios.get('https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100');
    return res?.data;
};

export const getAllDistrict = async (id: any): Promise<any> => {
    const res = await axios.get(
        `https://vnprovinces.pythonanywhere.com/api/districts/?province_id=${id}&basic=true&limit=100`,
    );
    return res?.data;
};

export const getAllWard = async (id: any): Promise<any> => {
    const res = await axios.get(
        `https://vnprovinces.pythonanywhere.com/api/wards/?district_id=${id}&basic=true&limit=100`,
    );
    return res?.data;
};

export const CreateOrder = async (data: any): Promise<any> => {
    const res = await apiClient.post('/api-admin/Order/create', data);
    return res?.data;
};
