import { removeResident } from "@/features/residents/api";
import GenerateInviteLinkCard from "@/features/residents/components/GenerateInviteLinkCard";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import InviteLinkGeneratedBottomSheet, {
  type InviteLinkGeneratedBottomSheetRef,
} from "@/features/residents/components/InviteLinkGeneratedBottomSheet";
import RemoveResidentBottomSheet, {
  type RemoveResidentBottomSheetRef,
} from "@/features/residents/components/RemoveResidentBottomSheet";
import ResidentActionsBottomSheet, {
  type ResidentActionsBottomSheetRef,
} from "@/features/residents/components/ResidentActionsBottomSheet";
import ResidentCard from "@/features/residents/components/ResidentCard";
import ResidentFilterBottomSheet, {
  type ResidentFilterBottomSheetRef,
} from "@/features/residents/components/ResidentFilterBottomSheet";
import ResidentsHeader from "@/features/residents/components/ResidentsHeader";
import ResidentsSearchBar from "@/features/residents/components/ResidentsSearchBar";
import {
  matchesResidentFilters,
} from "@/features/residents/constants/dummy";
import { useResidentsState } from "@/features/residents/hooks/useResidentsState";
import type { ResidentFilterCriteria } from "@/features/residents/types";
import { EMPTY_RESIDENT_FILTER } from "@/features/residents/types";
import { useRouter, type Href } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function ResidentsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const filterSheetRef = useRef<ResidentFilterBottomSheetRef>(null);
  const inviteSheetRef = useRef<InviteLinkGeneratedBottomSheetRef>(null);
  const actionsSheetRef = useRef<ResidentActionsBottomSheetRef>(null);
  const removeSheetRef = useRef<RemoveResidentBottomSheetRef>(null);

  const residents = useResidentsState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] =
    useState<ResidentFilterCriteria>(EMPTY_RESIDENT_FILTER);
  const [selectedResidentId, setSelectedResidentId] = useState<string | null>(
    null,
  );

  const filteredResidents = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return residents.filter((resident) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        resident.name.toLowerCase().includes(normalizedQuery) ||
        resident.unit.toLowerCase().includes(normalizedQuery) ||
        resident.building.toLowerCase().includes(normalizedQuery);

      return matchesSearch && matchesResidentFilters(resident, filterCriteria);
    });
  }, [residents, searchQuery, filterCriteria]);

  const handleResidentPress = (residentId: string) => {
    router.push(`/resident/${residentId}` as Href);
  };

  const handleResidentMenuPress = (residentId: string) => {
    setSelectedResidentId(residentId);
    actionsSheetRef.current?.open();
  };

  const handleRemoveResident = async () => {
    if (!selectedResidentId) {
      return;
    }

    await removeResident(selectedResidentId);
    setSelectedResidentId(null);
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <ResidentsHeader />

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-10"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <GenerateInviteLinkCard
            onGenerateLink={() => inviteSheetRef.current?.open()}
          />

          <ResidentsSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => filterSheetRef.current?.open(filterCriteria)}
          />

          <Text className="mb-4 text-sm text-slate-500">
            Total Residents{" "}
            <Text className="font-bold text-primary">{residents.length}</Text>
          </Text>

          {filteredResidents.length > 0 ? (
            filteredResidents.map((resident) => (
              <ResidentCard
                key={resident.id}
                resident={resident}
                onPress={handleResidentPress}
                onMenuPress={handleResidentMenuPress}
              />
            ))
          ) : (
            <View className="items-center py-12">
              <Text className="text-base font-semibold text-heading">
                {t("residents.empty.title")}
              </Text>
              <Text className="mt-2 text-center text-sm text-slate-500">
                Try adjusting your search or filter.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <ResidentFilterBottomSheet
        ref={filterSheetRef}
        onApply={setFilterCriteria}
      />

      <InviteLinkGeneratedBottomSheet ref={inviteSheetRef} />

      <ResidentActionsBottomSheet
        ref={actionsSheetRef}
        onRemove={() => removeSheetRef.current?.open()}
      />

      <RemoveResidentBottomSheet
        ref={removeSheetRef}
        onConfirmRemove={handleRemoveResident}
      />
    </ScreenSafeAreaView>
  );
}
