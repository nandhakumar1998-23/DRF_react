import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/";

export const register = async (userData) => {
    return axios.post(`${API_URL}register/`, userData);
};

export const login = async (userData) => {
    return axios.post(`${API_URL}login/`, userData);
};

export const getHomeData = async (token) => {
    return axios.get(`${API_URL}home/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
