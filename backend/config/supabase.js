import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const authOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
};

// client for normal database calls
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  authOptions,
);

// client for handling auth
export const createAuthClient = () => {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
    authOptions,
  );
};
