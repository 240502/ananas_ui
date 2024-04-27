import { apiClient } from '../constant/api';

export const getColor = async (id: number): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Color/getById?id=${id}`);
    return res?.data;
};

export const getAllColor = async (): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Color/getAll`);
    return res?.data;
};
