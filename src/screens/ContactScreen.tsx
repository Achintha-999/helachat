import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { validateCountryCode, validatePhoneNo } from "../util/Validation";
type ContactProps = NativeStackNavigationProp<RootStack, "ContactScreen">;

export default function ContactScreen() {
  const navigation = useNavigation<ContactProps>();

  const [countryCode, setCountryCode] = useState<CountryCode>("LK"); // default country code
  const [country, setCountry] = useState<Country | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const { userData, setUserData } = useUserRegistration();
  const [callingCode, setCallingCode] = useState("+94");
  const [phoneNo, setPhoneNo] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <StatusBar hidden={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
      >
        <View className="p-6 items-center flex-1 bg-gray-50">
          <View className="mb-8">
            <Image
              source={require("../../assets/logo.png")}
              className="h-32 w-32"
              resizeMode="contain"
            />
          </View>
          <View className="mb-6">
            <Text className="text-gray-700 text-center text-lg font-medium">
              Enter your phone number to get started. Your privacy is our priority.
            </Text>
          </View>
          <View className="w-full">
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white shadow-sm">
              <CountryPicker
          countryCode={countryCode}
          withFilter
          withFlag
          withCallingCode
          visible={show}
          onClose={() => setShow(false)}
          onSelect={(c) => {
            setCountryCode(c.cca2);
            setCountry(c);
            setShow(false);
          }}
              />
              <AntDesign
          name="caret-down"
          size={16}
          color="gray"
          style={{ marginLeft: 8 }}
              />
              <TextInput
          inputMode="tel"
          className="flex-1 ml-4 text-gray-800 text-base"
          placeholder="Phone number"
          value={phoneNo}
          onChangeText={(text) => setPhoneNo(text)}
          keyboardType="phone-pad"
              />
            </View>
          </View>
          <View className="mt-8 w-full">
            <Pressable
              className="justify-center items-center bg-green-500 w-full h-12 rounded-lg shadow-md"
              onPress={() => {
          const validCountryCode = validateCountryCode(callingCode);
          const validPhoneNo = validatePhoneNo(phoneNo);

          if (validCountryCode) {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: "Warning",
              textBody: validCountryCode,
            });
          } else if (validPhoneNo) {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: "Warning",
              textBody: validPhoneNo,
            });
          } else {
            setUserData((previous) => ({
              ...previous,
              countryCode: country
                ? `+${country.callingCode}`
                : callingCode,
              contactNo: phoneNo,
            }));
            navigation.replace("AvatarScreen");
          }
              }}
            >
              <Text className="text-lg font-semibold text-white">Next</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
