import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { newsArticles } from '@/lib/data';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <NewsDetailContent article={article} />;
}

function NewsDetailContent({
  article,
}: {
  article: (typeof newsArticles)[number];
}) {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const title = isZh ? article.titleZh : article.title;
  const excerpt = isZh ? article.excerptZh : article.excerpt;

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <Link
            href="/news"
            className="mb-6 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground"
          >
            <ArrowLeft className="size-4" />
            {isZh ? '返回新闻列表' : 'Back to News'}
          </Link>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-primary-foreground/80">
            <CalendarDays className="size-4" />
            <time dateTime={article.date}>{article.date}</time>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 h-64 w-full overflow-hidden rounded-xl bg-muted md:h-96">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <CalendarDays className="size-16 text-primary/30" />
            </div>
          </div>

          <article className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">{excerpt}</p>

            <div className="mt-8 rounded-xl bg-muted/50 p-6">
              <p className="text-sm text-muted-foreground">
                {isZh
                  ? '完整文章内容即将上线，敬请期待。'
                  : 'Full article content coming soon. Stay tuned for more details.'}
              </p>
            </div>
          </article>

          <div className="mt-12 border-t pt-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              {isZh ? '返回新闻列表' : 'Back to News'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
