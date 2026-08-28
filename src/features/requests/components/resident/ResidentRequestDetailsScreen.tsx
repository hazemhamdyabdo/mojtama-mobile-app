import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import PersonValue from "@/features/requests/components/shared/PersonValue";
import RequestInfoRow from "@/features/requests/components/shared/RequestInfoRow";
import RequestActivityTimeline from "@/features/requests/components/RequestActivityTimeline";
import RequestDetailsHeader from "@/features/requests/components/RequestDetailsHeader";
import RequestIssueTypeBadge from "@/features/requests/components/RequestIssueTypeBadge";
import RequestPriorityBadge from "@/features/requests/components/RequestPriorityBadge";
import RequestStatusBadge from "@/features/requests/components/RequestStatusBadge";
import RequestTypeBadge from "@/features/requests/components/RequestTypeBadge";
import AuthoritiesContactBanner from "@/features/requests/components/resident/AuthoritiesContactBanner";
import CancelRequestBottomSheet, {
  type CancelRequestBottomSheetRef,
} from "@/features/requests/components/resident/CancelRequestBottomSheet";
import ContactAuthoritiesBottomSheet, {
  type ContactAuthoritiesBottomSheetRef,
} from "@/features/requests/components/resident/ContactAuthoritiesBottomSheet";
import type { ServiceRequest } from "@/features/requests/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";
type ResidentRequestDetailsScreenProps = {
  request: ServiceRequest;
  onDelete: (requestId: string) => void;
};

export default function ResidentRequestDetailsScreen({
  request,
  onDelete,
}: ResidentRequestDetailsScreenProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const cancelSheetRef = useRef<CancelRequestBottomSheetRef>(null);
  const authoritiesSheetRef = useRef<ContactAuthoritiesBottomSheetRef>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const isEmergency = request.requestType === "emergency";
  const isPending = request.status === "pending";
  const shouldTruncate = request.fullDescription.length > 120;
  const description =
    isExpanded || !shouldTruncate
      ? request.fullDescription
      : `${request.fullDescription.slice(0, 120)}...`;

  const handleCancel = () => {
    onDelete(request.id);
    router.back();
  };

  const handleEditRequest = () => {
    router.push({
      pathname: "/request/[id]/edit",
      params: { id: request.id },
    });
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <RequestDetailsHeader
          title={
            isEmergency
              ? t("requests.details.emergencyTitle")
              : t("requests.details.title")
          }
        />

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-10"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-2xl font-bold text-heading">
            {request.title}
          </Text>

          <Text className="mt-3 text-sm leading-5 text-slate-500">
            {description}
          </Text>
          {!isExpanded && shouldTruncate ? (
            <Pressable
              onPress={() => setIsExpanded(true)}
              accessibilityRole="button"
              className="mt-1 active:opacity-[0.92]"
            >
              <Text className="text-sm font-semibold text-primary">
                {t("common.viewAll")}
              </Text>
            </Pressable>
          ) : null}

          {isEmergency ? (
            <View className="mt-6">
              <Text className="mb-4 text-sm font-semibold text-sec-text">
                {t("requests.details.emergencySection")}
              </Text>
              <RequestInfoRow label={t("requests.details.fields.submittedBy")}>
                <PersonValue person={request.submittedBy} />
              </RequestInfoRow>
              <RequestInfoRow label={t("requests.details.fields.location")}>
                <View className="flex-row items-center gap-1">
                  <MaterialDesignIcons
                    name="map-marker-outline"
                    color={colors.heading}
                    size={14}
                  />
                  <Text className="text-sm font-semibold text-heading">
                    {request.location}
                  </Text>
                </View>
              </RequestInfoRow>
              <RequestInfoRow label={t("requests.details.fields.requestType")}>
                <RequestTypeBadge requestType={request.requestType} />
              </RequestInfoRow>
              {request.issueType ? (
                <RequestInfoRow label={t("requests.details.fields.issueType")}>
                  <RequestIssueTypeBadge issueType={request.issueType} />
                </RequestInfoRow>
              ) : null}
              <RequestInfoRow label={t("requests.details.fields.priority")}>
                <RequestPriorityBadge priority={request.priority} />
              </RequestInfoRow>
            </View>
          ) : (
            <View className="mt-6">
              {request.scheduledDate ? (
                <RequestInfoRow label={t("requests.details.fields.scheduledDate")}>
                  <Text className="text-sm font-semibold text-heading">
                    {request.scheduledDate}
                  </Text>
                </RequestInfoRow>
              ) : null}

              {request.assignedTo ? (
                <RequestInfoRow label={t("requests.details.fields.assignedTo")}>
                  <PersonValue person={request.assignedTo} />
                </RequestInfoRow>
              ) : null}

              <RequestInfoRow label={t("requests.details.fields.requestType")}>
                <RequestTypeBadge requestType={request.requestType} />
              </RequestInfoRow>

              {request.issueType ? (
                <RequestInfoRow label={t("requests.details.fields.issueType")}>
                  <RequestIssueTypeBadge issueType={request.issueType} />
                </RequestInfoRow>
              ) : null}

              <RequestInfoRow label={t("requests.details.fields.priority")}>
                <RequestPriorityBadge priority={request.priority} />
              </RequestInfoRow>
            </View>
          )}

          {isEmergency ? (
            <AuthoritiesContactBanner
              onPress={() => authoritiesSheetRef.current?.open()}
            />
          ) : null}

          {request.scheduleTime ? (
            <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-slate-50 p-4">
              <Text className="text-sm font-semibold text-heading">
                {t("requests.details.fields.schedule")}
              </Text>
              <View className="flex-row items-center gap-1.5">
                <MaterialDesignIcons
                  name="clock-outline"
                  color={colors.slate500}
                  size={16}
                />
                <Text className="text-sm text-slate-500">
                  {request.scheduleTime}
                </Text>
              </View>
            </View>
          ) : null}

          <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-slate-50 p-4">
            <Text className="text-sm font-semibold text-heading">
              {t("requests.details.fields.status")}
            </Text>
            <RequestStatusBadge status={request.status} />
          </View>

          <RequestActivityTimeline activities={request.activities} />
        </ScrollView>

        {isPending ? (
          <View className="flex-row gap-3 pb-2">
            <Pressable
              onPress={handleEditRequest}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl border border-input-text bg-white py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-slate-500">
                {t("requests.actions.edit")}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => cancelSheetRef.current?.open()}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl border border-rejected-500 bg-white py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-rejected-500">
                {t("requests.actions.cancel")}
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <CancelRequestBottomSheet
        ref={cancelSheetRef}
        onConfirmCancel={handleCancel}
      />

      <ContactAuthoritiesBottomSheet ref={authoritiesSheetRef} />
    </ScreenSafeAreaView>
  );
}
