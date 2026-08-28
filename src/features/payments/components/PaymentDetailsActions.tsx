import { colors } from "@/theme/colors";
import type { PaymentBillStatus } from "@/features/payments/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type PaymentDetailsActionsProps = {
  status: PaymentBillStatus;
  onPayPress?: () => void;
  onDownloadPress?: () => void;
  onSharePress?: () => void;
};

function IconActionButton({
  icon,
  label,
  onPress,
  className = "",
}: {
  icon: "download-outline" | "share-variant-outline";
  label?: string;
  onPress?: () => void;
  className?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label ?? icon}
      className={`items-center justify-center rounded-2xl border border-card-border bg-white active:opacity-[0.92] ${className}`}
    >
      <MaterialDesignIcons name={icon} color={colors.primary} size={22} />
      {label ? (
        <Text className="mt-1 text-xs font-medium text-slate-500">{label}</Text>
      ) : null}
    </Pressable>
  );
}

export default function PaymentDetailsActions({
  status,
  onPayPress,
  onDownloadPress,
  onSharePress,
}: PaymentDetailsActionsProps) {
  const { t } = useTranslation();
  const showPayButton = status === "pending" || status === "overdue";

  if (showPayButton) {
    return (
      <View className="flex-row items-center gap-3">
        <Pressable
          onPress={onPayPress}
          accessibilityRole="button"
          className="flex-1 items-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-white">
            {t("payments.actions.payNow")}
          </Text>
        </Pressable>

        <IconActionButton
          icon="download-outline"
          onPress={onDownloadPress}
          className="size-14"
        />
        <IconActionButton
          icon="share-variant-outline"
          onPress={onSharePress}
          className="size-14"
        />
      </View>
    );
  }

  return (
    <View className="flex-row gap-3">
      <IconActionButton
        icon="download-outline"
        label={t("payments.actions.download")}
        onPress={onDownloadPress}
        className="flex-1 py-4"
      />
      <IconActionButton
        icon="share-variant-outline"
        label={t("payments.actions.shareInvoice")}
        onPress={onSharePress}
        className="flex-1 py-4"
      />
    </View>
  );
}
