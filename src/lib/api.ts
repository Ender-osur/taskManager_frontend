import axios from 'axios';
import type { Task } from '../types';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string, name: string) => {
  const response = await api.post('/register', { email, password, name });
  return response.data;
};

export const getTasks = async (filter?: string) => {
  const response = await api.get('/task', { params: { filter } });
  return response.data;
};

export const getOneTask = async (id: string) => {
  const response = await api.get(`/task/${id}`);
  return response.data;
};

export const createTask = async (title: string) => {
  const response = await api.post('/task', { title });
  return response.data;
};

export const updateTask = async (id: string, data: Partial<Task>) => {
  const response = await api.put(`/task/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/task/${id}`);
};