import axios from "../api/axios";

export const assetTypeService = {
  getAll: () => axios.get("/AssetTypes"),

  create: (data: any) => axios.post("/AssetTypes", data),

  update: (id: number, data: any) => axios.put(`/AssetTypes/${id}`, data),

  delete: (id: number) => axios.delete(`/AssetTypes/${id}`),
};
