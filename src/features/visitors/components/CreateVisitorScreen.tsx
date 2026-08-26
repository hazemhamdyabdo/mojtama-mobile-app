import VisitorForm from "@/features/visitors/components/VisitorForm";
import VisitorFormHeader from "@/features/visitors/components/VisitorFormHeader";
import type { VisitorFormValues } from "@/features/visitors/schemas/visitorSchema";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateVisitorScreen() {
  const router = useRouter();

  const handleSubmit = (values: VisitorFormValues) => {
    console.log("create visit:", values);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <VisitorFormHeader title="New Visitor" />
        <VisitorForm submitLabel="Create Visit" onSubmit={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}
