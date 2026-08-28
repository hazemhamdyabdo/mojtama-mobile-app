import { deleteVisitor } from "@/features/visitors/api";
import DeleteVisitorBottomSheet, {
  type DeleteVisitorBottomSheetRef,
} from "@/features/visitors/components/DeleteVisitorBottomSheet";
import VisitorAccessCodeCard from "@/features/visitors/components/VisitorAccessCodeCard";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import VisitorActionsBottomSheet, {
  type VisitorActionsBottomSheetRef,
} from "@/features/visitors/components/VisitorActionsBottomSheet";
import VisitorDetailsHeader from "@/features/visitors/components/VisitorDetailsHeader";
import VisitorDetailsInfoGrid from "@/features/visitors/components/VisitorDetailsInfoGrid";
import VisitorQrBottomSheet, {
  type VisitorQrBottomSheetRef,
} from "@/features/visitors/components/VisitorQrBottomSheet";
import VisitorStatusBadge from "@/features/visitors/components/VisitorStatusBadge";
import VisitorTimelineCard from "@/features/visitors/components/VisitorTimelineCard";
import type { Visitor } from "@/features/visitors/types";
import { useRouter, type Href } from "expo-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
type VisitorDetailsScreenProps = {
  visitor: Visitor;
};

export default function VisitorDetailsScreen({
  visitor,
}: VisitorDetailsScreenProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const actionsSheetRef = useRef<VisitorActionsBottomSheetRef>(null);
  const deleteSheetRef = useRef<DeleteVisitorBottomSheetRef>(null);
  const qrSheetRef = useRef<VisitorQrBottomSheetRef>(null);

  const handleDelete = async () => {
    await deleteVisitor(visitor.id);
    router.back();
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <VisitorDetailsHeader
          onMenuPress={() => actionsSheetRef.current?.open()}
        />

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-10"
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-4 text-2xl font-bold text-heading">
            {visitor.name}
          </Text>

          <VisitorDetailsInfoGrid visitor={visitor} />

          {visitor.accessCode ? (
            <VisitorAccessCodeCard
              accessCode={visitor.accessCode}
              onQrPress={() => qrSheetRef.current?.open(visitor)}
            />
          ) : null}

          <View className="mt-4 rounded-2xl bg-slate-50 p-4">
            <Text className="text-base font-bold text-heading">
              {t("visitors.details.contactInfo")}
            </Text>
            <View className="mt-3 flex-row gap-3">
              <View className="flex-1">
                <Text className="text-sm text-sec-text">
                  {t("visitors.details.phoneNumber")}
                </Text>
                <Text className="mt-1 text-sm font-semibold text-heading">
                  {visitor.phone}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm text-sec-text">
                  {t("visitors.details.emailAddress")}
                </Text>
                <Text className="mt-1 text-sm font-semibold text-heading">
                  {visitor.email ?? "—"}
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-4 flex-row items-center justify-between rounded-2xl bg-slate-50 p-4">
            <Text className="text-base font-bold text-heading">
              {t("visitors.details.status")}
            </Text>
            <VisitorStatusBadge status={visitor.status} />
          </View>

          <VisitorTimelineCard events={visitor.timeline} />
        </ScrollView>
      </View>

      <VisitorActionsBottomSheet
        ref={actionsSheetRef}
        onEdit={() => router.push(`/visitor/${visitor.id}/edit` as Href)}
        onDelete={() => deleteSheetRef.current?.open()}
      />

      <DeleteVisitorBottomSheet
        ref={deleteSheetRef}
        onConfirmDelete={handleDelete}
      />

      <VisitorQrBottomSheet
        ref={qrSheetRef}
        onDownload={(visitorId) => console.log("download qr:", visitorId)}
      />
    </ScreenSafeAreaView>
  );
}
