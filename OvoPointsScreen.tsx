import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TAB_NAMES = ["Didapat", "Terpakai"];

export default function OvoPointsScreen() {
  const [activeTab, setActiveTab] = useState("Didapat");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Title & Amount */}
        <View style={styles.headerContainer}>
          <Text style={styles.pointsTitle}>OVO Points</Text>
          <Text style={styles.pointsBalance}>4.520</Text>
          <Text style={styles.pointsEquivalent}>Setara Rp4.520</Text>
        </View>

        {/* Tab Buttons (Didapat / Terpakai) */}
        <View style={styles.tabContainer}>
          {TAB_NAMES.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Conditionally render the list for 'Didapat' vs. 'Terpakai' */}
        {activeTab === "Didapat" ? (
          <View style={styles.listContainer}>
            {/* Example: March 2025 points */}
            <Text style={styles.monthLabel}>April 2025</Text>
            <View style={styles.pointsItem}>
              <Text style={styles.itemDate}>7 Apr 2025</Text>
              <Text style={styles.itemDesc}>Telkomsel</Text>
              <Text style={styles.itemPoints}>4.500 Points</Text>
              <Text style={styles.itemValidity}>Berlaku s.d 7 Apr 2026</Text>
            </View>

            <Text style={styles.monthLabel}>March 2025</Text>
            <View style={styles.pointsItem}>
              <Text style={styles.itemDate}>22 Mar 2025</Text>
              <Text style={styles.itemDesc}>Mandiri e-money</Text>
              <Text style={styles.itemPoints}>10 Points</Text>
              <Text style={styles.itemValidity}>Berlaku s.d 22 Mar 2026</Text>
            </View>
            <View style={styles.pointsItem}>
              <Text style={styles.itemDate}>22 Mar 2025</Text>
              <Text style={styles.itemDesc}>MYTELKOMSEL</Text>
              <Text style={styles.itemPoints}>10 Points</Text>
              <Text style={styles.itemValidity}>Berlaku s.d 22 Mar 2026</Text>
            </View>
            {/* Add more items as needed */}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {/* Example if "Terpakai" is empty or has some usage data */}
            <Text style={styles.monthLabel}>Belum Ada Data</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 40 },
  headerContainer: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 12,
  },
  pointsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  pointsBalance: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  pointsEquivalent: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 8,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#523B8E",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  tabTextActive: {
    color: "#523B8E",
    fontWeight: "600",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  monthLabel: {
    fontSize: 13,
    color: "#999",
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "600",
  },
  pointsItem: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemDate: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  itemPoints: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
    marginTop: 4,
  },
  itemValidity: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});
