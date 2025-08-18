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

export type Level = {
  id: 1;
  level: number;
  name: string;
  description: string;
  fee: string;
  min_price: string;
  max_price: string;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
};

export type UserProfile = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  current_level: number;
  levels_list: Level[];
  birth_date: string | null;
  profile_picture: string | null;
  phone_number: string;
  referral_code: string;
  referral_link: string;
  referral_total_clicks: number;
  commision_rate: number;
  next_payment: number;
  // total_aum: 0,
  // total_aum_yearly: 0,
  // estimated_next_payment: 0,
  due_date: string;
  total_clients: number;
  total_clients_month: number;
  recent_user_referrals: [];
  total_commission: number;
  total_commission_yearly: number;
  total_monthly_aum: number;
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
  created_at: string;
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
  monthly_commission: number;
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
  activeFilter: string;
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
  client_growth: [
    {
      total_clients: number;
      created_at: string;
    }
  ];
  aum_growth: [
    {
      total_aum: number;
      created_at: string;
    }
  ];
  commission_growth: [
    {
      total_commission: string;
      created_at: string;
    }
  ];
  setUserDetails: (details: Partial<UserContextType>) => void;
};

const defaultUserContext: UserContextType = {
  activeFilter: "",
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
    current_level: 1,
    levels_list: [],
    profile_picture: null,
    commision_rate: 0,
    next_payment: 0,
    referral_code: "",
    referral_link: "",
    referral_total_clicks: 0,
    // total_aum: 0,
    // total_aum_yearly: 0,
    // estimated_next_payment: 0,
    due_date: "",
    total_clients: 0,
    total_clients_month: 0,
    recent_user_referrals: [],
    total_commission: 0,
    total_commission_yearly: 0,
    total_monthly_aum: 0.0,
  },
  my_referrals: [],
  recent_referrals: [],
  my_referrals_total_pages: 1,
  my_referrals_current_page: 1,
  affiliated_leaderboard: [],
  events: [],
  client_growth: [
    {
      total_clients: 0,
      created_at: "",
    },
  ],
  aum_growth: [
    {
      total_aum: 0,
      created_at: "",
    },
  ],
  commission_growth: [
    {
      total_commission: "",
      created_at: "",
    },
  ],
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
