import { apiClient, config } from '../constant/api';

export const CreateUser = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/Users/create`, data, config);
    return res;
};

export const getListUsers = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/Users/getList`, data, config);
    return res?.data;
};
export const UpdateUser = async (data: any): Promise<any> => {
    const res = await apiClient.put(`/api-admin/Users/update  `, data, config);
    return res;
};

export const Delete = async (id: any): Promise<any> => {
    const res = await apiClient.delete(`/api-admin/Users/delete?id=${id}`, config);
    return res;
};
export const getUserById = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-admin/Users/getById?id=${id}`, config);
    return res?.data;
};

export const getTotalUser = async (): Promise<any> => {
    const res = await apiClient.get(`/api-admin/Users/getTotalUser`, config);
    return res?.data;
};

export const searchUser = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/Users/searchUser`, data, config);
    return res?.data;
};

export const searchCustomer = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/Users/searchCustomer`, data, config);
    return res?.data;
};
