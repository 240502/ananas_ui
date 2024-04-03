import { promises } from 'fs';
import { apiClient } from '../constant/api';
export const getMenus = async (): Promise<any> => {
    const res = await apiClient.get(`/api-customer/Menu/getAll`);
    return res?.data;
};
export const getGroupSubMenu = async (): Promise<any> => {
    const res = await apiClient.get(`/api-customer/GroupMenu/getAll`);
    return res?.data;
};
export const getTitleSubMenu = async (): Promise<any> => {
    const res = await apiClient.get(`/api-customer/TitleSubMenu/getAll`);
    return res?.data;
};

export const getCategory = async ():Promise<any> => {
    const res = await apiClient.get(`/api-customer/ProductCategory/getShowMenu`);
    return res?.data;
};

export const getStyle = async ():Promise<any> => {
    const res = await apiClient.get(`/api-customer/Style/getShowMenu`);
    return res?.data;
};