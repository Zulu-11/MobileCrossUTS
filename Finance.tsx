import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FinanceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Finance</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Illustration */}
        <Image
          source={{
            uri: "https://img.freepik.com/free-vector/under-construction-concept-illustration_114360-2299.jpg",
          }}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Main text */}
        <Text style={styles.mainText}>We are preparing something</Text>

        {/* Subtext */}
        <Text style={styles.subText}>
          Please be patient, all of this are made so you can enjoy the best services at OVO.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  illustration: {
    width: 250,
    height: 200,
    marginBottom: 24,
  },
  mainText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});
