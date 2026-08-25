import { Pressable, Text } from "react-native";

type SettingsPrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function SettingsPrimaryButton({
  label,
  onPress,
  disabled = false,
}: SettingsPrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      className="w-full items-center justify-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92] disabled:opacity-70"
    >
      <Text className="text-base font-bold text-white">{label}</Text>
    </Pressable>
  );
}
