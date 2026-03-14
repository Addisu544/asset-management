import axios from "../api/axios";

export const assetGroupService = {
  getAll: () => axios.get("/AssetGroups"),

  create: (data: any) => axios.post("/AssetGroups", data),

  update: (id: number, data: any) => axios.put(`/AssetGroups/${id}`, data),

  delete: (id: number) => axios.delete(`/AssetGroups/${id}`),
};
