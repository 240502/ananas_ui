import { apiClient } from '../constant/api';
export const searchProduct = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-customer/Product/Search`, data);
    return res?.data;
};
