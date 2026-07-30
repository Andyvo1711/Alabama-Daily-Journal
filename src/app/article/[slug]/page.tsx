import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { getCategory } from "@/config/categories";
import { formatDisplayDate } from "@/lib/dates";
import CategoryLabel from "@/components/CategoryLabel";
import RelatedStories from "@/components/RelatedStories";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Story Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/article/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImage }],
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = getCategory(article.category);
  const related = getRelatedArticles(article, 4);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-[760px]">
        <CategoryLabel category={article.category} />
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-headline sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-charcoal">{article.excerpt}</p>
        <p className="mt-4 text-sm uppercase tracking-wide text-medium-gray">
          {formatDisplayDate(article.date)}
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-[1100px]">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-light-gray">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 1100px) 1100px, 100vw"
            className="object-cover"
          />
        </div>
        <p className="mt-2 text-xs text-medium-gray">{article.imageCredit}</p>
      </div>

      <div className="mx-auto mt-10 max-w-[760px]">
        <div
          className="article-body font-serif text-lg text-charcoal"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <Link
          href={`/category/${article.category}`}
          className="mt-10 inline-block text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
        >
          Back to {category?.label ?? article.category}
        </Link>

        <RelatedStories articles={related} />
      </div>
    </div>
  );
}
