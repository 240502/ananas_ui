import { apiClient, config } from '../constant/api';
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

export const getProductByCateId = async (id: any): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Product/getByCateId?cateId=${id}`);
    return res?.data;
};

export const getRelatedProduct = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-customer/Product/getRelatedProduct`, data);
    return res?.data;
};

export const create = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/Product/create`, data, config);
    return res?.data;
};

export const Delete = async (id: any): Promise<any> => {
    const res = await apiClient.delete(`/api-admin/Product/delete?id=${id}`, config);
    return res;
};

export const update = async (data: any): Promise<any> => {
    const res = await apiClient.put(`/api-admin/Product/update`, data, config);
    return res;
};

export const getTop5ProductBestSale = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/Product/getTop5ProductBestSale`, data, config);
    return res?.data;
};
