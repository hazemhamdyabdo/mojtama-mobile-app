import ResidentDetailsScreen from "@/features/residents/components/ResidentDetailsScreen";
import { useResidentsState } from "@/features/residents/hooks/useResidentsState";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function ResidentDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const residents = useResidentsState();
  const residentId = Array.isArray(id) ? id[0] : id;
  const resident = residentId
    ? residents.find((item) => item.id === residentId)
    : undefined;

  if (!resident) {
    return <Redirect href="/residents" />;
  }

  return <ResidentDetailsScreen resident={resident} />;
}
