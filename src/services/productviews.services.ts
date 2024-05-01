import { apiClient, config } from '../constant/api';
export const createProductViews = async (data: any): Promise<any> => {
    const res = await apiClient.post('/api-admin/ProductViews/create', data);
    return res;
};

export const getTotalView = async (): Promise<any> => {
    const res = await apiClient.get('/api-admin/ProductViews/getTotalView', config);
    return res?.data;
};
