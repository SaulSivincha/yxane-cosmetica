import "server-only";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const productImagesBucket =
  process.env.SUPABASE_PRODUCT_IMAGES_BUCKET ?? "product-images";

export function getSupabaseAdmin() {
  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function ensureProductImagesBucket() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.storage.getBucket(productImagesBucket);

  if (data) {
    return supabase;
  }

  const { error } = await supabase.storage.createBucket(productImagesBucket, {
    public: true,
    fileSizeLimit: 1024 * 1024 * 5,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  });

  if (error && !error.message.toLowerCase().includes("already exists")) {
    throw new Error(error.message);
  }

  return supabase;
}

export async function uploadProductImage(file: File, slug: string) {
  const supabase = await ensureProductImagesBucket();
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "webp";
  const objectPath = `${slug}/${Date.now()}.${extension}`;
  const bytes = await file.arrayBuffer();

  const { error } = await supabase.storage
    .from(productImagesBucket)
    .upload(objectPath, bytes, {
      contentType: file.type || "image/webp",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from(productImagesBucket)
    .getPublicUrl(objectPath);

  return data.publicUrl;
}
