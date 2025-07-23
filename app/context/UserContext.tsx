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
  level: {
    level: number | null;
    name: string;
  };
  birth_date: string | null;
  profile_picture: string | null;
  phone_number: string;
  referral_code: string;
  referral_link: string;
  referral_total_clicks: number;
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
};

export type UserUpdate = {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  profile_picture: string | null;
  birth_date: string | null;
};

export type RecentReferralsTypes = {
  deposit_amount: number[];
  full_name: string;
  created_at: string
};

export type MyReferralsTypes = {
  full_name: string;
  last_login: string;
  level: string;
  market_value: number;
  total_cases: number;
  cases_sold: number;
  realised_profit_loss: number;
  profit_loss: number;
  monthly_aum: number;
  estimated_annual_aum: number;
  rank: number;
};

export type AffiliateLeaderboardTypes = {
  id: number;
  affiliator: string;
  aum: number;
  rank: number;
  annual_commission_rate: number;
};

export type EventTypes = {
  pk: number;
  name: string;
  date: string;
  status: string;
  limit: number;
  total_participants: number;
  guests: [
    {
      id: number;
      user: number;
      participants: number;
    }
  ];
};

type UserContextType = {
  isOpen: boolean;
  sessionkey: string;
  isLoggedIn: boolean | null;
  sessionid: string;
  activeSettingsTab: string;
  user_profile: UserProfile;
  my_referrals: MyReferralsTypes[];
  recent_referrals: RecentReferralsTypes[];
  affiliated_leaderboard: AffiliateLeaderboardTypes[];
  my_referrals_total_pages: number;
  my_referrals_current_page: number;
  events: EventTypes[];
  setUserDetails: (details: Partial<UserContextType>) => void;
};

const defaultUserContext: UserContextType = {
  isOpen: true,
  isLoggedIn: null,
  sessionkey: "",
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
    commision_rate: 0,
    next_payment: 0,
    aum: 0,
    referral_code: "",
    referral_link: "",
    referral_total_clicks: 0,
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
  },
  my_referrals: [],
  recent_referrals: [],
  my_referrals_total_pages: 1,
  my_referrals_current_page: 1,
  affiliated_leaderboard: [],
  events: [],
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
