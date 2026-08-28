import { colors } from "@/theme/colors";
import type { ReactNode } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AuthScreenLayoutProps = {
  children: ReactNode;
  onBack: () => void;
  contentContainerStyle?: ViewStyle;
};

export default function AuthScreenLayout({
  children,
  onBack,
  contentContainerStyle,
}: AuthScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("@/assets/images/auth/onboarding-waves.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={onBack}>
            <Image
              source={require("@/assets/images/backbtn.png")}
              resizeMode="contain"
              style={styles.backIcon}
            />
          </Pressable>

          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/auth/logo-text.png")}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>

          <View style={styles.formContainer}>{children}</View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  background: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },

  backIcon: {
    width: 30,
    height: 30,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: "100%",
    maxWidth: 280,
    height: 112,
  },
  formContainer: {
    width: "100%",
    marginTop: 28,
  },
});
