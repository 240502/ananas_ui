import { apiClient } from '../constant/api';

export const CreateOrder = async (data: any): Promise<any> => {
    const res = await apiClient.post('/api-admin/Order/create', data);
    return res?.data;
};

export const getTrackingOrder = async (id: number, option: string): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Order/GetByIdAndPhoneOrEmail?id=${id}&option=${option}`);
    return res?.data;
};
