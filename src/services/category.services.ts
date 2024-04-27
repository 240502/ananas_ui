import { apiClient } from '../constant/api';
export const getCategories = async (): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductCategory/getAll`);
    return res?.data;
};
export const getList = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-customer/ProductCategory/getList`, data);
    return res?.data;
};
export const Create = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/ProductCategory/create`, data);
    return res;
};

export const Delete = async (id: any): Promise<any> => {
    const res = await apiClient.delete(`/api-admin/ProductCategory/delete?id=${id}`);
    return res;
};

export const Update = async (data: any): Promise<any> => {
    const res = await apiClient.put(`/api-admin/ProductCategory/update`, data);
    return res;
};
