import { apiClient } from '../constant/api';
export const login = async ( data: any): Promise<any> => {
    const res = await apiClient.post(`/api-customer/Users/Login`, data);
    return res?.data;
};
