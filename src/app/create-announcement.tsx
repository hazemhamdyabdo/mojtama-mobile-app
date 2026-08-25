import CreateAnnouncementForm from "@/features/home/components/CreateAnnouncementForm";
import CreatePostScreenLayout from "@/features/home/components/CreatePostScreenLayout";
import { createAnnouncementPost } from "@/features/home/api";
import type { CreateAnnouncementFormValues } from "@/features/home/schemas/createAnnouncementSchema";
import { useRouter } from "expo-router";

export default function CreateAnnouncementScreen() {
  const router = useRouter();

  const handleSubmit = async (values: CreateAnnouncementFormValues) => {
    await createAnnouncementPost(values);
    router.back();
  };

  return (
    <CreatePostScreenLayout>
      <CreateAnnouncementForm onSubmit={handleSubmit} />
    </CreatePostScreenLayout>
  );
}
