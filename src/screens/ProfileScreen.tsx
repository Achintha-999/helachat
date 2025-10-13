import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useUserProfile } from "../socket/useUserProfile";
import { uploadProfileImage } from "../api/UserService";
import { AuthContext } from "../components/AuthProvider";

type ProfileScreenProp = NativeStackNavigationProp<RootStack, "ProfileScreen">;
export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenProp>();
  const { applied } = useTheme();
  const userProfile = useUserProfile();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Profile",
      headerStyle: {
        backgroundColor: applied === "dark" ? "black" : "white",
      },
      headerTintColor: applied === "dark" ? "white" : "black",
    });
  }, [navigation, applied]);

  const [image, setImage] = useState<string | null>(null);
  const auth = useContext(AuthContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadProfileImage(String(auth ? auth.userId : 0), result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 mt-10 w-full p-5">
      <View className="items-center">
        {image ? (
        <Image
          className="w-40 h-40 rounded-full border-gray-300 border-4 shadow-lg"
          source={{ uri: image }}
        />
        ) : (
        <Image
          className="w-40 h-40 rounded-full border-gray-300 border-4 shadow-lg"
          source={{ uri: userProfile?.profileImage }}
        />
        )}
        <TouchableOpacity
        className="mt-4 bg-green-600 px-4 py-2 rounded-full"
        onPress={() => {
          pickImage();
        }}
        >
        <Text className="text-white font-bold text-lg">Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-lg shadow-md p-4 mt-6">
        <View className="flex-row items-center mb-4">
        <Feather name="user" size={24} color="gray" />
        <Text className="font-bold text-lg ml-3">Name</Text>
        </View>
        <Text className="text-gray-700 text-lg">
        {userProfile?.firstName} {userProfile?.lastName}
        </Text>
      </View>
      <View className="bg-white rounded-lg shadow-md p-4 mt-4">
        <View className="flex-row items-center mb-4">
        <Feather name="phone" size={24} color="gray" />
        <Text className="font-bold text-lg ml-3">Phone</Text>
        </View>
        <Text className="text-gray-700 text-lg">
        {userProfile?.countryCode} {userProfile?.contactNo}
        </Text>
      </View>
      </View>
    </SafeAreaView>
  );
}
