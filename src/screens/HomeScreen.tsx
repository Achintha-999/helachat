import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useChatList } from "../socket/UseChatList";
import { formatChatTime } from "../util/DateFormatter";
import { Chat } from "../socket/chat";
import { AuthContext } from "../components/AuthProvider";

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const [search, setSearch] = useState("");
  const chatList = useChatList();
  const [isModalVisible, setModalVisible] = useState(false);
  const auth = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View
          className={`h-20 bg-white justify-center items-center flex-row shadow-md ${
            Platform.OS === "ios" ? `py-5` : `py-0`
          }`}
        >
          <View className="flex-1 items-start ms-4">
            <Text className="font-bold text-2xl text-gray-800">HelaChat</Text>
          </View>
          <View className="flex-row items-center me-4 space-x-4">
            <TouchableOpacity>
              <Ionicons name="camera-outline" size={26} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="ellipsis-vertical-outline" size={26} color="gray" />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="fade"
            visible={isModalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable
              className="flex-1 bg-transparent"
              onPress={() => setModalVisible(false)}
            >
              <Pressable
          className="bg-white rounded-lg mx-4 my-auto"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={(e) => e.stopPropagation()}
              >
          <View className="p-4">
            <TouchableOpacity
              className="h-12 justify-center border-b border-gray-200"
              onPress={() => {
                navigation.navigate("SettingScreen");
                setModalVisible(false);
              }}
            >
              <Text className="font-medium text-lg text-gray-700">Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-12 justify-center border-b border-gray-200"
              onPress={() => {
                navigation.navigate("ProfileScreen");
                setModalVisible(false);
              }}
            >
              <Text className="font-medium text-lg text-gray-700">My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-12 justify-center"
              onPress={() => {
                if (auth) auth.signOut();
              }}
            >
              <Text className="font-medium text-lg text-red-500">Log Out</Text>
            </TouchableOpacity>
          </View>
              </Pressable>
            </Pressable>
          </Modal>
        </View>
      ),
    });
  }, [navigation, isModalVisible]);

  const filterdChats = [...chatList]
    .filter((chat) => {
      return (
        chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort(
      (a, b) =>
        new Date(b.lastTimeStamp).getTime() -
        new Date(a.lastTimeStamp).getTime()
    );

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      className="flex-row items-center py-3 px-4 bg-white my-1 rounded-lg shadow-sm"
      onPress={() => {
        navigation.navigate("SingleChatScreen", {
          chatId: item.friendId,
          friendName: item.friendName,
          lastSeenTime: formatChatTime(item.lastTimeStamp),
          profileImage: item.profileImage
            ? item.profileImage
            : `https://ui-avatars.com/api/?name=${item.friendName.replace(
                " ",
                "+"
              )}&background=random`,
        });
      }}
    >
      <View className="h-16 w-16 rounded-full border border-gray-300 overflow-hidden">
        {item.profileImage ? (
          <Image
            source={{ uri: item.profileImage }}
            className="h-full w-full"
          />
        ) : (
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${item.friendName.replace(
                " ",
                "+"
              )}&background=random`,
            }}
            className="h-full w-full"
          />
        )}
      </View>
      <View className="flex-1 ms-4">
        <View className="flex-row justify-between items-center">
          <Text
            className="font-semibold text-lg text-gray-800"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.friendName}
          </Text>
          <Text className="text-sm text-gray-500">
            {formatChatTime(item.lastTimeStamp)}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-1">
          <Text
            className="text-gray-600 flex-1 text-sm"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View className="bg-green-500 rounded-full px-2 py-1 ms-2">
              <Text className="text-white text-xs font-bold">
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <SafeAreaView
      className="flex-1 bg-white p-0"
      edges={["right", "bottom", "left"]}
    >
      <StatusBar hidden={false} />
      <View className="items-center flex-row mx-2 border-gray-300 border-2 rounded-full px-3 h-14 mt-3">
        <Ionicons name="search" size={20} color={"gray"} />
        <TextInput
          className="flex-1 text-lg font-bold ps-2"
          placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View className="mt-1">
        <FlatList
          data={filterdChats}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
      <View className="absolute bg-blue-500 bottom-16 right-10 h-20 w-20 rounded-3xl">
        <TouchableOpacity
          className="h-20 w-20 rounded-3xl justify-center items-center"
          onPress={() => navigation.navigate("NewChatScreen")}
        >
          <Ionicons name="chatbox-ellipses" size={26} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
