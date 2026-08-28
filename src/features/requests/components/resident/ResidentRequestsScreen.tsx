import { colors } from "@/theme/colors";
import RequestFilterChips from "@/features/requests/components/RequestFilterChips";
import RequestsHeader from "@/features/requests/components/RequestsHeader";
import ResidentRequestCard from "@/features/requests/components/resident/ResidentRequestCard";
import { matchesRequestFilter } from "@/features/requests/constants/dummy";
import { useRequestsState } from "@/features/requests/hooks/useRequestsState";
import type { RequestFilter } from "@/features/requests/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter, type Href } from "expo-router";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function ResidentRequestsScreen() {
  const router = useRouter();
  const requests = useRequestsState();
  const [selectedFilter, setSelectedFilter] = useState<RequestFilter>("all");

  const visibleRequests = useMemo(
    () =>
      requests.filter((request) =>
        matchesRequestFilter(request, selectedFilter),
      ),
    [requests, selectedFilter],
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <RequestsHeader />
        <View>
          <RequestFilterChips
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
          />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-24"
          showsVerticalScrollIndicator={false}
        >
          {visibleRequests.length === 0 ? (
            <View className="items-center py-12">
              <Text className="text-base font-medium text-heading">
                No Requests Found
              </Text>
              <Text className="mt-1 text-center text-sm text-sec-text">
                Create a request to get started.
              </Text>
            </View>
          ) : (
            visibleRequests.map((request) => (
              <ResidentRequestCard
                key={request.id}
                request={request}
                onPress={(requestId) =>
                  router.push(`/request/${requestId}` as Href)
                }
              />
            ))
          )}
        </ScrollView>

        <Pressable
          onPress={() => router.push("/requests/create" as Href)}
          accessibilityRole="button"
          accessibilityLabel="Create request"
          className="absolute bottom-6 right-4 size-14 items-center justify-center rounded-full bg-primary active:opacity-[0.92]"
        >
          <MaterialDesignIcons name="plus" color={colors.white} size={28} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
