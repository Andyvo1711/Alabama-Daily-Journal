import type { Metadata } from "next";
import {
  getAllArticles,
  getArticlesByCategory,
  getFeaturedArticles,
} from "@/lib/articles";
import { siteConfig } from "@/config/site";
import LeadNewsGrid from "@/components/LeadNewsGrid";
import DailyBrief from "@/components/DailyBrief";
import SplitDesk from "@/components/SplitDesk";
import AlabamaBusiness from "@/components/AlabamaBusiness";
import FinanceLedger from "@/components/FinanceLedger";
import CommunityReport from "@/components/CommunityReport";
import BeautyWellnessSection from "@/components/BeautyWellnessSection";
import LatestNewsList from "@/components/LatestNewsList";
import type { ArticleListItem } from "@/types/article";

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const all = getAllArticles();
  const featured = getFeaturedArticles();

  const usedSlugs = new Set<string>();
  const take = (source: ArticleListItem[], count: number): ArticleListItem[] => {
    const picked: ArticleListItem[] = [];
    for (const article of source) {
      if (picked.length >= count) break;
      if (usedSlugs.has(article.slug)) continue;
      picked.push(article);
      usedSlugs.add(article.slug);
    }
    return picked;
  };

  const leadPool = featured.length > 0 ? [...featured, ...all] : all;
  const [leadMain] = take(leadPool, 1);
  const leadSecondary = take(all, 2);
  const leadLatest = take(all, 6);
  const dailyBrief = take(all, 5);

  const education = getArticlesByCategory("education");
  const healthcare = getArticlesByCategory("healthcare");
  const businessLeaders = getArticlesByCategory("business-leaders");
  const financeEconomy = getArticlesByCategory("finance-economy");
  const community = getArticlesByCategory("community");
  const beautyWellness = getArticlesByCategory("beauty-wellness");

  const latestNews = take(all, 8);

  return (
    <>
      {leadMain && (
        <LeadNewsGrid main={leadMain} secondary={leadSecondary} latest={leadLatest} />
      )}

      {dailyBrief.length > 0 && <DailyBrief articles={dailyBrief} />}

      {education.length >= 3 && healthcare.length >= 3 && (
        <SplitDesk
          education={{ main: education[0], secondary: education.slice(1, 3) }}
          healthcare={{ main: healthcare[0], secondary: healthcare.slice(1, 3) }}
        />
      )}

      {businessLeaders.length >= 4 && (
        <AlabamaBusiness main={businessLeaders[0]} compact={businessLeaders.slice(1, 4)} />
      )}

      {financeEconomy.length >= 4 && <FinanceLedger articles={financeEconomy.slice(0, 4)} />}

      {community.length > 0 && <CommunityReport articles={community.slice(0, 6)} />}

      {beautyWellness.length >= 4 && (
        <BeautyWellnessSection
          main={beautyWellness[0]}
          secondary={beautyWellness.slice(1, 4)}
        />
      )}

      {latestNews.length > 0 && <LatestNewsList articles={latestNews} />}
    </>
  );
}
