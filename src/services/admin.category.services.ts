import { apiClient } from "../constant/api";

export const getList = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-customer/ProductCategory/getList`, data);
    return res?.data;
};
export const Create = async (data: any): Promise<any> => {
    const res = await apiClient.post(`/api-admin/ProductCategory/create`, data);
    return res;
}