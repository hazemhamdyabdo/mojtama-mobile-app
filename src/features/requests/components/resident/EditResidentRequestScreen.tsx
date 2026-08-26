import CreateRequestForm from "@/features/requests/components/CreateRequestForm";
import type { CreateRequestFormValues } from "@/features/requests/schemas/createRequestSchema";
import { updateRequestInState } from "@/features/requests/store/requestState";
import type { ServiceRequest } from "@/features/requests/types";
import {
  applyFormValuesToRequest,
  mapRequestToFormValues,
} from "@/features/requests/utils/createRequest";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type EditResidentRequestScreenProps = {
  request: ServiceRequest;
};

export default function EditResidentRequestScreen({
  request,
}: EditResidentRequestScreenProps) {
  const router = useRouter();

  const handleSubmit = (values: CreateRequestFormValues) => {
    updateRequestInState(applyFormValuesToRequest(request, values));
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <View className="relative mb-6 flex-row items-center justify-center">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="absolute left-0 active:opacity-[0.92]"
          >
            <View className="size-10 items-center justify-center rounded-full bg-[#F0EDFF]">
              <MaterialDesignIcons
                name="chevron-left"
                color="#7B61FF"
                size={24}
              />
            </View>
          </Pressable>

          <Text className="text-lg font-bold text-[#1F1F1F]">Edit Request</Text>
        </View>

        <CreateRequestForm
          variant="edit"
          defaultValues={mapRequestToFormValues(request)}
          onSubmit={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}
