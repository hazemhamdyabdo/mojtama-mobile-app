import { colors } from "@/theme/colors";
import VisitorAccessCodeCard from "@/features/visitors/components/VisitorAccessCodeCard";
import VisitorStatusBadge from "@/features/visitors/components/VisitorStatusBadge";
import type { Visitor } from "@/features/visitors/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type VisitorCardProps = {
  visitor: Visitor;
  onDetailsPress: (visitorId: string) => void;
  onQrPress?: (visitorId: string) => void;
  onSharePress?: (visitorId: string) => void;
};

export default function VisitorCard({
  visitor,
  onDetailsPress,
  onQrPress,
  onSharePress,
}: VisitorCardProps) {
  const { t } = useTranslation();
  const isApproved = visitor.status === "approved";

  return (
    <View className="mb-4 rounded-2xl border border-card-border bg-white p-4">
      <View className="flex-row items-start justify-between gap-3">
        <Text className="flex-1 text-lg font-bold text-heading">
          {visitor.name}
        </Text>
        <VisitorStatusBadge status={visitor.status} />
      </View>

      <View className="mt-1 flex-row items-center gap-2">
        <Text className="text-sm text-sec-text">
          {t("visitors.card.visiting")}{" "}
          <Text className="text-heading">{visitor.hostName}</Text>
        </Text>
        <View className="flex-row items-center gap-0.5">
          <MaterialDesignIcons
            name="map-marker-outline"
            color={colors.heading}
            size={14}
          />
          <Text className="text-sm font-medium text-heading">
            {visitor.location}
          </Text>
        </View>
      </View>

      <View className="mt-3 flex-row rounded-2xl bg-slate-50 p-4">
        <View className="flex-1 pr-2">
          <Text className="text-sm text-sec-text">{t("visitors.card.dateTime")}</Text>
          <Text className="mt-1 text-sm text-heading">
            {t("visitors.card.dateTimeAt", {
              date: visitor.date,
              time: visitor.time,
            })}
          </Text>
        </View>
        <View className="max-w-[42%] flex-1">
          <Text className="text-sm text-sec-text">{t("visitors.card.purpose")}</Text>
          <Text className="mt-1 text-sm text-heading">{visitor.purpose}</Text>
        </View>
      </View>

      {isApproved && visitor.accessCode ? (
        <VisitorAccessCodeCard
          accessCode={visitor.accessCode}
          onQrPress={() => onQrPress?.(visitor.id)}
        />
      ) : null}

      <View className="mt-4 flex-row items-center gap-3">
        <Pressable
          onPress={() => onDetailsPress(visitor.id)}
          accessibilityRole="button"
          className="flex-1 items-center rounded-2xl bg-primary py-3.5 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-white">
            {t("visitors.card.details")}
          </Text>
        </Pressable>

        {isApproved ? (
          <Pressable
            onPress={() => onSharePress?.(visitor.id)}
            accessibilityRole="button"
            accessibilityLabel={t("visitors.a11y.shareVisit")}
            className="size-12 items-center justify-center rounded-2xl border border-card-border bg-white active:opacity-[0.92]"
          >
            <MaterialDesignIcons
              name="share-variant-outline"
              color={colors.primary}
              size={20}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
