import axios from "../api/axios";

export const productService = {
  getAll: () => axios.get("/Products"),

  getById: (id: number) => axios.get(`/Products/${id}`),

  create: (data: any) => axios.post("/Products", data),

  update: (id: number, data: any) => axios.put(`/Products/${id}`, data),

  delete: (id: number) => axios.delete(`/Products/${id}`),
};
