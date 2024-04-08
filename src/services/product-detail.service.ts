import { apiClient } from '../constant/api';
export const getProductById = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Product/product/getById?id=${id}`);
    return res?.data;
};


export const getProductCateById = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductCategory/getById?id=${id}`);
    return res?.data;
};



export const getStyleById = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Style/getById?id=${id}`);
    return res?.data;
};

export const getListSizeByProId = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductDetail/getByProId?id=${id}`);
    return res?.data;
};
export const getProDetailByProIdAndSize = async(id: any,size :any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductDetail/getByProIdAndSize?id=${id}&size=${size}`);
    return res?.data;
};
export const getProductStatus = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductStatus/getById?id=${id}`);
    return res?.data;
};

export const getColor = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Color/getById?id=${id}`);
    return res?.data;
};
