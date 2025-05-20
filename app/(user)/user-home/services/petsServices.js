import { apiGet } from "@/utils/api";

export const getPets = async () => {
  const response = await apiGet("/pets");
  return response.data.body;
};

export const getPetById = async (id) => {
  const response = await apiGet("/pets/" + id);
  return response.data.body;
};