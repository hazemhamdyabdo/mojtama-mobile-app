import LoginForm from "@/features/auth/components/LoginForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace({
      pathname: "/language-choice",
      params: role ? { role } : undefined,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("@/assets/images/auth/onboarding-waves.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={handleBack}>
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

          <View style={styles.formContainer}>
            <LoginForm />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
