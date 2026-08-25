import { Image } from "expo-image";
import type { ImageSourcePropType } from "react-native";
import { View } from "react-native";

type PaymentProviderLogoProps = {
  logo: ImageSourcePropType;
  size?: number;
};

export default function PaymentProviderLogo({
  logo,
  size = 40,
}: PaymentProviderLogoProps) {
  return (
    <View
      className="items-center justify-center overflow-hidden rounded-lg bg-white"
      style={{ width: size, height: size }}
    >
      <Image
        source={logo}
        contentFit="contain"
        style={{ width: size - 8, height: size - 8 }}
      />
    </View>
  );
}
