import { apiClient } from '../constant/api';
export const getList = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-customer/Product/getList`, data);
    return res?.data;
};


export const searchProduct = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-customer/Product/Search`, data);
    return res?.data;
};


export const getProductById = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Product/product/getById?id=${id}`);
    return res?.data;
};


export const getProductCateById = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductCategory/getById?id=${id}`);
    return res?.data;
};


export const getRelatedProduct = async(data:any): Promise<any> => {
    const res = await apiClient.post(`/api-customer/Product/getRelatedProduct`,data);
    return res?.data;
};

