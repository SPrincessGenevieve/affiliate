import { UserUpdate } from "@/app/context/UserContext";
import api from "../axiosAuth";

export const patchUser = (data: UserUpdate) =>
  api.patch("/api/v1/base/user", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

export const patchProfilePic = (formData: FormData, csrfToken: string) =>
  api.patch("/api/v1/base/user", formData, {
    headers: {
      "X-CSRFToken": csrfToken,
    },
    withCredentials: true,
  });
