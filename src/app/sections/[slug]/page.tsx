import { notFound } from "next/navigation";

import { getPortfolioData } from "@/lib/supabase/server";
import { PortfolioShell } from "@/components/site/PortfolioShell";

type Params = {
  slug: string;
};

export default async function SectionLanding({
  params,
}: {
  params: Promise<Params>;
}) {
  const data = await getPortfolioData();
  const { slug: targetSlug } = await params;
  const exists = data.sections.some(
    (section) => section.slug === targetSlug,
  );

  if (!exists) {
    notFound();
  }

  return <PortfolioShell data={data} highlightSlug={targetSlug} />;
}

