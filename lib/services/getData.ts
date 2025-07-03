import api from "../axiosAuth";

export const getCSRF = () => api.get("/api/v1/base/csrf");
export const getUser = () => api.get("/api/v1/base/user");
export const getMyReferrals = (page: number) =>
  api.get(`/api/v1/affiliate/my-referrals?page=${page}`);
export const getLeaderboard = () => api.get("/api/v1/affiliate/leaderboard");
