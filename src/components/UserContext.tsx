import React, { createContext, ReactNode, useState } from "react";

export interface UserRegistrationData {
    firstName: string;
    lastName: string;
    contactNo: string;
    countryCode: string;
    profileImage: string | null;
}

interface UserRegistrationContextType {
    userData: UserRegistrationData;
    setUserData: React.Dispatch<React.SetStateAction<UserRegistrationData>>;
}

const UserRegistraionContext = createContext<UserRegistrationContextType | undefined>(undefined);

export const UserRegistrationProvider: React.FC<{ children: ReactNode }> =
    ({ children }) => {
        const [userData, setUserData] = useState<UserRegistrationData>({
            firstName: "",
            lastName: "",
            contactNo: "",
            countryCode: "",
            profileImage: null,
        });
        return (
            <UserRegistraionContext.Provider value={{ userData, setUserData }}>
                {children}
            </UserRegistraionContext.Provider>
        );
    };

    export const useUserRegistration = ():UserRegistrationContextType => {
        const ctx = React.useContext(UserRegistraionContext);
        if (!ctx) {
            throw new Error("useUserRegistration must be used within a UserRegistrationProvider");
        }
        return ctx;
    }