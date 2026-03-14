import axios from "../api/axios";

export const departmentService = {
  getAll: () => axios.get("/Departments"),

  create: (data: any) => axios.post("/Departments", data),

  update: (id: number, data: any) => axios.put(`/Departments/${id}`, data),

  delete: (id: number) => axios.delete(`/Departments/${id}`),
};
