import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { User } from "../socket/chat";
import { useUserList } from "../socket/UseUserList";

type NewChatScreenProp = NativeStackNavigationProp<RootStack, "NewChatScreen">;
export default function NewChatScreen() {
  const navigation = useNavigation<NewChatScreenProp>();
  const [search, setSearch] = useState("");
  const users = useUserList();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View className="flex-row items-center gap-x-3">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="justify-center items-center"
          >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text className="text-lg font-semibold text-gray-800">
              Select Contact
            </Text>
            <Text className="text-sm text-gray-600">
              {users.length} {users.length === 1 ? "contact" : "contacts"}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => <View></View>,
    });
  }, [navigation, users]);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      className="justify-start items-center gap-x-3 px-3 py-2 flex-row bg-gray-50 mt-1"
      onPress={() => {
        navigation.replace("SingleChatScreen", {
          chatId: item.id,
          friendName: `${item.firstName} ${item.lastName}`,
          lastSeenTime: item.updatedAt,
          profileImage: item.profileImage
            ? item.profileImage
            : `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
        });
      }}
    >
      <View>
        <TouchableOpacity className="h-14 w-14 rounded-full border-1 border-gray-300 justify-center items-center">
          {item.profileImage ? (
            <Image
              source={{ uri: item.profileImage }}
              className="h-14 w-14 rounded-full"
            />
          ) : (
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
              }}
              className="h-14 w-14 rounded-full"
            />
          )}
        </TouchableOpacity>
      </View>
      <View className="flex-col gap-y-1">
        <Text className="font-bold text-xl">
          {item.firstName} {item.lastName}
        </Text>
        <Text className="text-sm italic">
          {item.status === "ACTIVE"
            ? "Already in Friend List; Message Now"
            : "Hey there! I am using ChatApp"}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const filterdUsers = [...users]
    .filter((user) => {
      return (
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.contactNo.includes(search)
      );
    })
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  return (
    <SafeAreaView
      className="flex-1 bg-gray-100"
      edges={["right", "bottom", "left"]}
    >
      <StatusBar hidden={false} translucent={true} backgroundColor="#ffffff" />
      <View className="flex-1 px-4">
      <View className="flex-row items-center bg-white shadow-sm rounded-full px-4 h-12 mt-4">
        <Ionicons name="search" size={20} color={"gray"} />
        <TextInput
        className="flex-1 text-base font-medium ps-2 text-gray-700"
        placeholder="Search contacts"
        placeholderTextColor="#9CA3AF"
        value={search}
        onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View className="my-4">
        <TouchableOpacity
        className="flex-row items-center bg-white shadow-sm rounded-lg p-3"
        onPress={() => navigation.navigate("NewContactScreen")}
        >
        <View className="bg-blue-500 items-center justify-center w-10 h-10 rounded-full">
          <Feather name="user-plus" size={20} color="white" />
        </View>
        <Text className="text-lg font-semibold text-gray-800 ml-4">
          Add New Contact
        </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <FlatList
        data={filterdUsers}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        ItemSeparatorComponent={() => (
          <View className="h-1 bg-gray-200 mx-2" />
        )}
        />
      </View>
      </View>
    </SafeAreaView>
  );
}
