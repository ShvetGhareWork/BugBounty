import axios from "axios";

const API_URL = "http://localhost:5000/api/reports"; // adjust if needed

export const createReport = (reportData) => axios.post(API_URL, reportData);
export const getReports = () => axios.get(API_URL);
export const getReportById = (id) => axios.get(`${API_URL}/${id}`);
export const updateReport = (id, reportData) =>
  axios.put(`${API_URL}/${id}`, reportData);
export const deleteReport = (id) => axios.delete(`${API_URL}/${id}`);
