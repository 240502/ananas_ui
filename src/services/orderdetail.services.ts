import { apiClient, config } from '../constant/api';

export const createOrderDetail = async (data: any): Promise<any> => {
    const res = await apiClient.post('/api-admin/OrderDetail/create', data, config);
    return res;
};

export const updateOrderDetail = async (data: any): Promise<any> => {
    const res = await apiClient.post('/api-admin/OrderDetail/update', data, config);
    return res;
};

export const deleteOrderDetail = async (id: any): Promise<any> => {
    const res = await apiClient.delete(`/api-admin/OrderDetail/delete?id=${id}`, config);
    return res;
};
