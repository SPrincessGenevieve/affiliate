"use client";
import api from "../axiosAuth";

export const getUser = (sessionKey: string) => {
  return api.get("/api/affiliate/affiliate-detail", {
    headers: {
      Authorization: "Token " + sessionKey,
    },
  });
};
export const getMyReferrals = (page: number, sessionKey: string) =>
  api.get(`/api/affiliate/my-referral?page=${page}`, {
    headers: {
      Authorization: "Token " + sessionKey,
    },
  });

export const getMyReferralsFiilter = (
  sessionKey: string,
  activeFilter: string,
  isInput: boolean
) => {
  return isInput
    ? api.get(`/api/affiliate/my-referral?client=${activeFilter}`, {
        headers: {
          Authorization: "Token " + sessionKey,
        },
      })
    : api.get(`/api/affiliate/my-referral?ordering=${activeFilter}`, {
        headers: {
          Authorization: "Token " + sessionKey,
        },
      });
};

export const getEvents = (sessionKey: string) =>
  api.get(`/user/events`, {
    headers: {
      Authorization: "Token " + sessionKey,
    },
  });

export const getLeaderboard = (sessionKey: string) =>
  api.get("/api/affiliate/leaderboard", {
    headers: {
      Authorization: "Token " + sessionKey,
    },
  });

export const getAUMGrowth = (sessionKey: string) =>
  api.get("/api/affiliate/aum-growth", {
    headers: {
      Authorization: "Token " + sessionKey,
    },
  });

export const getClientGrowth = (sessionKey: string) =>
  api.get("/api/affiliate/client-growth", {
    headers: {
      Authorization: "Token " + sessionKey,
    },
  });
