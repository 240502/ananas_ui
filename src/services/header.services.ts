import { promises } from 'fs';
import { apiClient } from '../constant/api';
export const getMenus = async (): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Menu/getAll`);
    return res?.data;
};
