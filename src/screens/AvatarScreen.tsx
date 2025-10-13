import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { useUserRegistration } from "../components/UserContext";
import { validateProfileImage } from "../util/Validation";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { createNewAccount } from "../api/UserService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../components/AuthProvider";

type AvataScreenProps = NativeStackNavigationProp<RootStack, "AvatarScreen">;

export default function AvatarScreen() {
  const navigation = useNavigation<AvataScreenProps>();
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<string | null>(null);

  const { userData, setUserData } = useUserRegistration();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setUserData((previous) => ({
        ...previous,
        profileImage: result.assets[0].uri,
      }));
    }
  };

  const avatars = [
    require("../../assets/avatar/avatar_1.png"),
    require("../../assets/avatar/avatar_2.png"),
    require("../../assets/avatar/avatar_3.png"),
    require("../../assets/avatar/avatar_4.png"),
    require("../../assets/avatar/avatar_5.png"),
    require("../../assets/avatar/avatar_6.png"),
  ];

  const auth = useContext(AuthContext);

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar hidden={true} />
      <View className="flex-1 items-center ">
        <View>
          <Image
            source={require("../../assets/logo.png")}
            className="h-40 w-36"
          />
        </View>
        <View className="items-center px-4">
          <Text className="font-bold text-xl text-gray-800">
            Select Your Profile Image
          </Text>
          <View className="items-center mt-4 h-72">
            <Pressable
              className="h-[120px] w-[120px] rounded-full bg-gray-200 justify-center items-center border-2 border-gray-400 border-dashed"
              onPress={pickImage}
            >
              {image ? (
          <Image
            source={{ uri: image }}
            className="h-[120px] w-[120px] rounded-full"
          />
              ) : (
          <View className="items-center">
            <Text className="font-bold text-3xl text-gray-500">+</Text>
            <Text className="font-medium text-base text-gray-500">
              Upload Image
            </Text>
          </View>
              )}
            </Pressable>
            <Text className="text-lg mt-4 text-gray-700 font-semibold">
              Or Choose an Avatar
            </Text>
            <FlatList
              data={avatars}
              horizontal
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setImage(Image.resolveAssetSource(item).uri);
              setUserData((previous) => ({
                ...previous,
                profileImage: Image.resolveAssetSource(item).uri,
              }));
            }}
          >
            <Image
              source={item}
              className="h-20 w-20 rounded-full mx-2 border-2 border-gray-300"
            />
          </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <View className="mt-4 w-full px-6">
          <Pressable
            disabled={loading}
            className={`h-14 ${
              loading ? "bg-blue-400" : "bg-blue-600"
            } items-center justify-center rounded-full`}
            onPress={async () => {
              const validProfile = validateProfileImage(
          userData.profileImage
            ? { uri: userData.profileImage, type: "", fileSize: 0 }
            : null
              );
              if (validProfile) {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: "Warning",
            textBody: "Please select a profile image or an avatar.",
          });
              } else {
          try {
            setLoading(true);
            const response = await createNewAccount(userData);
            if (response.status) {
              const id = response.userId;
              if (auth) {
                await auth.signUp(String(id));
                navigation.replace("HomeScreen");
              }
            } else {
              Toast.show({
                type: ALERT_TYPE.DANGER,
                title: "Error",
                textBody: response.message,
              });
            }
          } catch (error) {
            console.error(error);
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "Error",
              textBody: "An unexpected error occurred. Please try again.",
            });
          } finally {
            setLoading(false);
          }
              }
            }}
          >
            {loading ? (
              <ActivityIndicator size={"large"} color={"white"} />
            ) : (
              <Text className="font-bold text-lg text-white">
          Create Account
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

