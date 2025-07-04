"use client";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

export type UserRegistration = {
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  birth_date: string | null;
  phone_number: string;
  csrfToken: string;
};

export type UserProfile = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_picture: string | null;
  birth_date: string | null;
  level: {
    level: number | null;
    name: string;
  };
  csrfToken: string;
  commision_rate: number;
  next_payment: number;
  aum: number;
  commission_trend: [
    {
      value: number;
      date: string;
    }
  ];
  aum_growth: [
    {
      value: number;
      date: string;
    }
  ];
  user_referral_detail: {
    referral_code: string;
    referral_link: string;
    referral_clicks: number;
    user_invites: number;
    recent_referrals: [
      {
        user_id: number;
        first_name: string;
        last_name: string;
        deposit_amount: string;
        created_at: string;
      }
    ];
  };
};

export type UserUpdate = {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  profile_picture: string | null;
  birth_date: string | null;
  csrfToken: string;
};

export type MyReferralsTypes = {
  user_id: number;
  first_name: string;
  last_name: string;
  deposit_amount: string;
  last_logged_in: number | null;
  level: string;
  market_value: number | null;
  total_cases: number | null;
  cases_sold: number | null;
  realised_profit_loss: number | null;
  profit_loss_percentage: number | null;
  annual_commission_rate: number;
  rank: number;
};

export type AffiliateLeaderboardTypes = {
  id: number;
  affiliator: string;
  aum: number;
  rank: number;
  annual_commission_rate: number;
};

type UserContextType = {
  isOpen: boolean;
  isLoggedIn: boolean | null;
  sessionid: string;
  activeSettingsTab: string;
  user_profile: UserProfile;
  my_referrals: MyReferralsTypes[];
  affiliated_leaderboard: AffiliateLeaderboardTypes[];
  my_referrals_total_pages: number;
  my_referrals_current_page: number;
  setUserDetails: (details: Partial<UserContextType>) => void;
};

const defaultUserContext: UserContextType = {
  isOpen: true,
  isLoggedIn: null,
  sessionid: "",
  activeSettingsTab: "",
  user_profile: {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    birth_date: null,
    level: {
      level: null,
      name: "",
    },
    profile_picture: null,
    csrfToken: "",
    commision_rate: 0,
    next_payment: 0,
    aum: 0,
    commission_trend: [
      {
        value: 0,
        date: "",
      },
    ],
    aum_growth: [
      {
        value: 0,
        date: "",
      },
    ],
    user_referral_detail: {
      referral_code: "",
      referral_link: "",
      referral_clicks: 0,
      user_invites: 0,
      recent_referrals: [
        {
          user_id: 0,
          first_name: "",
          last_name: "",
          deposit_amount: "",
          created_at: "",
        },
      ],
    },
  },
  my_referrals: [],
  my_referrals_total_pages: 1,
  my_referrals_current_page: 1,
  affiliated_leaderboard: [],
  setUserDetails: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetailsState] = useState<UserContextType>(() => {
    if (typeof window !== "undefined") {
      const savedUserData = localStorage.getItem("userDetails");
      return savedUserData
        ? { ...defaultUserContext, ...JSON.parse(savedUserData) }
        : defaultUserContext;
    }
    return defaultUserContext;
  });

  useEffect(() => {
    const savedUserData = JSON.parse(
      localStorage.getItem("userDetails") || "{}"
    );
    setUserDetailsState((prev) => ({ ...prev, ...savedUserData }));
  }, []);

  const setUserDetails = (details: Partial<UserContextType>) => {
    const updatedUserDetails = { ...userDetails, ...details };

    // Check if the details have actually changed before updating
    if (JSON.stringify(updatedUserDetails) !== JSON.stringify(userDetails)) {
      setUserDetailsState(updatedUserDetails as UserContextType);
      localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
    }
  };

  return (
    <UserContext.Provider value={{ ...userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
