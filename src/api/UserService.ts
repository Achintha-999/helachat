import { UserRegistrationData } from "../components/UserContext";

const API = process.env.EXPO_PUBLIC_APP_URL + "/ChatAppBackend";

export const createNewAccount = async (useUserRegistrationData: UserRegistrationData
) => {
    
    let formData = new FormData();
    formData.append("firstName", useUserRegistrationData.firstName);
    formData.append("lastName", useUserRegistrationData.lastName);
    formData.append("countryCode", useUserRegistrationData.countryCode);
    formData.append("contactNo", useUserRegistrationData.contactNo);
    formData.append("profileImage", {
      uri: useUserRegistrationData.profileImage,
      name: "profile.png",
      type: "image/png",
    } as any);

    const response = await fetch(API + "/UserController",{
        method: "POST",
        body: formData,
             
    });
    if(response.ok){
        const json = await response.json();
       return json;
    }else{
        return "Failed to create account. Please try again.";
    }

};

