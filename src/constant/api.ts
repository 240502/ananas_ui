import axios from 'axios';
export const apiClient = axios.create({
    baseURL: 'https://localhost:7006',
    timeout: 1000 * 60 * 30 * 3,
});
export const hostServerAdmin = 'https://localhost:7226';
const user = JSON.parse(localStorage.getItem('user') ?? '{}');

export const token = user ? user['token'] : '';
export const config = { headers: { Authorization: 'Bearer ' + token } };
export const urlApiGetAllProvince = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province';
export const urlApiGetDistrictByProvinceId = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/district';
export const urlApiGetWardByProvinceId = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id';
export const tokenGHN = { headers: { token: 'e545ea4e-2347-11ef-b3d7-824e1db0c320' } };
