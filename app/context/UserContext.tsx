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
  level: string;
  csrfToken: string;
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


type UserContextType = {
  isOpen: boolean;
  isLoggedIn: boolean | null;
  sessionid: string;
  activeSettingsTab: string;
  user_profile: UserProfile;
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
    level: "",
    profile_picture: null,
    csrfToken: "",
  },
  setUserDetails: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetailsState] =
    useState<UserContextType>(defaultUserContext);

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
