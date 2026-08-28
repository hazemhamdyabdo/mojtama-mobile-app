import MeetingDetailsScreen from "@/features/home/components/MeetingDetailsScreen";
import { useLocalSearchParams } from "expo-router";

export default function MeetingDetailsRoute() {
  const { source } = useLocalSearchParams<{ source?: string }>();

  return (
    <MeetingDetailsScreen
      variant={source === "service" ? "service" : "feed"}
    />
  );
}
