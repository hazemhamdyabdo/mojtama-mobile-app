import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import {
  I18nManager,
  Pressable,
  TextInput,
  View,
} from "react-native";

type ChatInputBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onAttach: () => void;
};

export default function ChatInputBar({
  value,
  onChangeText,
  onSend,
  onAttach,
}: ChatInputBarProps) {
  const { t } = useTranslation();
  const textAlign = I18nManager.isRTL ? "right" : "left";
  const canSend = value.trim().length > 0;

  return (
    <View className="bg-white px-4 py-3">
      <View className="flex-row items-center gap-2">
        <View className="flex-1 flex-row items-center rounded-full border border-card-border bg-white px-4">
          <Pressable
            onPress={onAttach}
            accessibilityRole="button"
            accessibilityLabel={t("common.upload")}
            hitSlop={8}
            className="active:opacity-[0.92]"
          >
            <MaterialDesignIcons name="paperclip" color={colors.secText} size={20} />
          </Pressable>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={t("chat.input.placeholder")}
            placeholderTextColor={colors.secText}
            returnKeyType="send"
            onSubmitEditing={onSend}
            style={{
              flex: 1,
              textAlign,
              minHeight: 44,
              paddingVertical: 10,
              paddingHorizontal: 10,
              fontSize: 15,
              color: colors.heading,
            }}
          />
        </View>

        <Pressable
          onPress={onSend}
          disabled={!canSend}
          accessibilityRole="button"
          accessibilityLabel={t("chat.input.placeholder")}
          className="size-11 items-center justify-center rounded-full bg-primary active:opacity-[0.92] disabled:opacity-50"
        >
          <MaterialDesignIcons name="send" color={colors.white} size={20} />
        </Pressable>
      </View>
    </View>
  );
}
