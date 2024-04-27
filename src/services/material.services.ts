import { apiClient } from '../constant/api';
export const getAllMaterial = async (): Promise<any> => {
    const res = await apiClient.get('/api-admin/Material/getAll');
    return res?.data;
};
