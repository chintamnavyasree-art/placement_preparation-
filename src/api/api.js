import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });

// ── Drives ─────────────────────────────────────────────────
export const getDrives       = ()       => api.get('/drives');
export const createDrive     = (data)   => api.post('/drives', data);
export const updateDrive     = (id, d)  => api.put(`/drives/${id}`, d);
export const deleteDrive     = (id)     => api.delete(`/drives/${id}`);

// ── Topics ─────────────────────────────────────────────────
export const getTopics       = ()       => api.get('/topics');
export const createTopic     = (data)   => api.post('/topics', data);
export const updateTopic     = (id, d)  => api.put(`/topics/${id}`, d);
export const deleteTopic     = (id)     => api.delete(`/topics/${id}`);

// ── Coding ─────────────────────────────────────────────────
export const getCoding       = ()       => api.get('/coding');
export const createCoding    = (data)   => api.post('/coding', data);
export const updateCoding    = (id, d)  => api.put(`/coding/${id}`, d);
export const deleteCoding    = (id)     => api.delete(`/coding/${id}`);

// ── Notes ──────────────────────────────────────────────────
export const getNotes        = (cat)    => api.get('/notes', { params: cat ? { category: cat } : {} });
export const createNote      = (data)   => api.post('/notes', data);
export const deleteNote      = (id)     => api.delete(`/notes/${id}`);
