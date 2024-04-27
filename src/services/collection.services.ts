import { apiClient } from '../constant/api';
export const getAllCollection = async (): Promise<any> => {
    const res = await apiClient.get('/api-customer/ProductCollection/getAll');
    return res?.data;
};
