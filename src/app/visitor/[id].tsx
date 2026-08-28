import VisitorDetailsScreen from "@/features/visitors/components/VisitorDetailsScreen";
import { useVisitorsState } from "@/features/visitors/hooks/useVisitorsState";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function VisitorDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const visitors = useVisitorsState();
  const visitorId = Array.isArray(id) ? id[0] : id;
  const visitor = visitorId
    ? visitors.find((item) => item.id === visitorId)
    : undefined;

  if (!visitor) {
    return <Redirect href="/visitors" />;
  }

  return <VisitorDetailsScreen visitor={visitor} />;
}
