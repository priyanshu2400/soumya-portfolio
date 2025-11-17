import { getPortfolioData } from "@/lib/supabase/server";
import { PortfolioShell } from "@/components/site/PortfolioShell";

export default async function Home() {
  const data = await getPortfolioData();
  return <PortfolioShell data={data} />;
}
