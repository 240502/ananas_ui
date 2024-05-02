import { apiClient } from '../constant/api';
export const GetAll = async () => {
    const res = await apiClient.get('/api-admin/StatusOrder/getAll');
    return res?.data;
};
