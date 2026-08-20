import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export default function Onboarding() {
  const [showOnboardingImage, setShowOnboardingImage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowOnboardingImage(false);
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {showOnboardingImage && (
        <Image
          source={require("../../../assets/images/onboarding.jpg")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      )}
      {!showOnboardingImage && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Onboarding</Text>
        </View>
      )}
    </View>
  );
}
