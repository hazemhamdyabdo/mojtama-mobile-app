import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CreateRequestForm from "@/features/requests/components/CreateRequestForm";
import type { CreateRequestFormValues } from "@/features/requests/schemas/createRequestSchema";
import { addRequestToState } from "@/features/requests/store/requestState";
import { buildServiceRequestFromForm } from "@/features/requests/utils/createRequest";
import { SERVICE_USER } from "@/features/service/constants/dummy";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

export default function CreateResidentRequestScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = (values: CreateRequestFormValues) => {
    const newRequest = buildServiceRequestFromForm(values, {
      submittedByName: SERVICE_USER.name,
      submittedByAvatar: SERVICE_USER.avatar,
    });

    addRequestToState(newRequest);
    router.back();
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <View className="relative mb-6 flex-row items-center justify-center">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel={t("common.back")}
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
            {t("requests.create.title")}
          </Text>
        </View>

        <CreateRequestForm onSubmit={handleSubmit} />
      </View>
    </ScreenSafeAreaView>
  );
}
