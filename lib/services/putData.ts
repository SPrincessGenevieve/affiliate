import api from "../axiosAuth";

export const putConfirmPassword = (email: string) =>
  api.put("/api/v1/base/auth/login/", email);
