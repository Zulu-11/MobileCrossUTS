import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1554774853-8d9c323a31f3?fit=crop&w=600&h=800";

// Logos for Kode QRIS (two states)
const ICON_QRIS_1 =
  "https://cdn-icons-png.flaticon.com/512/5082/5082480.png"; // Purple QR icon
const ICON_QRIS_2 =
  "https://upload.wikimedia.org/wikipedia/commons/8/82/Alfamart_logo_2019.png"; // Alfamart logo

// Logos for Kode Bayar (two states)
const ICON_BAYAR_1 =
  "https://upload.wikimedia.org/wikipedia/commons/1/1c/Indomaret_newest_logo.png"; // Indomaret
const ICON_BAYAR_2 =
  "https://upload.wikimedia.org/wikipedia/commons/9/9a/Logo_Mini.svg"; // Example fallback

export default function ScanScreen() {
  const navigation = useNavigation();
  const [cameraHeight, setCameraHeight] = useState(0);

  // Animate scanning line
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  // Animate cross-fade for Kode QRIS
  const qrisAnim = useRef(new Animated.Value(0)).current;
  // Animate cross-fade for Kode Bayar
  const bayarAnim = useRef(new Animated.Value(0)).current;

  // 1) Hide the bottom tab bar while on Scan
  useEffect(() => {
    const parentNav = navigation.getParent();
    parentNav?.setOptions({ tabBarStyle: { display: "none" } });

    return () => {
      // Restore tab bar after leaving Scan
      parentNav?.setOptions({ tabBarStyle: undefined });
    };
  }, [navigation]);

  // 2) Start scanning line animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: false,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [scanLineAnim]);

  // 3) Cross-fade for Kode QRIS
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(qrisAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(qrisAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [qrisAnim]);

  // 4) Cross-fade for Kode Bayar
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bayarAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(bayarAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [bayarAnim]);

  // 5) Interpolate scanning line from top to bottom
  const translateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, cameraHeight - 2],
  });

  // 6) Measure the camera container's height
  const onCameraLayout = (e: LayoutChangeEvent) => {
    setCameraHeight(e.nativeEvent.layout.height);
  };

  // Cross-fade for Kode QRIS
  const qrisOpacity1 = qrisAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const qrisOpacity2 = qrisAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Cross-fade for Kode Bayar
  const bayarOpacity1 = bayarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const bayarOpacity2 = bayarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // 7) Back arrow handler
  const handleGoBack = () => {
    // Return user to whichever screen they visited prior to Scan
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Semi-transparent Purple Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.topBarTitle}>QRIS</Text>
        <Text style={styles.topBarSubtitle}>SUPPORTED</Text>
      </View>

      {/* Camera / Background */}
      <View style={styles.cameraContainer} onLayout={onCameraLayout}>
        <ImageBackground
          source={{ uri: BG_IMAGE }}
          style={styles.cameraBackground}
          resizeMode="cover"
        >
          {/* Dark overlay */}
          <View style={styles.overlay} />

          {/* Scanning line */}
          {cameraHeight > 0 && (
            <Animated.View
              style={[styles.scanLine, { transform: [{ translateY }] }]}
            />
          )}

          {/* Overlaid Buttons */}
          <View style={styles.buttonOverlay}>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Upload QR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Scan Parking Ticket</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Bottom White Panel */}
      <View style={styles.bottomPanel}>
        <Text style={styles.footerTitle}>You can also pay with</Text>
        <View style={styles.footerButtonsRow}>
          {/* Kode QRIS */}
          <TouchableOpacity style={styles.footerOption}>
            <Animated.Image
              source={{ uri: ICON_QRIS_1 }}
              style={[
                styles.optionIcon,
                styles.absoluteIcon,
                { opacity: qrisOpacity1 },
              ]}
            />
            <Animated.Image
              source={{ uri: ICON_QRIS_2 }}
              style={[styles.optionIcon, { opacity: qrisOpacity2 }]}
            />
            <Text style={styles.optionLabel}>QRIS Code</Text>
          </TouchableOpacity>

          {/* Kode Bayar */}
          <TouchableOpacity style={styles.footerOption}>
            <Animated.Image
              source={{ uri: ICON_BAYAR_1 }}
              style={[
                styles.optionIcon,
                styles.absoluteIcon,
                { opacity: bayarOpacity1 },
              ]}
            />
            <Animated.Image
              source={{ uri: ICON_BAYAR_2 }}
              style={[styles.optionIcon, { opacity: bayarOpacity2 }]}
            />
            <Text style={styles.optionLabel}>Barcodes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* Top Bar */
  topBar: {
    backgroundColor: "rgba(82, 59, 142, 0.8)",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginLeft: 16,
    marginRight: 8,
  },
  backArrow: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  topBarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 8,
  },
  topBarSubtitle: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },

  /* Camera / Background */
  cameraContainer: {
    flex: 1,
    position: "relative",
  },
  cameraBackground: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  /* Scanning line */
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#4C9EEB",
  },

  /* Overlaid Buttons */
  buttonOverlay: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  actionButton: {
    backgroundColor: "rgba(224, 224, 224, 0.7)",
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 50,
  },
  actionButtonText: {
    fontSize: 14,
    color: "#000",
  },

  /* Bottom White Panel */
  bottomPanel: {
    backgroundColor: "#fff",
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
    textAlign: "left",
  },
  footerButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerOption: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    width: 120,
    height: 80,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  absoluteIcon: {
    position: "absolute",
  },
  optionIcon: {
    width: 32,
    height: 32,
    marginBottom: 6,
    resizeMode: "contain",
  },
  optionLabel: {
    fontSize: 13,
    color: "#000",
    fontWeight: "500",
    marginTop: 30,
  },
});
