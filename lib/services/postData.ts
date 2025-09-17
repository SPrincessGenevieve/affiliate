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
    "/api/affiliate/commission-rate-calculator",
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

export const postInvite = (
  sessionKey: string,
  client_name: string,
  email_address: string,
) =>
  api.post(
    "/api/affiliate/invite-user",
    {
      name: client_name,
      email: email_address,
    },
    {
      headers: {
        Authorization: "Token " + sessionKey,
      },
    }
  );
