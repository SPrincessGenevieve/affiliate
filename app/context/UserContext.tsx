"use client";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

export interface NetworkNode {
  id: number;
  full_name: string;
  level: number;
  direct_assets: number;
  network_assets: number;
  direct_refferals: number;
  montly_commission: number;
  profile_picture?: string; // optional if you want to support it later
  children: NetworkNode[];
}

export interface RecentReferal {
  full_name: string;
  market_value: number;
  created_at: string;
}

// Define the entire "detail" object
export interface NetworkUserDetail {
  first_name: string;
  last_name: string;
  email: string;
  current_level: number;
  birth_date: string | null;
  profile_picture: string | null;
  phone_number: string;
  referral_total_clicks: number;
  recent_user_referrals: RecentReferal[]; // or a more specific type if you know it
  commision_rate: number;
  next_payment: number;
  total_commission: number;
  total_commission_yearly: number;
  due_date: string;
  total_clients: number;
  total_clients_month: number;
  total_monthly_aum: number;
  network_tree: NetworkNode;
}

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

export type Leaderboard = {
  id: number;
  affiliator: string;
  aum: number;
  rank: number;
  annual_commission_rate: number;
};

export type NextTier = {
  next_level: string;
  next_tier_to_go: number;
  is_max_tier: boolean;
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
  recent_user_referrals: [
    {
      full_name: string;
      market_value: number;
      created_at: string;
    }
  ];
  commision_rate: number;
  next_payment: number;
  total_commission: number;
  total_commission_yearly: number;
  due_date: string;
  total_clients: number;
  total_clients_month: number;
  total_monthly_aum: number;
  leaderboard: Leaderboard[];
  next_tier: NextTier;
  // total_aum: 0,
  // total_aum_yearly: 0,
  // estimated_next_payment: 0,
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
  market_value: number[];
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
  profit_lost_by_percent: number;
  monthly_commission: number;
  monthly_aum: number;
  estimated_annual_commission: number;
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

export type InviteUserResult = {
  name: string;
  email: string;
  phone: string;
  status: string;
  expires_at: string;
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
  invite_users: InviteUserResult[];
  invite_user_current_page: number;
  invite_user_total_pages: number;
  network_details: NetworkUserDetail | null;
  selectedNode: any | null;
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
    current_level: 1,
    levels_list: [],
    birth_date: null,
    profile_picture: null,
    phone_number: "",
    referral_code: "",
    referral_link: "",
    referral_total_clicks: 0,
    recent_user_referrals: [
      {
        full_name: "",
        market_value: 0,
        created_at: "",
      },
    ],
    commision_rate: 0,
    next_payment: 0,
    total_commission: 0,
    total_commission_yearly: 0,
    due_date: "",
    total_clients: 0,
    total_clients_month: 0,
    total_monthly_aum: 0.0,
    leaderboard: [],
    next_tier: {
      next_level: "",
      next_tier_to_go: 0,
      is_max_tier: false,
    },
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
  invite_users: [],
  invite_user_current_page: 1,
  invite_user_total_pages: 1,
  network_details: null,
  selectedNode: null,
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
