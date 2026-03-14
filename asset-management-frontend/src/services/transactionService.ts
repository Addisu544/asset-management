import axios from "../api/axios";

export const transactionService = {
  getAll: () => axios.get("/transactions"),

  issueProduct: (data: any) => axios.post("/transactions/issue", data),

  returnProduct: (data: any) => axios.post("/transactions/return", data),
};
