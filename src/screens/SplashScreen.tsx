import { useEffect } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useTheme } from "../../theme/ThemeProvider";
import { useWebSocketPing } from "../socket/UseWebSocketPing";

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;
type SignInScreenProps = NativeStackNavigationProp<RootStack, "SignInScreen">;

export default function SplashScreen() {
  const navigation = useNavigation<Props | SignInScreenProps>();
  const opacity = useSharedValue(0);
  useWebSocketPing(60000); 

  useEffect(() => {
 
    opacity.value = withTiming(1, { duration: 3000 });

   
    const timer = setTimeout(() => {
      navigation.replace("SignInScreen");
    }, 3000);

   
    return () => {
      clearTimeout(timer);
    };
  }, [navigation, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  const { applied } = useTheme();
  const logo =
    applied === "light"
      ? require("../../assets/logo-dark.png")
      : require("../../assets/logo.png");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden={true} />
      <View className="flex-1 justify-center items-center">
      <Animated.View style={animatedStyle}>
      <Image
            source={require("../../assets/logo.png")}
            className="h-40 w-36"
          />
      </Animated.View>
      <Text className="mt-4 text-lg font-semibold text-gray-700">
        Welcome to HelaChat
      </Text>
      <Text className="mt-2 text-sm text-gray-500">
        Connecting the world, one chat at a time.
      </Text>
      </View>

      <View className="absolute bottom-10 w-full items-center">
      <Animated.View style={animatedStyle}>
        <Text className="text-xs font-medium text-gray-500">
        Powered by {process.env.EXPO_PUBLIC_APP_OWNER}
        </Text>
        <Text className="text-xs font-medium text-gray-500">
        Version {process.env.EXPO_PUBLIC_APP_VERSION}
        </Text>
      </Animated.View>
      </View>
    </SafeAreaView>
  );
}