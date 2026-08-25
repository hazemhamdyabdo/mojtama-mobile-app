import AdminServiceScreen from "@/features/service/components/AdminServiceScreen";
import ResidentServiceScreen from "@/features/service/components/ResidentServiceScreen";
import { useUserRole } from "@/features/service/hooks/useUserRole";
import { View } from "react-native";

export default function ServiceScreen() {
  const { role, isLoading } = useUserRole("admin");

  if (isLoading) {
    return <View className="flex-1 bg-white" />;
  }

  if (role === "resident") {
    return <ResidentServiceScreen />;
  }

  return <AdminServiceScreen />;
}
