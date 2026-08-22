import CreatePostForm from "@/features/home/components/CreatePostForm";
import CreatePostScreenLayout from "@/features/home/components/CreatePostScreenLayout";
import { createNewsPost } from "@/features/home/api";
import type { CreateNewsFormValues } from "@/features/home/schemas/createNewsSchema";
import { useRouter } from "expo-router";

export default function CreateNewsScreen() {
  const router = useRouter();

  const handleSubmit = async (values: CreateNewsFormValues) => {
    await createNewsPost(values);
    router.back();
  };

  return (
    <CreatePostScreenLayout>
      <CreatePostForm variant="news" onSubmit={handleSubmit} />
    </CreatePostScreenLayout>
  );
}
