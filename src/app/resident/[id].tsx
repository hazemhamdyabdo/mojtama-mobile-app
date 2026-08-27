import ResidentDetailsScreen from "@/features/residents/components/ResidentDetailsScreen";
import { getResidentById } from "@/features/residents/constants/dummy";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function ResidentDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const residentId = Array.isArray(id) ? id[0] : id;
  const resident = residentId ? getResidentById(residentId) : undefined;

  if (!resident) {
    return <Redirect href="/residents" />;
  }

  return <ResidentDetailsScreen resident={resident} />;
}
