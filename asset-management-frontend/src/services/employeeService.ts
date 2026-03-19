import axios from "../api/axios";

export const employeeService = {
  getAll: () => axios.get("/Employees"),

  getById: (id: number) => axios.get(`/Employees/${id}`),

  // create: (data: any) => axios.post("/Employees", data),

  // update: (id: number, data: any) => axios.put(`/Employees/${id}`, data),

  create: (data: FormData) =>
    axios.post("/Employees", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id: number, data: FormData) =>
    axios.put(`/Employees/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  changeStatus: (id: number, data: { status: string }) =>
    axios.patch(`/Employees/${id}/status`, data),
};
