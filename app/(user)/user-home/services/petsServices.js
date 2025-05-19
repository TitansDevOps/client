import { apiGet } from "@/utils/api";

export const getPets = async () => {
  const response = await apiGet("/pets");
  return response.data.body;
};