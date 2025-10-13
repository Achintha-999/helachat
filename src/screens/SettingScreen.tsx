import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeOption, useTheme } from "../../theme/ThemeProvider";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";

const options: ThemeOption[] = ["light", "dark", "system"];
type SettingScreenProp = NativeStackNavigationProp<RootStack, "SettingScreen">;
export default function SettingScreen() {
  const { preference, applied, setPreference } = useTheme();
  const navigation = useNavigation<SettingScreenProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Setting",
      headerStyle: {
        backgroundColor: applied === "dark" ? "black" : "white",
      },
      headerTintColor: applied === "dark" ? "white" : "black",
    });
  }, [navigation, applied]);
  return (
    <SafeAreaView className="flex-1" edges={["right", "bottom", "left"]}>
      <StatusBar hidden={false} />
      <View className="flex-1 bg-white dark:bg-black p-6">
      <Text className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-4">
        App Theme
      </Text>
      <View className="flex-row flex-wrap gap-4">
        {options.map((option) => (
        <TouchableOpacity
          key={option}
          className={`py-3 px-6 rounded-lg shadow-md ${
          preference === option
            ? "bg-green-500"
            : "bg-gray-200 dark:bg-gray-700"
          }`}
          onPress={() => setPreference(option)}
        >
          <Text
          className={`text-center font-semibold ${
            preference === option
            ? "text-white"
            : "text-slate-900 dark:text-slate-100"
          }`}
          >
          {option.charAt(0).toUpperCase() + option.slice(1)}
          </Text>
        </TouchableOpacity>
        ))}
      </View>
      </View>
    </SafeAreaView>
  );
}
