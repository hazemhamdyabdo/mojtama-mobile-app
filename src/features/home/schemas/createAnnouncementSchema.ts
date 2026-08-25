import { ANNOUNCEMENT_TYPE_VALUES } from "@/features/home/constants/announcementTypes";
import { VISIBILITY_VALUES } from "@/features/home/constants/visibilityOptions";
import { postImageSchema } from "@/features/home/schemas/createPostSchema";
import { z } from "zod";

const MAX_IMAGE_SIZE_BYTES = 1024 * 1024;

const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
]);

const ALLOWED_IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png"]);

export function createAnnouncementSchema() {
  return z
    .object({
      categoryType: z.enum(ANNOUNCEMENT_TYPE_VALUES, {
        message: "Announcement type is required",
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
      visibility: z.enum(VISIBILITY_VALUES),
      isEmergency: z.boolean(),
      allowComments: z.boolean(),
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

export type CreateAnnouncementFormValues = z.infer<
  ReturnType<typeof createAnnouncementSchema>
>;

export type { PostImage as AnnouncementImage } from "@/features/home/schemas/createPostSchema";
