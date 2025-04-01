import axios from "axios";

export const apiUrl = (path) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!BASE_URL) {
    throw new Error("Falta la variable de entorno: NEXT_PUBLIC_API_URL");
  }

  return `${BASE_URL}${path}`;
};

export const apiRequest = async (method, path, data) => {
  try {
    const response = await axios({
      method,
      url: apiUrl(path),
      data: method !== "GET" ? data : undefined,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(
      `Error en ${method} ${path}:`,
      error?.response?.status || "?",
      error?.response?.data || "Sin detalles",
    );
    return {
      status: error?.response?.status || 500,
      data: error?.response?.data || { message: "Error desconocido en la API" },
    };
  }
};

export const apiGet = async (path) => apiRequest("GET", path);
export const apiPost = async (path, data) => apiRequest("POST", path, data);
export const apiPut = async (path, data) => apiRequest("PUT", path, data);
export const apiDelete = async (path) => apiRequest("DELETE", path);
