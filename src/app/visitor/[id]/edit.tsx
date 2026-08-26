import EditVisitorScreen from "@/features/visitors/components/EditVisitorScreen";
import { getVisitorById } from "@/features/visitors/constants/dummy";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function EditVisitorRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const visitor = id ? getVisitorById(id) : undefined;

  if (!visitor) {
    return <Redirect href="/visitors" />;
  }

  return <EditVisitorScreen visitor={visitor} />;
}
