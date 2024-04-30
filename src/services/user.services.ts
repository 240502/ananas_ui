import { apiClient } from '../constant/api';

export const CreateUser = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/Users/create`, data);
    return res;
};

export const getListUsers = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/Users/getList`, data);
    return res?.data;
};
export const UpdateUser = async (data: any): Promise<any> => {
    const res = await apiClient.put(`/api-admin/Users/update  `, data);
    return res;
};

export const Delete = async (id: any): Promise<any> => {
    const res = await apiClient.delete(`/api-admin/Users/delete?id=${id}`);
    return res;
};
export const getUserById = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-admin/Users/getById?id=${id}`);
    return res?.data;
};

export const getTotalUser = async (): Promise<any> => {
    const res = await apiClient.get(`/api-admin/Users/getTotalUser`);
    return res?.data;
};
