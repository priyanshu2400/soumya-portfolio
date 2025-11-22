import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { fallbackPortfolioData } from "../fallback-data";
import {
  PortfolioDataPayload,
  PortfolioSection,
  SectionContentBlock,
  ImageAsset,
  Skill,
} from "../types";

const getEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
};

export const createServerSupabaseClient = async () => {
  const env = getEnv();
  if (!env) {
    throw new Error("Supabase environment variables are missing");
  }

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};

type SupabaseSectionRow = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  order: number;
  is_published: boolean;
  section_content: SectionContentBlock[] | null;
  images: ImageAsset[] | null;
};

const mapSection = (raw: SupabaseSectionRow): PortfolioSection => {
  const content =
    (raw.section_content as SectionContentBlock[] | null)?.sort(
      (a, b) => a.order - b.order,
    ) ?? [];

  const images =
    (raw.images as ImageAsset[] | null)?.sort(
      (a, b) => a.order - b.order,
    ) ?? [];

  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    description: raw.description,
    order: raw.order,
    is_published: raw.is_published,
    content,
    images,
  };
};

const baseSectionQuery = `
        id,
        title,
        slug,
        description,
        order,
        is_published,
        section_content (
          id,
          heading,
          body_text,
          order
        ),
        images (
          id,
          url,
          caption,
          alt_text,
          order
        )
      `;

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("order", { ascending: true });

    if (error || !data) {
      console.error("Unable to load skills", error);
      return [];
    }

    return data as Skill[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getPortfolioData = async (): Promise<PortfolioDataPayload> => {
  try {
    const env = getEnv();
    if (!env) {
      return fallbackPortfolioData;
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("sections")
      .select(baseSectionQuery)
      .eq("is_published", true)
      .order("order", { ascending: true });

    if (error || !data) {
      console.error("Unable to load Supabase data", error);
      return fallbackPortfolioData;
    }

    // Fetch skills
    const skills = await getSkills();

    return {
      sections: data.map(mapSection),
      skills,
      sourcedFromSupabase: true,
    };
  } catch (err) {
    console.error(err);
    return fallbackPortfolioData;
  }
};

export const getAllSections = async (): Promise<PortfolioSection[]> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("sections")
    .select(baseSectionQuery)
    .order("order", { ascending: true });

  if (error || !data) {
    console.error("Unable to load sections", error);
    return [];
  }

  return data.map(mapSection);
};

export const getAuthenticatedUser = async () => {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
};

