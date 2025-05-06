import axios from "axios";

export const apiUrl = (path) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!BASE_URL) {
    alert("AMBIENTE MAL CONFIGURADO, CONTACTE A SOPORTE DE TI");
  }

  return `${BASE_URL}${path}`;
};

export const apiRequest = async (method, path, data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method,
      url: apiUrl(path),
      data: method !== "GET" ? data : undefined,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const getEnv = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) {
    return env;
  }
  alert("AMBIENTE MAL CONFIGURADO, CONTACTE A SOPORTE DE TI");
};
