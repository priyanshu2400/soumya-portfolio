import { createBrowserClient } from "@supabase/ssr";

const getEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing Supabase credentials");
  }

  return { url, anonKey };
};

export const createSupabaseBrowserClient = () => {
  const { url, anonKey } = getEnv();
  return createBrowserClient(url, anonKey);
};

