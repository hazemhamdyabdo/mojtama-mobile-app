import { useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Role = "resident" | "manager";

type RoleCardProps = {
  title: string;
  imageSource: number;
  imagePosition: "left" | "right";
  backgroundColor: string;
  titleColor: string;
  subtitleColor: string;
  onPress: () => void;
};

function RoleCard({
  title,
  imageSource,
  imagePosition,
  backgroundColor,
  titleColor,
  subtitleColor,
  onPress,
}: RoleCardProps) {
  const textContent = (
    <View style={styles.cardText}>
      <Text style={[styles.cardSubtitle, { color: subtitleColor }]}>
        Register as
      </Text>
      <Text style={[styles.cardTitle, { color: titleColor }]}>{title}</Text>
    </View>
  );

  const imageContent = (
    <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor, opacity: pressed ? 0.92 : 1 },
      ]}
    >
      {imagePosition === "left" ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
    </Pressable>
  );
}

export default function RegisterRoleScreen() {
  const router = useRouter();

  const handleRolePress = (role: Role) => {
    router.push({
      pathname: "/register",
      params: { role },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("@/assets/images/auth/background-waves.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.logoSection}>
          <Image
            source={require("@/assets/images/auth/logo-mark.png")}
            style={styles.logoMark}
            resizeMode="contain"
          />
          <Text style={styles.brandName}>Mojtama</Text>
          <Text style={styles.brandNameArabic}>مجتمع</Text>
        </View>

        <View style={styles.cardContainer}>
          <RoleCard
            title="a Resident"
            imageSource={require("@/assets/images/auth/resident-keys.png")}
            imagePosition="left"
            backgroundColor="#6F57FF"
            titleColor="#FFFFFF"
            subtitleColor="rgba(255, 255, 255, 0.85)"
            onPress={() => handleRolePress("resident")}
          />

          <RoleCard
            title="a Manager"
            imageSource={require("@/assets/images/auth/manager-house.png")}
            imagePosition="right"
            backgroundColor="#ECE9FF"
            titleColor="#1F1F1F"
            subtitleColor="#5C5C5C"
            onPress={() => handleRolePress("manager")}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F8",
  },
  background: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    paddingBottom: 32,
  },
  logoMark: {
    width: 72,
    height: 72,
    marginBottom: 16,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F1F1F",
    letterSpacing: -0.5,
  },
  brandNameArabic: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: "600",
    color: "#1F1F1F",
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  card: {
    minHeight: 104,
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "stretch",
  },
  cardImage: {
    width: "42%",
    minHeight: 104,
  },
  cardText: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
});
