import CreatePostForm from "@/features/home/components/CreatePostForm";
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
      <CreatePostForm variant="announcement" onSubmit={handleSubmit} />
    </CreatePostScreenLayout>
  );
}
