import api from "../axiosAuth";

export const putConfirmPassword = (email: string) =>
  api.put("/api/v1/base/auth/login", email);


export const putConfirmEmailChange = (email_reset_code: string, new_email: string, csrfToken: string) =>
  api.put(
    "/api/v1/base/auth/confirm-change-email",
    { email_reset_code, new_email },
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    }
  );
