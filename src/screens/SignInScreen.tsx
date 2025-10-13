import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../api/UserService";
import { RootStack } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { AuthContext } from "../components/AuthProvider";
import { useTheme } from "../../theme/ThemeProvider";


type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">;
type HomeProps = NativeStackNavigationProp<RootStack, "HomeScreen">;


export default function SignInScreen() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  
  const { setAuth } = authContext; 
  const [countryCode, setCountryCode] = useState("");
  const [contactNo, setContactNo] = useState("");
  const navigation = useNavigation<HomeProps>(); 
  const { applied } = useTheme();

  const logo =
  applied === "light"
    ? require("../../assets/logo-dark.png")
    : require("../../assets/logo.png");

  const handleSignIn = async () => {
    if (!countryCode || !contactNo) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please enter both country code and contact number.",
      });
      return;
    }

    try {
      const result = await signIn(countryCode, contactNo);
      if (result && result.status) {
        console.log("Sign-in successful:", result);

        
        setAuth(result.user.id);

      
        navigation.navigate("HomeScreen");
      } else {
        Alert.alert("Error", result?.message || "Sign-in failed!");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      Alert.alert("Error", "An error occurred during sign-in.");
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      
      <Image
            source={require("../../assets/logo.png")}
            className="h-40 w-36"
          />

      </View>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
      style={styles.input}
      placeholder="Country Code"
      value={countryCode}
      onChangeText={setCountryCode}
      keyboardType="phone-pad" 
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNo}
        onChangeText={setContactNo}
        keyboardType="phone-pad" 
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5", 
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007BFF", 
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
    color: "#333", 
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff", 
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, 
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 16,
  },
  linkText: {
    color: "#007BFF",
    fontSize: 16,
    
  },
});