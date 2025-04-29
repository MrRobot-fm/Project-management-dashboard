import { createSupabaseClient } from "@workspace/supabase";

export const supabase = createSupabaseClient({
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
});
