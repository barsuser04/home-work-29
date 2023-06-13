import { axiosInstance } from "../config/axiosInstance";

export const addFoods = (data) => {
  return axiosInstance.post("/foods", data);
};
export const deletefoods = (payload) => {
  return axiosInstance.delete(`/foods/${payload}`);
};
export const editfoods = (payload) => {
  return axiosInstance.put(`/foods/${payload.id}`, payload);
};
