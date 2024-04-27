import { apiClient } from '../constant/api';

export const getStyleById = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Style/getById?id=${id}`);
    return res?.data;
};

export const getAllStyle = async (): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Style/getAll`);
    return res?.data;
};
