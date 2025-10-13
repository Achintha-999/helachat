import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
  userId: string | null;
  isLoading: boolean;
  signUp: (id: string) => Promise<void>;
  signOut: () => Promise<void>;
  setAuth: (id: string | null) => void;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const USER_ID_KEY = "userId"; // saved name on AsynchStorage
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedId = await AsyncStorage.getItem(USER_ID_KEY);
        setUserId(storedId);
      } catch (error) {
        console.warn("Error restoring userId", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const signUp = async (id: string) => {
    await AsyncStorage.setItem(USER_ID_KEY, id);
    setUserId(id);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(USER_ID_KEY);
    setUserId(null);
  };

  const setAuth = (id: string | null) => {
    setUserId(id);
  };

  const value = useMemo(
    () => ({ userId, isLoading, signUp, signOut, setAuth }),
    [userId, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};