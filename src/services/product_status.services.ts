import { apiClient } from '../constant/api';
export const getProductStatus = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductStatus/getById?id=${id}`);
    return res?.data;
};
export const getAllProductStatus = async (): Promise<any> => {
    const res = await apiClient.get('/api-customer/ProductStatus/getAll');
    return res?.data;
};
