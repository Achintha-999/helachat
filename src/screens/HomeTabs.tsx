import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "./ChatsScreen";
import StatusScreen from "./StatusScreen";
import CallsScreen from "./CallsScreen";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName = "chatbubble-ellipses";
        if (route.name === "Chats") iconName = "chatbubble-ellipses";
        else if (route.name === "Status") iconName = "time";
        else if (route.name === "Calls") iconName = "call";
        return <Ionicons name={iconName as any} size={24} color={color} />;
      },
      tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
      tabBarActiveTintColor: "#3b82f6",
      tabBarInactiveTintColor: "#6b7280",
      tabBarStyle: {
        height: 70,
        backgroundColor: "#f9fafb",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        paddingBottom: 8,
        paddingTop: 4,
      },
      tabBarItemStyle: {
        paddingVertical: 4,
      },
      })}
    >
      <Tabs.Screen
      name="Chats"
      component={ChatsScreen}
      options={{ headerShown: false, title: "Chats" }}
      />
      <Tabs.Screen
      name="Status"
      component={StatusScreen}
      options={{ headerShown: false, title: "Status" }}
      />
      <Tabs.Screen
      name="Calls"
      component={CallsScreen}
      options={{ headerShown: false, title: "Calls" }}
      />
    </Tabs.Navigator>
  );
}
