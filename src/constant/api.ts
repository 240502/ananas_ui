import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://localhost:7006',
    timeout: 1000 * 60 * 30 * 3,
});
export const hostServerAdmin = 'https://localhost:7226';
const user = JSON.parse(localStorage.getItem('user') || '');

export const token = user['token'];
export const config = { headers: { Authorization: 'Bearer ' + token } };
