import { colors } from "@/theme/colors";
import CreateRequestForm from "@/features/requests/components/CreateRequestForm";
import type { CreateRequestFormValues } from "@/features/requests/schemas/createRequestSchema";
import { addRequestToState } from "@/features/requests/store/requestState";
import { buildServiceRequestFromForm } from "@/features/requests/utils/createRequest";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function CreateManagerRequestScreen() {
  const router = useRouter();

  const handleSubmit = (values: CreateRequestFormValues) => {
    addRequestToState(buildServiceRequestFromForm(values));
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
            <View className="size-10 items-center justify-center rounded-full bg-primary-50">
              <MaterialDesignIcons
                name="chevron-left"
                color={colors.primary}
                size={24}
              />
            </View>
          </Pressable>

          <Text className="text-lg font-bold text-heading">
            Create Request
          </Text>
        </View>

        <CreateRequestForm onSubmit={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}
