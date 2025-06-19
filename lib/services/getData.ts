import api from "../axiosAuth";

export const getCSRF = () => api.get("/api/v1/base/csrf");
export const getUser = () => api.get("/api/v1/base/user");
