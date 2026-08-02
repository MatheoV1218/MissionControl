import { supabase } from "./supabase";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB, mirrors the storage bucket's server-side limit

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Please upload a JPG, PNG, WEBP, or GIF image.";
  }
  if (file.size > MAX_SIZE_BYTES) {
    return "Images must be 5MB or smaller.";
  }
  return null;
}

export async function uploadImage(file: File | null): Promise<string> {
  if (!file || file.size === 0) return "";

  const validationError = validateImageFile(file);
  if (validationError) {
    alert(validationError);
    return "";
  }

  const extension = EXTENSION_BY_TYPE[file.type];
  const filePath = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("profile-images").upload(filePath, file);

  if (error) {
    alert(error.message);
    return "";
  }

  const { data } = supabase.storage.from("profile-images").getPublicUrl(filePath);
  return data.publicUrl;
}

export async function uploadImages(files: FileList | null, max: number): Promise<string[]> {
  if (!files || files.length === 0) return [];

  const limitedFiles = Array.from(files).slice(0, max);
  const uploads = await Promise.all(limitedFiles.map(uploadImage));
  return uploads.filter((url) => url !== "");
}
