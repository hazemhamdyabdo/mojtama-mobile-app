import { colors } from "@/theme/colors";
import AssignWorkersBottomSheet, {
  type AssignWorkersBottomSheetRef,
} from "@/features/requests/components/manager/AssignWorkersBottomSheet";
import DeleteRequestBottomSheet, {
  type DeleteRequestBottomSheetRef,
} from "@/features/requests/components/manager/DeleteRequestBottomSheet";
import RequestActivityTimeline from "@/features/requests/components/RequestActivityTimeline";
import RequestDetailsHeader from "@/features/requests/components/RequestDetailsHeader";
import RequestIssueTypeBadge from "@/features/requests/components/RequestIssueTypeBadge";
import RequestPriorityBadge from "@/features/requests/components/RequestPriorityBadge";
import RequestStatusBadge from "@/features/requests/components/RequestStatusBadge";
import RequestTypeBadge from "@/features/requests/components/RequestTypeBadge";
import { DUMMY_WORKERS } from "@/features/requests/constants/dummy";
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

type ManagerRequestDetailsScreenProps = {
  request: ServiceRequest;
  onUpdate: (request: ServiceRequest) => void;
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
      <View className="flex-1  items-start">{children}</View>
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

export default function ManagerRequestDetailsScreen({
  request: initialRequest,
  onUpdate,
  onDelete,
}: ManagerRequestDetailsScreenProps) {
  const router = useRouter();
  const assignSheetRef = useRef<AssignWorkersBottomSheetRef>(null);
  const deleteSheetRef = useRef<DeleteRequestBottomSheetRef>(null);
  const [request, setRequest] = useState(initialRequest);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAssign = (workerIds: string[]) => {
    const primaryWorker = DUMMY_WORKERS.find((worker) =>
      workerIds.includes(worker.id),
    );

    const updatedRequest: ServiceRequest = {
      ...request,
      status: "assigned",
      assignedWorkerIds: workerIds,
      assignedTo: primaryWorker
        ? { name: primaryWorker.name, avatar: primaryWorker.avatar }
        : undefined,
      activities: [
        {
          id: `a-${Date.now()}`,
          title: "Status Changed",
          actor: "Alex Gargov",
          timestamp: "Oct 24, 2025 at 4:30PM",
          occurredAt: Date.now(),
          fromStatus: "submitted",
          toStatus: "in-progress",
          actorAvatar: primaryWorker?.avatar,
        },
        ...request.activities,
      ],
    };

    setRequest(updatedRequest);
    onUpdate(updatedRequest);
  };

  const handleDelete = () => {
    onDelete(request.id);
    router.back();
  };

  const shouldTruncate = request.fullDescription.length > 120;
  const description =
    isExpanded || !shouldTruncate
      ? request.fullDescription
      : `${request.fullDescription.slice(0, 120)}...`;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <RequestDetailsHeader />

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

          <View className="mt-6 ">
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

          {request.scheduleTime ? (
            <View className="mt-2 flex-row items-center justify-between rounded-2xl bg-slate-50 p-4">
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

        {request.status === "pending" ? (
          <View className="gap-3 pb-2">
            <Pressable
              onPress={() =>
                assignSheetRef.current?.open(request.assignedWorkerIds ?? [])
              }
              accessibilityRole="button"
              className="items-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-white">
                Assign Request
              </Text>
            </Pressable>

            <Pressable
              onPress={() => deleteSheetRef.current?.open()}
              accessibilityRole="button"
              className="items-center rounded-2xl border border-rejected-500 bg-white py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-rejected-500">
                Delete Request
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <AssignWorkersBottomSheet ref={assignSheetRef} onAssign={handleAssign} />

      <DeleteRequestBottomSheet
        ref={deleteSheetRef}
        onConfirmDelete={handleDelete}
      />
    </SafeAreaView>
  );
}
