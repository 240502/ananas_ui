import { apiClient } from '../constant/api';
export const getImageFeature = async (proId: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ImageGallery/getImageFeatureByProId?proId=` + proId);
    return res?.data;
};