export type SectionContentBlock = {
  id: string;
  heading: string | null;
  body_text: string | null;
  order: number;
};

export type ImageAsset = {
  id: string;
  url: string;
  caption: string | null;
  alt_text: string | null;
  order: number;
};

export type PortfolioSection = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  order: number;
  is_published: boolean;
  content: SectionContentBlock[];
  images: ImageAsset[];
};

export type Skill = {
  id: string;
  name: string;
  category: 'core' | 'tool';
  order: number;
};

export type PortfolioDataPayload = {
  sections: PortfolioSection[];
  skills: Skill[];
  sourcedFromSupabase: boolean;
};

