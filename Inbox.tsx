import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell } from "lucide-react-native";

export default function InboxScreen() {
  const [activeTab, setActiveTab] = useState<"notification" | "message">("notification");

  const handleTabPress = (tab: "notification" | "message") => {
    setActiveTab(tab);
  };

  // Decide what text to show in the middle of the screen
  const displayText =
    activeTab === "notification"
      ? "There is no notification for you right now"
      : "There is no message for you right now";

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Title */}
      <Text style={styles.headerTitle}>Notifications</Text>

      {/* Tabs Row */}
      <View style={styles.tabsRow}>
        {/* Notifikasi Tab */}
        <TouchableOpacity onPress={() => handleTabPress("notification")}>
          <Text
            style={[
              styles.tabItem,
              activeTab === "notification" && styles.activeTab,
            ]}
          >
            Notification
          </Text>
        </TouchableOpacity>

        {/* Pesan Tab */}
        <TouchableOpacity onPress={() => handleTabPress("message")}>
          <Text
            style={[styles.tabItem, activeTab === "message" && styles.activeTab]}
          >
            Message
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Bell size={80} color="#cccccc" />
        <Text style={styles.emptyText}>{displayText}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 8,
  },
  tabItem: {
    fontSize: 16,
    color: "#999",
    fontWeight: "400",
  },
  activeTab: {
    color: "#000", // Make the active tab black
    fontWeight: "600",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    marginTop: 16,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
