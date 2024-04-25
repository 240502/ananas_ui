import { apiClient } from '../constant/api';
export const getListPaymentType = async (): Promise<any> => {
    const res = await apiClient.get('/api-customer/PaymentType/getList');
    return res?.data;
};

