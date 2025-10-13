import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { useTheme } from "../../theme/ThemeProvider";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validation";

type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">;

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpProps>();
  const { applied } = useTheme();
  const logo =
    applied === "light"
      ? require("../../assets/logo-dark.png")
      : require("../../assets/logo.png");

  const { userData, setUserData } = useUserRegistration();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
      className={`flex-1 ${applied === "light" ? "bg-white" : "bg-gray-900"}`}
    >
      <SafeAreaView className="flex-1 justify-center items-center px-5">
        <StatusBar hidden={true} />
        <Image
            source={require("../../assets/logo.png")}
            className="h-40 w-36"
          />
        <Text
          className={`text-center text-lg font-semibold ${
            applied === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Create your account and start connecting with the world!
        </Text>
        <View className="w-full mt-8">
          <FloatingLabelInput
            label={"First Name"}
            value={userData.firstName}
            onChangeText={(text) => {
              setUserData((previous) => ({
                ...previous,
                firstName: text,
              }));
            }}
            customLabelStyles={{
              colorFocused: applied === "light" ? "#000" : "#fff",
              colorBlurred: applied === "light" ? "#aaa" : "#ccc",
            }}
            inputStyles={{
              color: applied === "light" ? "#000" : "#fff",
            }}
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: applied === "light" ? "#ccc" : "#555",
              marginBottom: 20,
            }}
          />
          <FloatingLabelInput
            label={"Last Name"}
            value={userData.lastName}
            onChangeText={(text) => {
              setUserData((previous) => ({
                ...previous,
                lastName: text,
              }));
            }}
            customLabelStyles={{
              colorFocused: applied === "light" ? "#000" : "#fff",
              colorBlurred: applied === "light" ? "#aaa" : "#ccc",
            }}
            inputStyles={{
              color: applied === "light" ? "#000" : "#fff",
            }}
            containerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: applied === "light" ? "#ccc" : "#555",
              marginBottom: 20,
            }}
          />
        </View>
        <Pressable
          className={`h-14 w-full justify-center items-center rounded-full mt-5 ${
            applied === "light" ? "bg-blue-600" : "bg-green-500"
          }`}
          onPress={() => {
            let validFirstName = validateFirstName(userData.firstName);
            let validLastName = validateLastName(userData.lastName);
            if (validFirstName) {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: validFirstName,
              });
            } else if (validLastName) {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: validLastName,
              });
            } else {
              navigation.navigate("ContactScreen");
            }
          }}
        >
          <Text className="text-white font-bold text-lg">Sign Up</Text>
        </Pressable>
        <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate("SignInScreen")}
              >
                <Text style={styles.linkText}>Already have an account? Sign In</Text>
              </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({

  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});


