import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowUpRight, ArrowDownToLine } from "lucide-react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

// Quick actions row (top up, transfer, etc.)
const quickActions = [
  {
    label: "Top Up",
    iconUri:
      "https://www.shutterstock.com/image-vector/black-three-arrows-vector-icon-260nw-2456119821.jpg",
  },
  {
    label: "Transfer",
    iconUri:
      "https://www.shutterstock.com/image-vector/money-transfer-logo-template-vector-260nw-1451771801.jpg",
  },
  {
    label: "Withdraw Cash",
    iconUri:
      "https://www.shutterstock.com/image-vector/cash-withdrawal-icon-logo-isolated-260nw-1844172043.jpg",
  },
  {
    label: "History",
    iconUri:
      "https://as2.ftcdn.net/jpg/06/06/16/99/1000_F_606169904_aESCqz2kJElUmaE0uXGNkEov6h1jPagG.jpg",
  },
];

// Category data for the combined section
const categoriesData = [
  {
    title: "Favorite",
    items: [
      {
        name: "Nabung by Superbank",
        iconUri:
          "https://icongeneratorai.com/api/images/83b8aeb9-0208-4873-b331-58ac0acb9b20.jpg",
      },
      {
        name: "Loan",
        iconUri:
          "https://i.pinimg.com/736x/e3/c1/fa/e3c1faf4a6377c38bcc4b7aff4aaba2e.jpg",
      },
      {
        name: "E-Money",
        iconUri:
          "https://assets-a1.kompasiana.com/items/album/2024/09/28/0c2b0b71-b33a-4d32-bc0f-cd701e00bed0-66f76a6e34777c3fb424faf2.png?t=o&v=780",
      },
      {
        name: "Credits",
        iconUri:
          "https://www.shutterstock.com/image-vector/credit-card-icon-vector-logo-260nw-1177167646.jpg",
      },
    ],
  },
  {
    title: "Other Options",
    items: [
      {
        name: "BPJS Kesehatan",
        iconUri:
          "https://mpp.palembang.go.id/static/logo/1661780974.png.png",
      },
      {
        name: "Telkomsel",
        iconUri:
          "https://canggih.id/wp-content/uploads/2021/06/logo-baru-telkomsel.jpg",
      },
      {
        name: "Environment Fees",
        iconUri:
          "https://static.vecteezy.com/system/resources/previews/007/634/526/non_2x/environment-logo-icon-design-template-free-vector.jpg",
      },
      {
        name: "State Revenue",
        iconUri: "https://cdn-icons-png.freepik.com/512/6019/6019840.png",
      },
      {
        name: "Postpaid",
        iconUri:
          "https://cdn.iconscout.com/icon/premium/png-256-thumb/postpaid-3623957-3040467.png",
      },
      {
        name: "PBB",
        iconUri: "https://cdn-icons-png.freepik.com/512/8744/8744976.png",
      },
      {
        name: "Education",
        iconUri:
          "https://w7.pngwing.com/pngs/310/448/png-transparent-study-skills-education-learning-computer-icons-sc-logo-angle-hat-teacher.png",
      },
      {
        name: "Others",
        iconUri: "https://static.thenounproject.com/png/1380510-200.png",
      },
    ],
  },
  {
    title: "Grab",
    items: [
      {
        name: "Food",
        iconUri:
          "https://i.pinimg.com/736x/90/06/a6/9006a66d44bfa5efd35c1c61545fde92.jpg",
      },
      {
        name: "Bike",
        iconUri:
          "https://e7.pngegg.com/pngimages/482/155/png-clipart-android-grab-whatsapp-android-food-text.png",
      },
      {
        name: "Car",
        iconUri:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7F3L7FTQVJifa2Q2qZZO-h_drKiC2yMDn8ynYydjSeFvGGbLe6rnMRZecfClJDvu5Ej0mj8-iQgNppe-wnQLrmjoLS8Mi6P07QPnRzLYx03_8rEtaN4dVE9jTI06ARRq1oQmQZq3mHWg/s400/GrabCar.png",
      },
      {
        name: "Mart",
        iconUri: "https://ugc.production.linktr.ee/JwXQaAw9Q8W74kW4Lsh7_GRAB.png",
      },
      {
        name: "Express",
        iconUri:
          "https://img.freepik.com/free-psd/paper-parcel-delivery-box-icon-isolated-3d-render-illustration_439185-12621.jpg?semt=ais_hybrid&w=740",
      },
      {
        name: "Packages",
        iconUri:
          "https://img.freepik.com/premium-vector/packaging-box-icon-vector-logo-template_917138-1362.jpg?w=360",
      },
      {
        name: "Offers",
        iconUri:
          "https://w7.pngwing.com/pngs/67/521/png-transparent-computer-icons-offers-text-logo-discount.png",
      },
      {
        name: "All",
        iconUri:
          "https://static.vecteezy.com/system/resources/previews/015/693/637/non_2x/line-art-of-globe-logo-vector.jpg",
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        name: "U Card",
        iconUri:
          "file:///C:/Users/rakai/Downloads/openart-image_ypOzh6xB_1744043053147_raw.png",
      },
      {
        name: "Protection",
        iconUri:
          "https://media.istockphoto.com/id/1266892400/vector/shield-and-sword-icon-vector-logo-design-template.jpg?s=612x612&w=0&k=20&c=864Re4Wdc8F6ww7UyWgEcDuKycVEIHub6_OBaRbogog=",
      },
    ],
  },
];

const recommendedItems = [
  {
    title: "OVO Nabung",
    subtitle: "Let's Upgrade to OVO Nabung",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0kEjucPBjcGaSwKLeQ09IWpzHynwzW36_-Q&s",
  },
  {
    title: "Online Promotion",
    subtitle: "Chase Cashback OVO with Kak Gem",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ZECSyyVAqEqm9K_IhAIrQ04QEXV3Cn5cVQ&s",
  },
];

export default function HomeScreen() {
  // State for active category tab
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Animated value for scroll position
  const scrollY = useRef(new Animated.Value(0)).current;

  // Interpolate top section height from 200 (expanded) to 80 (shrunk)
  const topSectionHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 80],
    extrapolate: "clamp",
  });

  // Interpolate quick actions row opacity and height from 1 & 70 to 0 & 0
  const quickActionsOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const quickActionsHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [70, 0],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Wrap all white content in a main wrapper with rounded top corners */}
      <View style={styles.mainWrapper}>
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          stickyHeaderIndices={[0]}
        >
          {/* TOP PURPLE SECTION (Sticky) */}
          <Animated.View style={[styles.topPurpleSection, { height: topSectionHeight }]}>
            <View style={styles.topInfoRow}>
              <View>
                <Text style={styles.ovoCashLabel}>OVO Cash</Text>
                <Text style={styles.balanceLabel}>Rp 11.332</Text>
              </View>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>20 Points</Text>
              </View>
            </View>
            <Animated.View
              style={[
                styles.quickActionsRow,
                {
                  opacity: quickActionsOpacity,
                  height: quickActionsHeight,
                  overflow: "hidden",
                },
              ]}
            >
              {quickActions.map((action, index) => (
                <TouchableOpacity key={index} style={styles.quickActionItem}>
                  <View style={styles.quickIconWrapper}>
                    <Image
                      source={{ uri: action.iconUri }}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.quickActionLabel}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </Animated.View>

          {/* PROMO BANNER */}
          <View style={styles.promoBanner}>
            <Text style={styles.promoText}>
              Do you want 5% interest? Let's upgrade to OVO Nabung!
            </Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Check OVO Nabung</Text>
            </TouchableOpacity>
          </View>

          {/* SINGLE BIG SECTION FOR CATEGORIES */}
          <View style={styles.categoriesContainer}>
            {/* Tabs Row */}
            <View style={styles.categoryTabsRow}>
              {categoriesData.map((cat, index) => {
                const isActive = index === activeCategoryIndex;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setActiveCategoryIndex(index)}
                    style={styles.categoryTab}
                  >
                    <Text
                      style={[styles.categoryTabText, isActive && styles.categoryTabTextActive]}
                    >
                      {cat.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* Content for the active category */}
            <View style={styles.categoryContent}>
              <View style={styles.categoryRow}>
                {categoriesData[activeCategoryIndex].items.map((item, idx) => (
                  <TouchableOpacity key={idx} style={styles.categoryItem}>
                    <Image source={{ uri: item.iconUri }} style={styles.categoryIcon} />
                    <Text style={styles.categoryLabel}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* REKOMENDASI SECTION */}
          <View style={styles.rekomendasiHeader}>
            <Text style={styles.rekomendasiTitle}>Choice Recommendation</Text>
            <TouchableOpacity>
              <Text style={styles.lihatSemua}>See All</Text>
            </TouchableOpacity>
          </View>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.rekomendasiScroll}
          >
            {recommendedItems.map((item, index) => (
              <View key={index} style={styles.rekomendasiCard}>
                <Image source={{ uri: item.imageUri }} style={styles.rekomendasiImage} />
                <Text style={styles.rekomendasiItemTitle}>{item.title}</Text>
                <Text style={styles.rekomendasiItemSubtitle}>{item.subtitle}</Text>
              </View>
            ))}
          </Animated.ScrollView>

          {/* KENALI OVO LEBIH DEKAT */}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoHeaderText}>Know OVO Much Closer</Text>
              <TouchableOpacity>
                <Text style={styles.infoCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.infoBody}>Let's know each others by checking the tips!</Text>
          </View>

          {/* YANG MENARIK DI OVO */}
          <View style={styles.infoSection}>
            <Text style={styles.infoHeaderText}>Anything Interesting in OVO</Text>
            <Text style={styles.infoBody}>
              Don't lie about you already updated your OVO app if you haven't checked THIS feature!
            </Text>
          </View>

          <View style={{ height: 80 }} />
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: "#F2F3F5",
    margin: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  // TOP PURPLE SECTION (Sticky Header)
  topPurpleSection: {
    backgroundColor: "#523B8E",
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  topInfoRow: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ovoCashLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  balanceLabel: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 4,
  },
  pointsContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pointsText: {
    color: "#523B8E",
    fontWeight: "600",
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  quickActionItem: {
    alignItems: "center",
  },
  quickIconWrapper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 51,
    height: 51,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  quickActionLabel: {
    color: "#fff",
    fontSize: 12,
  },
  // PROMO BANNER
  promoBanner: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  promoText: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  promoButton: {
    backgroundColor: "#523B8E",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  promoButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  // CATEGORIES SECTION
  categoriesContainer: {
    backgroundColor: "#fff",
    marginTop: 8,
    paddingBottom: 12,
  },
  categoryTabsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 12,
    marginBottom: 12,
  },
  categoryTab: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  categoryTabText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  categoryTabTextActive: {
    color: "#000",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  categoryContent: {
    paddingHorizontal: 16,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryItem: {
    width: "25%",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#eee",
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
  // REKOMENDASI SECTION
  rekomendasiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  rekomendasiTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  lihatSemua: {
    fontSize: 14,
    color: "#523B8E",
    fontWeight: "500",
  },
  rekomendasiScroll: {
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingVertical: 8,
  },
  rekomendasiCard: {
    width: SCREEN_WIDTH * 0.5,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    padding: 8,
  },
  rekomendasiImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  rekomendasiItemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  rekomendasiItemSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  // INFO SECTIONS
  infoSection: {
    backgroundColor: "#fff",
    marginTop: 8,
    padding: 16,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  infoCloseText: {
    color: "#523B8E",
    fontSize: 14,
    fontWeight: "500",
  },
  infoBody: {
    fontSize: 14,
    color: "#000",
    lineHeight: 18,
  },
});
