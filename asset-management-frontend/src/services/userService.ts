import axios from "../api/axios";

export const userService = {
  getProfile: (id: number) => axios.get(`/employees/${id}`),

  getMyProducts: () => axios.get("/products/my-products"),

  getMyTransactions: (employeeId: number) =>
    axios.get(`/transactions/by-employee/${employeeId}`),
};
