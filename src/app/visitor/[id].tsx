import VisitorDetailsScreen from "@/features/visitors/components/VisitorDetailsScreen";
import { getVisitorById } from "@/features/visitors/constants/dummy";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function VisitorDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const visitor = id ? getVisitorById(id) : undefined;

  if (!visitor) {
    return <Redirect href="/visitors" />;
  }

  return <VisitorDetailsScreen visitor={visitor} />;
}
