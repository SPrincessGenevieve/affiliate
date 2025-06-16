import api from "../axiosAuth";
import { UserRegistration } from "@/app/context/UserContext";

export const postLogin = (email: string, password: string) =>
  api.post("/api/v1/base/auth/login/", { email, password });

export const postRegistration = (data: UserRegistration) =>
  api.post("/api/v1/base/auth/registration", data);

export const postVerifyEmail = (key: string) =>
  api.post("/api/v1/base/auth/registration/account-confirm-email/", {key});

export const postUpdatePassword = (
  new_password1: string,
  new_password2: string
) =>
  api.post("/api/v1/base/auth/password/change", {
    new_password1,
    new_password2,
  });

export const postResetPassword = (email: string) =>
  api.post("/api/v1/base/auth/password/reset/", email);

export const postResetEmail = (email: string) =>
  api.post("/api/v1/base/auth/request-change-email", email);
