import { createPollPost } from "@/features/home/api";
import CreatePollForm from "@/features/home/components/CreatePollForm";
import CreatePostScreenLayout from "@/features/home/components/CreatePostScreenLayout";
import type { CreatePollFormValues } from "@/features/home/schemas/createPollSchema";
import { useRouter } from "expo-router";

export default function CreatePollScreen() {
  const router = useRouter();

  const handleSubmit = async (values: CreatePollFormValues) => {
    await createPollPost(values);
    router.back();
  };

  return (
    <CreatePostScreenLayout>
      <CreatePollForm onSubmit={handleSubmit} />
    </CreatePostScreenLayout>
  );
}
