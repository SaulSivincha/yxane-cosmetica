import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./env";

export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.publishableKey,
);
