import { apiClient } from '../constant/api';

export const getRoleById = async (id: any) => {
    const res = await apiClient.get(`/api-admin/Role/getById?id=${id}`);

    return res?.data;
};
