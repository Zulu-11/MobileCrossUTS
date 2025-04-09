import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Bell, User } from "lucide-react-native"; // Use Home from lucide-react-native
import { View, Text } from "react-native";

import HomeScreen from "./Index";
import FinanceScreen from "./Finance";
import ScanScreen from "./Scan"; // We'll reuse Scan as "Pay" screen
import InboxScreen from "./Inbox";
import ProfileScreen from "./Profile";

// Custom "Rp" bubble icon for the Finance tab
function FinanceIcon({ color, size, focused }: any) {
  const bubbleSize = 24;
  return (
    <View
      style={{
        width: bubbleSize,
        height: bubbleSize,
        borderRadius: bubbleSize / 2,
        backgroundColor: focused ? color : "#999",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}>Rp</Text>
    </View>
  );
}

// Custom big purple circle icon for the Pay tab (slightly smaller now)
function PayIcon({ color, size, focused }: any) {
  const circleSize = 50; // Reduced from 60 to 50
  return (
    <View
      style={{
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30, // Adjust if you want it higher/lower above the bar
        marginLeft: 5,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>QRIS</Text>
    </View>
  );
}

// Small helper for Home icon
function HomeTabIcon({ color, size }: any) {
  return <Home color={color} size={size} />;
}

// Small helper for Inbox icon
function InboxTabIcon({ color, size }: any) {
  return <Bell color={color} size={size} />;
}

// Small helper for Profile icon
function ProfileTabIcon({ color, size }: any) {
  return <User color={color} size={size} />;
}

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      id={undefined}  // <-- Add this line to satisfy the type requirement.
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#eee",
          height: 60,
          paddingBottom: 4,
          paddingTop: 4,
        },
        tabBarActiveTintColor: "#523B8E",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
      {/* Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: HomeTabIcon,
        }}
      />

      {/* Finance */}
      <Tab.Screen
        name="Finance"
        component={FinanceScreen}
        options={{
          title: "Finance",
          tabBarIcon: FinanceIcon,
        }}
      />

      {/* Pay (center tab) */}
      <Tab.Screen
        name="Pay"
        component={ScanScreen}
        options={{
          title: "Pay",
          tabBarIcon: PayIcon,
        }}
      />

      {/* Inbox */}
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          title: "Inbox",
          tabBarIcon: InboxTabIcon,
        }}
      />

      {/* Profile */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}
