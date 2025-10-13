import { useContext } from "react";
import { UserRegistrationData } from "../components/UserContext";


const API = process.env.EXPO_PUBLIC_APP_URL + "/HelaChatBackend";

export const createNewAccount = async (
  userRegistrationData: UserRegistrationData
) => {
  let formData = new FormData();
  formData.append("firstName", userRegistrationData.firstName);
  formData.append("lastName", userRegistrationData.lastName);
  formData.append("countryCode", userRegistrationData.countryCode);
  formData.append("contactNo", userRegistrationData.contactNo);
  formData.append("profileImage", {
    uri: userRegistrationData.profileImage,
    name: "profile.png",
    type: "image/png",
  } as any);

  const response = await fetch(API + "/UserController", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    return "OOPS! Account creation failed!";
  }
};

export const uploadProfileImage = async (userId:string, imageUri: string) => {
  let formData = new FormData();
  formData.append("userId", userId);
  formData.append("profileImage", {
    uri: imageUri,
    type: "image/png", 
    name: "profile.png",
  } as any)

  const response = await fetch(API + "/ProfileController", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    return await response.json();
  } else {
    console.warn("Profile image uploading failed!");
  }

};


export const signIn = async (countryCode: string, contactNo: string) => {
  const formData = new FormData();
  formData.append("action", "signIn"); // Specify the action for the backend
  formData.append("countryCode", countryCode);
  formData.append("contactNo", contactNo);

  try {
    const response = await fetch(API + "/UserSignIn", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const json = await response.json();
      return json; // Return user data (e.g., userId, firstName, etc.)
    } else {
      const error = await response.text();
      throw new Error(error || "Sign-in failed!");
    }
  } catch (error) {
    console.error("Sign-in error");
    return null; // Return null or handle the error appropriately
  }
};
