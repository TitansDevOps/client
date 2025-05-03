import { apiGet } from "@/utils/api";

export const fetchPetsTypes = async (page = 1, limit = 10) => {
    try {
        const response = await apiGet(
            `/pets-types?page=${page}&limit=${limit}`,
        );
        return response.data.body;
    } catch (error) {
        return [];
    }
};
