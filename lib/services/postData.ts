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

export const postCalculate = (
  investment_amount: number,
  commission_rate: number,
  investment_term: number,
  sessionKey: string
) =>
  api.post(
    "/api/affiliate/commision-rate-calculator",
    {
      investment_amount: investment_amount,
      commission_rate: commission_rate,
      investment_term: investment_term,
    },
    {
      headers: {
        Authorization: "Token " + sessionKey,
      },
    }
  );
