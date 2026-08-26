import CreateManagerRequestForm from "@/features/requests/components/manager/CreateManagerRequestForm";
import type { CreateRequestFormValues } from "@/features/requests/schemas/createRequestSchema";
import { addRequestToState } from "@/features/requests/store/requestState";
import type {
  RequestIssueType,
  RequestPriority,
  RequestType,
  ServiceRequest,
} from "@/features/requests/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const dummyAvatar = require("@/features/home/constants/dummy-avatar.jpg");

function formatTodayDate(): string {
  const today = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
}

export default function CreateManagerRequestScreen() {
  const router = useRouter();

  const handleSubmit = (values: CreateRequestFormValues) => {
    const description =
      values.description?.trim() ||
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    const newRequest: ServiceRequest = {
      id: `r-${Date.now()}`,
      date: formatTodayDate(),
      title: values.title,
      description,
      fullDescription: description,
      requestType: values.requestType as RequestType,
      issueType: values.issueType
        ? (values.issueType as RequestIssueType)
        : undefined,
      priority: values.priority as RequestPriority,
      status: "pending",
      location: values.location,
      submittedBy: {
        name: "Jade Smith",
        unit: values.location,
        avatar: dummyAvatar,
      },
      activities: [],
    };

    addRequestToState(newRequest);
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

          <Text className="text-lg font-bold text-[#1F1F1F]">
            Create Request
          </Text>
        </View>

        <CreateManagerRequestForm onSubmit={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}
