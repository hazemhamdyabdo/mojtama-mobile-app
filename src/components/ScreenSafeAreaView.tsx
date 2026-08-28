import { styled } from "nativewind";
import type { ComponentProps } from "react";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const StyledSafeAreaView = styled(RNSafeAreaView);

export type ScreenSafeAreaViewProps = ComponentProps<typeof StyledSafeAreaView>;

export default function ScreenSafeAreaView(props: ScreenSafeAreaViewProps) {
  return <StyledSafeAreaView {...props} />;
}
