import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Animated,
  Dimensions,
  Pressable,
  PanResponder,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronRight,
  Star,
  DollarSign,
  Bookmark,
  Link2,
  HelpCircle,
  Key,
  Fingerprint,
  Award,
  BookOpen,
  FileText,
  Shield as ShieldIcon,
  Info,
  ChevronDown,
} from "lucide-react-native";

// Constants
const OVO_PURPLE = "#523B8E";
const LIGHT_BLUE_BANNER = "#E6F7FF";
const INFO_ICON_BLUE = "#096DD9";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const BOTTOM_SHEET_HEIGHT = 350; // Adjusted height for barcode
const MODAL_HORIZONTAL_MARGIN = 16;
const MODAL_WIDTH = SCREEN_WIDTH - MODAL_HORIZONTAL_MARGIN * 2;
const CENTER_OFFSET = (SCREEN_HEIGHT - BOTTOM_SHEET_HEIGHT) / 2;
const CLOSE_THRESHOLD = BOTTOM_SHEET_HEIGHT * 0.4;
const UPGRADE_MODAL_HEIGHT = Dimensions.get('window').height * 0.8;
const BANNER_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJHtPcoatit8tCRTmJrFojp2etyLH_Hlgx4A&s";
const ICON_SALDO = "https://thumbs.dreamstime.com/b/money-tree-prosperity-symbol-logo-vector-icon-197619860.jpg";
const ICON_BEBAS = "https://thumbs.dreamstime.com/b/no-cost-icon-no-expense-free-charge-crossed-out-red-prohibition-sign-dollar-coin-isolated-vector-illustration-no-cost-248782312.jpg";
const ICON_PROMO = "https://www.shutterstock.com/image-vector/limited-offer-banner-sale-clock-600nw-1912324219.jpg";
const ICON_GIVEAWAY = "https://media.istockphoto.com/id/1308604835/vector/neon-sign-giveaway-on-brick-wall-background.jpg?s=612x612&w=0&k=20&c=OpcMViq7_TCK8t7to9iCTw6GtATaWu32TztM4OYgmzA=";
const ICON_PROCESS = "https://static.vecteezy.com/system/resources/previews/015/693/608/non_2x/stopwatch-logo-icon-vector.jpg";
const POINTS_MODAL_HEIGHT = Dimensions.get('window').height * 0.85;
const STAMP_MODAL_HEIGHT = Dimensions.get('window').height * 0.7;

// Simple Barcode Simulator Component
const BarcodeSimulator = () => {
  // Define a pattern of bar widths
  const barPattern = [
    2, 1, 3, 1, 2, 1, 1, 3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2,
    1, 1, 3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 3, 1, 2,
    1, 3, 2, 1, 1, 2, 3, 1, 1, 2,
  ];

  return (
    <View style={styles.barcodeContainerStyle}>
      {barPattern.map((width, index) => (
        <View
          key={index}
          style={[styles.barStyle, { width: width * 1.5 }]} // Multiply for visual width
        />
      ))}
    </View>
  );
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [isUpgradeModalVisible, setUpgradeModalVisible] = useState(false);
const upgradeSlideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
const [isPointsModalVisible, setPointsModalVisible] = useState(false);
const [activeTab, setActiveTab] = useState("Didapat"); // Add tab state
const pointsSlideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
const [isStampModalVisible, setStampModalVisible] = useState(false);
const [isStampActive, setIsStampActive] = useState(false);
const stampSlideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
const [isConnectedAppsModalVisible, setConnectedAppsModalVisible] = useState(false);
const connectedAppsSlideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const toggleFingerprint = () => {
    setFingerprintEnabled(!fingerprintEnabled);
  };

  const renderFeature = (icon: string, text: string) => (
    <View style={styles.upgradeFeatureItem}>
      <Image source={{ uri: icon }} style={styles.upgradeFeatureIcon} />
      <Text style={styles.upgradeFeatureText}>{text}</Text>
    </View>
  );

  const animateClose = (callback?: () => void) => {
    Animated.spring(slideAnim, {
      toValue: SCREEN_HEIGHT,
      useNativeDriver: false,
    }).start(() => {
      setModalVisible(false);
      callback?.(); // Execute callback after closing
    });
  };

  const animateOpen = () => {
    setModalVisible(true);
    Animated.spring(slideAnim, {
      toValue: CENTER_OFFSET,
      useNativeDriver: false,
    }).start();
  };

  const openUpgradeModal = () => {
    setUpgradeModalVisible(true);
    Animated.spring(upgradeSlideAnim, {
      toValue: (SCREEN_HEIGHT - UPGRADE_MODAL_HEIGHT) / 2,
      useNativeDriver: false,
    }).start();
  };
  
  const closeUpgradeModal = () => {
    Animated.spring(upgradeSlideAnim, {
      toValue: SCREEN_HEIGHT,
      useNativeDriver: false,
    }).start(() => setUpgradeModalVisible(false));
  };

  const openPointsModal = () => {
    setPointsModalVisible(true);
    Animated.spring(pointsSlideAnim, {
      toValue: (SCREEN_HEIGHT - POINTS_MODAL_HEIGHT) / 2,
      useNativeDriver: false,
    }).start();
  };

  const closePointsModal = () => {
    Animated.spring(pointsSlideAnim, {
      toValue: SCREEN_HEIGHT,
      useNativeDriver: false,
    }).start(() => setPointsModalVisible(false));
  };

  const openStampModal = () => {
    setStampModalVisible(true);
    Animated.spring(stampSlideAnim, {
      toValue: (SCREEN_HEIGHT - STAMP_MODAL_HEIGHT) / 2,
      useNativeDriver: false,
    }).start();
  };
  
  const closeStampModal = () => {
    Animated.spring(stampSlideAnim, {
      toValue: SCREEN_HEIGHT,
      useNativeDriver: false,
    }).start(() => setStampModalVisible(false));
  };

  const openConnectedAppsModal = () => {
    setConnectedAppsModalVisible(true);
    Animated.spring(connectedAppsSlideAnim, {
      toValue: (SCREEN_HEIGHT - POINTS_MODAL_HEIGHT) / 2,
      useNativeDriver: false,
    }).start();
  };
  
  const closeConnectedAppsModal = () => {
    Animated.spring(connectedAppsSlideAnim, {
      toValue: SCREEN_HEIGHT,
      useNativeDriver: false,
    }).start(() => setConnectedAppsModalVisible(false));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx) &&
          Math.abs(gestureState.dy) > 5
        );
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(CENTER_OFFSET + gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > CLOSE_THRESHOLD || gestureState.vy > 0.5) {
          animateClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: CENTER_OFFSET,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* --- Existing profile section --- */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop",
            }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Raka SWAT</Text>
            <Text style={styles.profilePhone}>081232927487</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* 
           "Loyalty Code" with Barcode on the LEFT 
           and ">" chevron on the RIGHT 
        */}
        <View style={styles.loyaltyContainer}>
          <TouchableOpacity style={styles.loyaltyButton} onPress={animateOpen}>
            {/* Left side: mini barcode + text */}
            <View style={styles.loyaltyLeft}>
              <View style={styles.loyaltyMiniBarcodeContainer}>
                <BarcodeSimulator />
              </View>
              <Text style={styles.loyaltyLabel}>Loyalty Code</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionHeader}>Account</Text>
        <View style={styles.sectionItem}>
          <View style={styles.itemRow}>
            <Star size={20} color="#4C9EEB" style={styles.itemIcon} />
            <Text style={styles.sectionItemText}>OVO Premier</Text>
          </View>
          <TouchableOpacity style={styles.upgradeButton} onPress={openUpgradeModal}>
            <Text style={styles.upgradeButtonText}>Upgrade</Text>
          </TouchableOpacity>
        </View>

        {/* Starting from "OVO Points" to "Privacy Policy" use Pressable */}
        <Pressable
          style={styles.sectionItem}
          onPress={openPointsModal}
        >
          <View style={styles.itemRow}>
            <DollarSign size={20} color="#4C9EEB" style={styles.itemIcon} />
            <Text style={styles.sectionItemText}>OVO Points</Text>
          </View>
          <ChevronRight color="#999" size={20} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.sectionItem,
            pressed && styles.sectionItemPressed,
          ]}
          onPress={openStampModal}
        >
          <View style={styles.itemRow}>
            <Bookmark size={20} color="#4C9EEB" style={styles.itemIcon} />
            <Text style={styles.sectionItemText}>OVO Stamp</Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.sectionItem,
            pressed && styles.sectionItemPressed,
          ]}
          onPress={openConnectedAppsModal}
        >
          <View style={styles.itemRow}>
            <Link2 size={20} color="#4C9EEB" style={styles.itemIcon} />
            <Text style={styles.sectionItemText}>Connected Apps</Text>
          </View>
          <ChevronRight color="#999" size={20} />
        </Pressable>

        {/* Help Section */}
        <Text style={styles.sectionHeader}>Help</Text>
        <Pressable
          style={({ pressed }) => [
            styles.sectionItem,
            pressed && styles.sectionItemPressed,
          ]}
          onPress={() => {}}
        >
          <View style={styles.itemRow}>
            <HelpCircle size={20} color="#4C9EEB" style={styles.itemIcon} />
            <Text style={styles.sectionItemText}>Help Center</Text>
          </View>
          <ChevronRight color="#999" size={20} />
        </Pressable>

        {/* Security Section */}
        <Text style={styles.sectionHeader}>Security</Text>
        <Pressable
          style={({ pressed }) => [
            styles.sectionItem,
            pressed && styles.sectionItemPressed,
          ]}
          onPress={() => {}}
        >
          <View style={styles.itemRow}>
            <Key size={20} color="#4C9EEB" style={styles.itemIcon} />
            <Text style={styles.sectionItemText}>Change Security Code</Text>
          </View>
          <ChevronRight color="#999" size={20} />
        </Pressable>

        {/* For Fingerprint we wrap with Pressable too – the Switch remains interactive */}
        <Pressable
          style={({ pressed }) => [
            styles.sectionItem,
            pressed && styles.sectionItemPressed,
          ]}
          onPress={() => {}}
        >
          <View style={styles.itemRow}>
            <Fingerprint size={20} color="#4C9EEB" style={styles.itemIcon} />
            <Text style={styles.sectionItemText}>Fingerprint</Text>
          </View>
          <Switch value={fingerprintEnabled} onValueChange={toggleFingerprint} />
        </Pressable>

        {/* About Section */}
        <Text style={styles.sectionHeader}>About</Text>
        <Pressable
          style={({ pressed }) => [
            styles.sectionItem,
            pressed && styles.sectionItemPressed,
          ]}
          onPress={() => {}}
        >
          <View style={styles.itemRow}>
            <Award size={20} color="#4C9EEB" style={styles.itemIcon} />
            <Text style={styles.sectionItemText}>Benefits Using OVO</Text>
          </View>
          <ChevronRight color="#999" size={20} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.sectionItem,
            pressed && styles.sectionItemPressed,
          ]}
          onPress={() => {}}
        >
          <View style={styles.itemRow}>
            <BookOpen size={20} color="#4C9EEB" style={styles.itemIcon} />
            <Text style={styles.sectionItemText}>OVO Guides</Text>
          </View>
          <ChevronRight color="#999" size={20} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.sectionItem,
            pressed && styles.sectionItemPressed,
          ]}
          onPress={() => {}}
        >
          <View style={styles.itemRow}>
            <FileText size={20} color="#4C9EEB" style={styles.itemIcon} />
            <Text style={styles.sectionItemText}>Terms and Conditions</Text>
          </View>
          <ChevronRight color="#999" size={20} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.sectionItem,
            pressed && styles.sectionItemPressed,
          ]}
          onPress={() => {}}
        >
          <View style={styles.itemRow}>
            <ShieldIcon size={20} color="#4C9EEB" style={styles.itemIcon} />
            <Text style={styles.sectionItemText}>Privacy Policy</Text>
          </View>
          <ChevronRight color="#999" size={20} />
        </Pressable>

        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>Version 3.129.2 (537)</Text>
        <Text style={styles.hashtagText}>#pakeOVOaja</Text>
      </ScrollView>

      {/* MODIFIED Loyalty Code Bottom Sheet / Modal */}
      {isModalVisible && (
        <>
          <Pressable style={styles.overlay} onPress={() => animateClose()} />
          <Animated.View
            style={[styles.bottomSheet, { top: slideAnim }]}
            {...panResponder.panHandlers}
          >
            <Text style={styles.modalTitle}>Loyalty Code</Text>
            <View style={styles.infoBanner}>
              <View style={styles.infoBannerLeft}>
                <Info
                  size={20}
                  color={INFO_ICON_BLUE}
                  style={styles.infoIconStyle}
                />
                <Text style={styles.infoText}>Belanja di Indomaret?</Text>
              </View>
              <TouchableOpacity
                style={styles.viewCodeButton}
                onPress={() =>
                  animateClose(() => navigation.navigate("Scan" as never))
                }
              >
                <Text style={styles.viewCodeText}>Lihat Kode</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loyaltyCodeContainer}>
              <BarcodeSimulator />
              <Text style={styles.loyaltyCodeNumber}>8009420418461600</Text>
            </View>
            <View style={styles.closingContainer}>
              <Text style={styles.swipeInstruction}>
                Geser ke bawah untuk menutup
              </Text>
              <ChevronDown size={20} color="#666" style={styles.swipeIcon} />
            </View>
          </Animated.View>
        </>
      )}

{isUpgradeModalVisible && (
  <>
    <Pressable 
      style={styles.upgradeOverlay} 
      onPress={closeUpgradeModal}
    />
    <Animated.View
      style={[
        styles.upgradeModal,
        { top: upgradeSlideAnim, height: UPGRADE_MODAL_HEIGHT }
      ]}
    >
      <ScrollView contentContainerStyle={styles.upgradeScrollContent}>
        {/* Upgrade Modal Content */}
        <Text style={styles.upgradeTitle}>#GakAdaRuginya</Text>
        <Text style={styles.upgradeSubtitle}>Dompet digital seuntung deposito</Text>

        <Image
          source={{ uri: BANNER_IMG }}
          style={styles.upgradeBanner}
          resizeMode="contain"
        />

        {/* Features Rows */}
        <View style={styles.upgradeFeaturesContainer}>
          {renderFeature(ICON_SALDO, "Saldo berbunga 5.00% p.a.")}
          {renderFeature(ICON_BEBAS, "BEBAS biaya admin bulanan")}
          {renderFeature(ICON_PROCESS, "BEBAS minimum saldo")}
        </View>

        <View style={styles.upgradeFeaturesContainer}>
          {renderFeature(ICON_PROMO, "Promo eksklusif s.d. Rp80.000")}
          {renderFeature(ICON_GIVEAWAY, "Giveaway s.d. Rp10 juta")}
          {renderFeature(ICON_PROCESS, "Proses upgrade mudah & cepat")}
        </View>

        {/* Info Sections */}
        <Text style={styles.upgradeNote}>
          OVO Cash bakal otomatis dipindah ke OVO Nabung biar bunganya maksimal.
        </Text>

        <TouchableOpacity>
          <Text style={styles.upgradeLink}>
            Lihat Bunga, Biaya, Limit, dan RIPLAY
          </Text>
        </TouchableOpacity>

        {/* Cards */}
        <View style={styles.upgradeCard}>
          <Text style={styles.upgradeCardTitle}>Udah punya Superbank?</Text>
          <Text style={styles.upgradeCardText}>
            Pastikan no. HP Superbank beda dari OVO, atau sebaliknya. 
            Jika punyanya sama, hubungi support untuk upgrade.
          </Text>
          
          <Text style={[styles.upgradeCardTitle, styles.cardTitleSpacing]}>
            Belum punya Superbank?
          </Text>
          <Text style={styles.upgradeCardText}>
            Bikin akun Superbank dengan nomor HP baru.
            Dapat ekstra benefit setelah upgrade.
          </Text>
        </View>

        <View style={styles.upgradeCard}>
          <Text style={styles.upgradeCardSubtitle}>
            Ekstra untung lewat aplikasi Superbank
          </Text>
          <Text style={styles.upgradeBullet}>- Bunga berbunga 10% p.a.</Text>
          <Text style={styles.upgradeBullet}>- BEBAS 20 ribu per bulan</Text>
          <Text style={styles.upgradeBullet}>- Pinjaman fleksibel dan cepat cair</Text>
          <Text style={styles.upgradeCardText}>
            OVO Nabung by Superbank adalah produk PT Super Bank Indonesia.
            Bekerja sama dengan PT Visionet Internasional
            (OVO) sebagai penunjang pelayanan...
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.upgradeActionButton}
          onPress={closeUpgradeModal}
        >
          <Text style={styles.upgradeActionText}>Upgrade Gratis</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  </>
)}

{isPointsModalVisible && (
  <>
    <Pressable 
      style={styles.pointsOverlay} 
      onPress={closePointsModal}
    />
    <Animated.View
      style={[
        styles.pointsModal,
        { top: pointsSlideAnim, height: POINTS_MODAL_HEIGHT }
      ]}
    >
      <ScrollView contentContainerStyle={styles.pointsScrollContent}>
        {/* Points Modal Content */}
        <View style={styles.pointsHeaderContainer}>
          <Text style={styles.pointsTitle}>OVO Points</Text>
          <Text style={styles.pointsBalance}>4.520</Text>
          <Text style={styles.pointsEquivalent}>Setara Rp4.520</Text>
        </View>

        <View style={styles.pointsTabContainer}>
          {["Didapat", "Terpakai"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.pointsTabButton,
                activeTab === tab && styles.pointsTabButtonActive
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.pointsTabText,
                activeTab === tab && styles.pointsTabTextActive
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "Didapat" ? (
          <View style={styles.pointsListContainer}>
            <Text style={styles.pointsMonthLabel}>April 2025</Text>
            <View style={styles.pointsItem}>
              <Text style={styles.pointsItemDate}>7 Apr 2025</Text>
              <Text style={styles.pointsItemDesc}>Telkomsel</Text>
              <Text style={styles.pointsItemPoints}>4.500 Points</Text>
              <Text style={styles.pointsItemValidity}>Berlaku s.d 7 Apr 2026</Text>
            </View>

            <Text style={styles.pointsMonthLabel}>March 2025</Text>
            <View style={styles.pointsItem}>
              <Text style={styles.pointsItemDate}>22 Mar 2025</Text>
              <Text style={styles.pointsItemDesc}>Mandiri e-money</Text>
              <Text style={styles.pointsItemPoints}>10 Points</Text>
              <Text style={styles.pointsItemValidity}>Berlaku s.d 22 Mar 2026</Text>
            </View>
          </View>
        ) : (
          <View style={styles.pointsListContainer}>
            <Text style={styles.pointsMonthLabel}>Belum Ada Data</Text>
          </View>
        )}
      </ScrollView>
    </Animated.View>
  </>
)}

{isStampModalVisible && (
  <>
    <Pressable 
      style={styles.stampOverlay} 
      onPress={closeStampModal}
    />
    <Animated.View
      style={[
        styles.stampModal,
        { top: stampSlideAnim, height: STAMP_MODAL_HEIGHT }
      ]}
    >
      <ScrollView contentContainerStyle={styles.stampScrollContent}>
        {/* Header with Switch */}
        <View style={styles.stampHeader}>
          <Text style={styles.stampTitle}>OVO Stamp</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              {isStampActive ? 'Aktif' : 'Tidak Aktif'}
            </Text>
            <Switch
              value={isStampActive}
              onValueChange={setIsStampActive}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isStampActive ? '#523B8E' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Stamp Items */}
        <View style={styles.stampItem}>
          <Text style={styles.stampItemTitle}>OVO Stamp SPBU Shell April</Text>
          <View style={styles.stampItemRow}>
            <Text style={styles.stampPoints}>40.000 OVO Points</Text>
            <Text style={styles.stampStatus}>Belum dikerjain</Text>
          </View>
          <Text style={styles.stampValidity}>Berlaku s.d. 30 Apr 2025</Text>
        </View>

        <View style={styles.stampItem}>
          <Text style={styles.stampItemTitle}>OVO Stamp BP AKR April</Text>
          <View style={styles.stampItemRow}>
            <Text style={styles.stampPoints}>40.000 OVO Points</Text>
            <Text style={styles.stampStatus}>Belum dikerjain</Text>
          </View>
          <Text style={styles.stampValidity}>Berlaku s.d. 30 Apr 2025</Text>
        </View>
      </ScrollView>
    </Animated.View>
  </>
)}

{isConnectedAppsModalVisible && (
  <>
    <Pressable 
      style={styles.connectedAppsOverlay} 
      onPress={closeConnectedAppsModal}
    />
    <Animated.View
      style={[
        styles.connectedAppsModal,
        { top: connectedAppsSlideAnim, height: POINTS_MODAL_HEIGHT }
      ]}
    >
      <ScrollView contentContainerStyle={styles.connectedAppsScrollContent}>
        <Text style={styles.connectedAppsTitle}>Aplikasi Terhubung</Text>
        
        {/* Grab Section */}
        <View style={styles.connectedAppItem}>
          <Text style={styles.appName}>Grab</Text>
          <Text style={styles.accountCount}>1 akun terhubung</Text>
          <TouchableOpacity style={styles.disconnectButton}>
            <Text style={styles.disconnectText}>Putuskan</Text>
          </TouchableOpacity>
        </View>

        {/* Tokopedia Section */}
        <View style={styles.connectedAppItem}>
          <Text style={styles.appName}>Tokopedia</Text>
          <Text style={styles.accountCount}>2 akun terhubung</Text>
          <TouchableOpacity style={styles.disconnectButton}>
            <Text style={styles.disconnectText}>Putuskan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  </>
)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
    justifyContent: "center",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#4C9EEB",
    borderRadius: 6,
  },
  editButtonText: {
    color: "#4C9EEB",
    fontSize: 14,
    fontWeight: "500",
  },
  /* Loyalty Code Button */
  loyaltyContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 4,
    paddingHorizontal: 130,
    paddingVertical: 10,
  },
  loyaltyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loyaltyLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  loyaltyMiniBarcodeContainer: {
    // A small container for the mini-barcode
    width: 28,    // tweak as desired
    height: 28,   // tweak as desired
    marginRight: 10,
    overflow: "hidden",
    justifyContent: "center",
  },
  loyaltyLabel: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  loyaltyArrowContainer: {
    paddingLeft: 8,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 16,
    color: "#999",
    fontSize: 13,
    fontWeight: "600",
  },
  // Original sectionItem style preserved
  sectionItem: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // New style for active (pressed) effect on section items
  sectionItemPressed: {
    backgroundColor: "#F2F2F2",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    marginRight: 8,
  },
  sectionItemText: {
    fontSize: 15,
    color: "#000",
  },
  upgradeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: OVO_PURPLE,
    paddingHorizontal: 35,
    paddingVertical: 6,
    borderRadius: 30,
    justifyContent: "center",
  },
  upgradeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  signOutButton: {
    backgroundColor: OVO_PURPLE,
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  signOutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  versionText: {
    color: "#999",
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
  hashtagText: {
    color: "#999",
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 999,
  },
  bottomSheet: {
    position: "absolute",
    alignSelf: "center",
    width: MODAL_WIDTH,
    height: BOTTOM_SHEET_HEIGHT,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    zIndex: 1000,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: LIGHT_BLUE_BANNER,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  infoIconStyle: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },
  viewCodeButton: {
    marginLeft: 8,
  },
  viewCodeText: {
    fontSize: 14,
    color: INFO_ICON_BLUE,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  loyaltyCodeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Styles for Barcode Simulator
  barcodeContainerStyle: {
    flexDirection: "row",
    height: 60,
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 16,
    overflow: "hidden",
    maxWidth: "90%",
  },
  barStyle: {
    backgroundColor: "black",
    height: "100%",
    marginHorizontal: 0.5,
  },
  loyaltyCodeNumber: {
    fontSize: 26,
    fontWeight: "600",
    letterSpacing: 3,
    color: "#000",
    textAlign: "center",
    marginTop: 8,
  },
  closingContainer: {
    alignItems: "center",
    marginTop: "auto",
    paddingBottom: 10,
  },
  swipeInstruction: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 4,
  },
  swipeIcon: {},
  upgradeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1001,
  },
  upgradeModal: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    zIndex: 1002,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  upgradeScrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  upgradeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginTop: 24,
  },
  upgradeSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  upgradeBanner: {
    width: '100%',
    height: 160,
    marginBottom: 16,
  },
  upgradeFeaturesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  upgradeFeatureItem: {
    width: 100,
    alignItems: 'center',
  },
  upgradeFeatureIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  upgradeFeatureText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  upgradeNote: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
  },
  upgradeLink: {
    fontSize: 13,
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 16,
    textDecorationLine: 'underline',
  },
  upgradeCard: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  upgradeCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000',
  },
  upgradeCardSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  upgradeCardText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  upgradeBullet: {
    fontSize: 14,
    color: '#444',
    marginLeft: 8,
    marginBottom: 4,
  },
  cardTitleSpacing: {
    marginTop: 16,
  },
  upgradeActionButton: {
    backgroundColor: '#523B8E',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 16,
    alignItems: 'center',
  },
  upgradeActionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  pointsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1003,
  },
  pointsModal: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 1004,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  pointsScrollContent: {
    paddingBottom: 40,
  },
  pointsHeaderContainer: {
    alignItems: "center",
    paddingTop: 24,
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
  pointsTabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 8,
  },
  pointsTabButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  pointsTabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#523B8E",
  },
  pointsTabText: {
    fontSize: 14,
    color: "#666",
  },
  pointsTabTextActive: {
    color: "#523B8E",
    fontWeight: "600",
  },
  pointsListContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  pointsMonthLabel: {
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
  pointsItemDate: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  pointsItemDesc: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  pointsItemPoints: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
    marginTop: 4,
  },
  pointsItemValidity: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  stampOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1005,
  },
  stampModal: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 1006,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 16,
  },
  stampScrollContent: {
    paddingBottom: 40,
  },
  stampHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stampTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#666',
  },
  stampItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  stampItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  stampItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stampPoints: {
    fontSize: 14,
    color: '#523B8E',
    fontWeight: '600',
  },
  stampStatus: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  stampValidity: {
    fontSize: 12,
    color: '#999',
  },
  connectedAppsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1007,
  },
  connectedAppsModal: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 1008,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  connectedAppsScrollContent: {
    padding: 16,
  },
  connectedAppsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  connectedAppItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  accountCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  disconnectButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
  },
  disconnectText: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: '500',
  },
});
