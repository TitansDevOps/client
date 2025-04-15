import { apiGet } from "@/utils/api";

export const fetchCenters = async (page = 1, limit = 10) => {
  try {
    const response = await apiGet(
      `/adoption-centers?page=${page}&limit=${limit}`,
    );
    return response.data.body;
  } catch (error) {
    console.error("Error fetching centers:", error);
    return [];
  }
};
