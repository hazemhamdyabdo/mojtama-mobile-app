import RegisterRoleScreen from "@/features/auth/components/RegisterRoleScreen";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const SPLASH_DURATION_MS = 2000;
const FADE_DURATION_MS = 600;

export default function Onboarding() {
  const splashOpacity = useSharedValue(1);
  const contentOpacity = useSharedValue(0);
  const contentScale = useSharedValue(0.98);

  useEffect(() => {
    const timeout = setTimeout(() => {
      splashOpacity.value = withTiming(0, {
        duration: FADE_DURATION_MS,
        easing: Easing.out(Easing.cubic),
      });
      contentOpacity.value = withTiming(1, {
        duration: FADE_DURATION_MS,
        easing: Easing.out(Easing.cubic),
      });
      contentScale.value = withTiming(1, {
        duration: FADE_DURATION_MS,
        easing: Easing.out(Easing.cubic),
      });
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [contentOpacity, contentScale, splashOpacity]);

  const splashAnimatedStyle = useAnimatedStyle(() => ({
    opacity: splashOpacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ scale: contentScale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.layer, contentAnimatedStyle]}>
        <RegisterRoleScreen />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[styles.layer, splashAnimatedStyle]}
      >
        <Animated.Image
          source={require("../../../assets/images/onboarding.jpg")}
          style={styles.splashImage}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layer: {
    ...StyleSheet.absoluteFill,
  },
  splashImage: {
    width: "100%",
    height: "100%",
  },
});
