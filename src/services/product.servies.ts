import { apiClient } from '../constant/api';
export const getList = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-customer/Product/getList`, data);
    return res?.data;
};
export const getProductPrice = async (proId: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductPrice/getPriceByProId?proId=` + proId);
    return res?.data;
};
export const getImageFeature = async (proId: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ImageGallary/getImageFeatureByProId?proId=` + proId);
    return res?.data;
};
export const getProductStatus = async (id: number): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductStatus/getById?id=${id}`);
    return res?.data;
};

export const getColor = async (id: number): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Color/getById?id=${id}`);
    return res?.data;
};
