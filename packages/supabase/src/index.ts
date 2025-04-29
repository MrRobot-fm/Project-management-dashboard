import { createClient } from "@supabase/supabase-js";

interface SupabaseConfigOptions {
  supabaseUrl?: string;
  supabaseKey?: string;
}

async function loadEnv() {
  if (typeof window === "undefined") {
    const dotenv = await import("dotenv");
    dotenv.config();
  }
}

loadEnv();

export function createSupabaseClient(options?: SupabaseConfigOptions) {
  const supabaseUrl =
    options?.supabaseUrl ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;

  const supabaseKey =
    options?.supabaseKey ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and API key are required");
  }

  return createClient(supabaseUrl, supabaseKey);
}

export const supabase = (() => {
  try {
    return createSupabaseClient();
  } catch (error) {
    console.warn(
      "Could not create default Supabase client:",
      (error as Error).message
    );
    return null;
  }
})();
