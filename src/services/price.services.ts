import { apiClient } from '../constant/api';
export const getProductPrice = async (proId: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductPrice/getPriceByProId?proId=` + proId);
    return res?.data;
};
export const createProductPrice = async (data: any): Promise<any> => {
    const res = await apiClient.post('/api-admin/ProductPrice/create', data);
    return res;
};
