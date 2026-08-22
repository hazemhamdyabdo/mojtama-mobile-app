import { ANNOUNCEMENT_TYPE_VALUES } from "@/features/home/constants/announcementTypes";
import { z } from "zod";

const MAX_IMAGE_SIZE_BYTES = 1024 * 1024;

const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
]);

const ALLOWED_IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png"]);

export const postImageSchema = z.object({
  uri: z.string().min(1),
  name: z.string().optional(),
  mimeType: z.string().optional(),
  size: z.number().optional(),
});

export function createPostSchema(typeLabel: string) {
  return z
    .object({
      categoryType: z.enum(ANNOUNCEMENT_TYPE_VALUES, {
        message: `${typeLabel} is required`,
      }),
      title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title must be 200 characters or less"),
      content: z
        .string()
        .trim()
        .min(1, "Content is required")
        .max(5000, "Content must be 5000 characters or less"),
      image: postImageSchema.nullable(),
      isEmergency: z.boolean(),
    })
    .superRefine((data, ctx) => {
      if (!data.image) {
        ctx.addIssue({
          code: "custom",
          message: "Image is required",
          path: ["image"],
        });
        return;
      }

      if (
        data.image.size !== undefined &&
        data.image.size > MAX_IMAGE_SIZE_BYTES
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Image must be less than 1MB",
          path: ["image"],
        });
      }

      const hasAllowedMimeType =
        data.image.mimeType !== undefined &&
        ALLOWED_IMAGE_MIME_TYPES.has(data.image.mimeType);

      const extension = data.image.name?.split(".").pop()?.toLowerCase();
      const hasAllowedExtension =
        extension !== undefined && ALLOWED_IMAGE_EXTENSIONS.has(extension);

      if (!hasAllowedMimeType && !hasAllowedExtension) {
        ctx.addIssue({
          code: "custom",
          message: "Image must be JPG, JPEG, or PNG",
          path: ["image"],
        });
      }
    });
}

export type CreatePostFormValues = z.infer<
  ReturnType<typeof createPostSchema>
>;

export type PostImage = z.infer<typeof postImageSchema>;
