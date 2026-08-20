import { Image, View } from "react-native";

export default function Onboarding() {
  return (
    <View>
      <Image
        source={require("../../../assets/images/onboarding.jpg")}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
