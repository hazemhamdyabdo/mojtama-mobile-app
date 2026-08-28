import { colors } from "@/theme/colors";
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
import { styled } from "nativewind";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type ResidentRequestDetailsScreenProps = {
  request: ServiceRequest;
  onDelete: (requestId: string) => void;
};

type InfoRowProps = {
  label: string;
  children: ReactNode;
};

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <View className="mb-4 flex-row items-center justify-between gap-4">
      <Text className="w-1/3 text-sm text-sec-text">{label}</Text>
      <View className="flex-1 items-start">{children}</View>
    </View>
  );
}

function PersonValue({
  person,
}: {
  person: { name: string; avatar?: ServiceRequest["submittedBy"]["avatar"] };
}) {
  return (
    <View className="flex-row items-center gap-2">
      {person.avatar ? (
        <Image
          source={person.avatar}
          contentFit="cover"
          style={{ width: 24, height: 24, borderRadius: 100 }}
        />
      ) : null}
      <Text className="text-sm font-semibold text-heading">
        {person.name}
      </Text>
    </View>
  );
}

export default function ResidentRequestDetailsScreen({
  request,
  onDelete,
}: ResidentRequestDetailsScreenProps) {
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
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <RequestDetailsHeader
          title={isEmergency ? "Emergency Details" : "Request Details"}
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
                View all
              </Text>
            </Pressable>
          ) : null}

          {isEmergency ? (
            <View className="mt-6">
              <Text className="mb-4 text-sm font-semibold text-sec-text">
                Emergency details
              </Text>
              <InfoRow label="Submitted by">
                <PersonValue person={request.submittedBy} />
              </InfoRow>
              <InfoRow label="Location">
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
              </InfoRow>
              <InfoRow label="Request Type">
                <RequestTypeBadge requestType={request.requestType} />
              </InfoRow>
              {request.issueType ? (
                <InfoRow label="Issue Type">
                  <RequestIssueTypeBadge issueType={request.issueType} />
                </InfoRow>
              ) : null}
              <InfoRow label="Priority">
                <RequestPriorityBadge priority={request.priority} />
              </InfoRow>
            </View>
          ) : (
            <View className="mt-6">
              {request.scheduledDate ? (
                <InfoRow label="Scheduled Date">
                  <Text className="text-sm font-semibold text-heading">
                    {request.scheduledDate}
                  </Text>
                </InfoRow>
              ) : null}

              {request.assignedTo ? (
                <InfoRow label="Assigned to">
                  <PersonValue person={request.assignedTo} />
                </InfoRow>
              ) : null}

              <InfoRow label="Request Type">
                <RequestTypeBadge requestType={request.requestType} />
              </InfoRow>

              {request.issueType ? (
                <InfoRow label="Issue Type">
                  <RequestIssueTypeBadge issueType={request.issueType} />
                </InfoRow>
              ) : null}

              <InfoRow label="Priority">
                <RequestPriorityBadge priority={request.priority} />
              </InfoRow>
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
                Schedule
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
            <Text className="text-sm font-semibold text-heading">Status</Text>
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
                Edit Request
              </Text>
            </Pressable>

            <Pressable
              onPress={() => cancelSheetRef.current?.open()}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl border border-rejected-500 bg-white py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-rejected-500">
                Cancel Request
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
    </SafeAreaView>
  );
}
