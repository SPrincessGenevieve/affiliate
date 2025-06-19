import api from "../axiosAuth";
import { UserRegistration } from "@/app/context/UserContext";

export const postLogin = (email: string, password: string, csrfToken: string) =>
  api.post(
    "/api/v1/base/auth/login",
    { email, password },
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    }
  );

export const postRegistration = (data: UserRegistration) =>
  api.post("/api/v1/base/auth/registration", data, {
    headers: {
      "X-CSRFToken": data.csrfToken,
    },
    withCredentials: true,
  });

export const postVerifyEmail = (key: string, csrfToken: string) =>
  api.post(
    "/api/v1/base/auth/registration/account-confirm-email",
    { key },
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    }
  );

export const postChangePassword = (
  new_password1: string,
  new_password2: string,
  csrfToken: string
) =>
  api.post(
    "/api/v1/base/auth/password/change",
    {
      new_password1,
      new_password2,
    },
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    }
  );

export const postResetPassword = (email: string, csrfToken: string) =>
  api.post(
    "/api/v1/base/auth/password/reset",
    { email },
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    }
  );

export const postConfirmResetPassword = (
  new_password1: string,
  new_password2: string,
  csrfToken: string,
  uid: string,
  token: string
) =>
  api.post(
    "/api/v1/base/auth/password/reset/confirm",
    {
      new_password1,
      new_password2,
      uid,
      token,
    },
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    }
  );

export const postResetEmail = (email: string, csrfToken: string) =>
  api.post("/api/v1/base/auth/request-change-email", email, {
    headers: {
      "X-CSRFToken": csrfToken,
    },
    withCredentials: true,
  });
