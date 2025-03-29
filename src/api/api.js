import axios from "axios";

const BASE_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
  return axios.post(`${BASE_URL}/login`, { email, password });
};

export const fetchUsers = async (page) => {
  return axios.get(`${BASE_URL}/users?page=${page}`);
};

export const updateUser = async (id, userData) => {
  return axios.put(`${BASE_URL}/users/${id}`, userData);
};

export const deleteUser = async (id) => {
  return axios.delete(`${BASE_URL}/users/${id}`);
};
