import api from "../axiosAuth";

export const postLogin = (email: string, password: string) =>
  api.post(
    "/auth/sign-in/",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
