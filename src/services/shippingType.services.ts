import { apiClient } from '../constant/api';

export const getListShippingType = async (): Promise<any> => {
    const res = await apiClient.get('/api-customer/ShippingType/getList');
    return res?.data;
};

export const getShippingTypeById = async (id: number): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ShippingType/getById?id=${id}`);
    return res?.data;
};
