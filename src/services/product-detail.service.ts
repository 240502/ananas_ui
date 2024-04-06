import { apiClient } from '../constant/api';
export const getProductById = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Product/product/getById?id=${id}`);
    return res?.data;
};
