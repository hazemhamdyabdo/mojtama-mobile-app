import LanguageChoice from "@/features/auth/components/LanguageChoice";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export default function LanguageChoiceScreen() {
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.layer, contentAnimatedStyle]}>
        <LanguageChoice />
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
