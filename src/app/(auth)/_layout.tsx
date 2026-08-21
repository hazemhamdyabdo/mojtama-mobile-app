import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export default function AuthLayout() {
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.layer, contentAnimatedStyle]}>
        <Stack screenOptions={{ headerShown: false }} />
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
});
