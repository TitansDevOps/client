import { apiGet } from "@/utils/api";

export const fetchPets = async (page = 1, limit = 10) => {
  try {
    const response = await apiGet(`/pets?page=${page}&limit=${limit}`);
    return response.data.body;
  } catch (error) {
    return [];
  }
};
