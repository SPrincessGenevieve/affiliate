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
};

type UserContextType = {
  isOpen: boolean;
  isLoggedIn: boolean;
  sessionid: string;
  activeSettingsTab: string;
  setUserDetails: (details: Partial<UserContextType>) => void;
};

const defaultUserContext: UserContextType = {
  isOpen: true,
  isLoggedIn: false,
  sessionid: "",
  activeSettingsTab: "",
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
