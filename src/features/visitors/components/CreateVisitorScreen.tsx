import VisitorForm from "@/features/visitors/components/VisitorForm";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import VisitorFormHeader from "@/features/visitors/components/VisitorFormHeader";
import type { VisitorFormValues } from "@/features/visitors/schemas/visitorSchema";
import { useRouter } from "expo-router";
import { View } from "react-native";
export default function CreateVisitorScreen() {
  const router = useRouter();

  const handleSubmit = (values: VisitorFormValues) => {
    console.log("create visit:", values);
    router.back();
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <VisitorFormHeader title="New Visitor" />
        <VisitorForm submitLabel="Create Visit" onSubmit={handleSubmit} />
      </View>
    </ScreenSafeAreaView>
  );
}
