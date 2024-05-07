import { apiClient, config } from '../constant/api';

export const CreateOrder = async (data: any): Promise<any> => {
    const res = await apiClient.post('/api-admin/Order/create', data, config);
    return res?.data;
};

export const getTrackingOrder = async (id: number, option: string): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Order/GetByIdAndPhoneOrEmail?id=${id}&option=${option}`);
    return res?.data;
};

export const getTotalOrderToday = async (): Promise<any> => {
    const res = await apiClient.get(`/api-admin/Order/getTotalOrder`, config);
    return res?.data;
};
export const CountOrderYear = async (): Promise<any> => {
    const res = await apiClient.get(`/api-admin/Order/countOrderYear`, config);
    return res?.data;
};

export const GetListOrderWaitConfirmation = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/Order/getListOrderWaitConfirmation`, data, config);
    return res?.data;
};

export const GetOrderById = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Order/GetById?id=${id}`);
    return res?.data;
};

export const UpdateOrder = async (data: any): Promise<any> => {
    const res = await apiClient.put(`/api-admin/Order/update`, data, config);
    return res;
};

export const CancelOrder = async (id: any): Promise<any> => {
    const res = await apiClient.put(`/api-admin/Order/cancel?id=${id}`, config);
    return res;
};
export const RevenueStatistics = async (data: any): Promise<any> => {
    const res = await apiClient.post('/api-admin/Order/RevenueByMonth', data, config);
    return res;
};
