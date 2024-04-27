import { apiClient } from '../constant/api';
export const getProDetailByProIdAndSize = async (id: any, size: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductDetail/getByProIdAndSize?id=${id}&size=${size}`);
    return res?.data;
};

export const getListSizeByProId = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductDetail/getByProId?id=${id}`);
    return res?.data;
};
export const createProductDetail = async (data: any): Promise<any> => {
    const res = await apiClient.post('/api-admin/ProductDetail/create', data);
    return res;
};
