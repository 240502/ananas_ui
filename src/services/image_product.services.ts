import { apiClient, config } from '../constant/api';
export const getImageFeature = async (proId: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ImageGallery/getImageFeatureByProId?proId=` + proId);
    return res?.data;
};

export const upload = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/ImageGallery/Upload`, data, config);
    return res;
};
export const DeleteFile = async (code: any): Promise<any> => {
    const res = await apiClient.get(`/api-admin/ImageGallery/DeleteImage?code=${code}`, config);
    return res;
};

export const createImage = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/ImageGallery/Create`, data, config);
    return res;
};
