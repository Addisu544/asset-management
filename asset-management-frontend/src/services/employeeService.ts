import axios from "../api/axios";

export const employeeService = {
  getAll: () => axios.get("/Employees"),

  getById: (id: number) => axios.get(`/Employees/${id}`),

  create: (data: any) => axios.post("/Employees", data),

  update: (id: number, data: any) => axios.put(`/Employees/${id}`, data),

  // changeStatus: (id: number) => axios.patch(`/Employees/${id}/status`),
  // changeStatus: (id: number) =>
  //   axios.patch(`/Employees/${id}/status`, { status: "Inactive" }),
  changeStatus: (id: number, data: { status: string }) =>
    axios.patch(`/Employees/${id}/status`, data),
};
