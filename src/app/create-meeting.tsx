import { createMeetingPost } from "@/features/home/api";
import CreateMeetingForm from "@/features/home/components/CreateMeetingForm";
import CreatePostScreenLayout from "@/features/home/components/CreatePostScreenLayout";
import type { CreateMeetingFormValues } from "@/features/home/schemas/createMeetingSchema";
import { useRouter } from "expo-router";

export default function CreateMeetingScreen() {
  const router = useRouter();

  const handleSubmit = async (values: CreateMeetingFormValues) => {
    await createMeetingPost(values);
    router.back();
  };

  return (
    <CreatePostScreenLayout>
      <CreateMeetingForm onSubmit={handleSubmit} />
    </CreatePostScreenLayout>
  );
}
