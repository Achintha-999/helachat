import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { FloatingLabelInput } from "react-native-floating-label-input";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import {
  validateCountryCode,
  validateFirstName,
  validateLastName,
  validatePhoneNo,
} from "../util/Validation";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useSendNewContact } from "../socket/UseSendNewContact";

type NewContactScreenProp = NativeStackNavigationProp<
  RootStack,
  "NewContactScreen"
>;
export default function NewContactScreen() {
  const navigation = useNavigation<NewContactScreenProp>();
  useLayoutEffect(() => {
    navigation.setOptions = () => ({
      title: "",
      headerLeft: () => (
        <View className="items-center flex-row gap-x-2">
          <TouchableOpacity
            className="justify-center items-center"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-col">
            <Text className="text-lg font-bold">New Contact</Text>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  const [countryCode, setCountryCode] = useState<CountryCode>("LK"); // default country code
  const [country, setCountry] = useState<Country | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [callingCode, setCallingCode] = useState("+94");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const newContact = useSendNewContact();
  const sendNewContact = newContact.sendNewContact;
  const responseText = newContact.responseText;

  const sendData = () => {
    sendNewContact({
      id: 0,
      firstName: firstName,
      lastName: lastName,
      countryCode: callingCode,
      contactNo: phoneNo,
      createdAt: "",
      updatedAt: "",
      status: "",
    });
    setFirstName("");
    setLastName("");
    setCallingCode("+94");
    setPhoneNo("");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-6 py-4">
      <View className="mb-6">
        <Text className="text-2xl font-semibold text-gray-800">Add New Contact</Text>
        <Text className="text-sm text-gray-500">Fill in the details below to save a new contact.</Text>
      </View>
      <View className="flex-row items-center gap-x-3 mb-6">
        <Feather name="user" size={20} color="#4B5563" />
        <View className="flex-1">
        <FloatingLabelInput
          label="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          containerStyles={{
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
          }}
          customLabelStyles={{
          colorFocused: "#2563EB",
          colorBlurred: "#9CA3AF",
          }}
          inputStyles={{
          color: "#111827",
          fontSize: 16,
          }}
        />
        </View>
      </View>
      <View className="flex-row items-center gap-x-3 mb-6">
        <Feather name="user" size={20} color="#4B5563" />
        <View className="flex-1">
        <FloatingLabelInput
          label="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          containerStyles={{
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
          }}
          customLabelStyles={{
          colorFocused: "#2563EB",
          colorBlurred: "#9CA3AF",
          }}
          inputStyles={{
          color: "#111827",
          fontSize: 16,
          }}
        />
        </View>
      </View>
      <View className="flex-row items-center gap-x-3 mb-6">
        <CountryPicker
        countryCode={countryCode}
        withFilter
        withFlag
        withCountryNameButton={false}
        withCallingCode
        visible={show}
        onClose={() => setShow(false)}
        onSelect={(c) => {
          setCountryCode(c.cca2);
          setCountry(c);
          setShow(false);
        }}
        />
        <Text className="text-lg text-gray-800">
        {country ? `+${country.callingCode}` : callingCode}
        </Text>
        <AntDesign name="caret-down" size={16} color="#6B7280" />
        <View className="flex-1">
        <FloatingLabelInput
          label="Phone Number"
          value={phoneNo}
          onChangeText={(text) => setPhoneNo(text)}
          inputMode="tel"
          containerStyles={{
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
          }}
          customLabelStyles={{
          colorFocused: "#2563EB",
          colorBlurred: "#9CA3AF",
          }}
          inputStyles={{
          color: "#111827",
          fontSize: 16,
          }}
        />
        </View>
      </View>
      <Pressable
        className="bg-blue-600 h-14 items-center justify-center rounded-lg mt-6"
        onPress={() => {
        const firstNameValid = validateFirstName(firstName);
        const lastNameValid = validateLastName(lastName);
        const countryCodeValid = validateCountryCode(callingCode);
        const phoneNoValid = validatePhoneNo(phoneNo);

        if (firstNameValid) {
          Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Warning",
          textBody: firstNameValid,
          });
        } else if (lastNameValid) {
          Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Warning",
          textBody: lastNameValid,
          });
        } else if (countryCodeValid) {
          Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Warning",
          textBody: countryCodeValid,
          });
        } else if (phoneNoValid) {
          Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Warning",
          textBody: phoneNoValid,
          });
        } else {
          sendData();
        }
        }}
      >
        <Text className="font-bold text-lg text-white">Save Contact</Text>
      </Pressable>
      </View>
    </SafeAreaView>
  );
}

