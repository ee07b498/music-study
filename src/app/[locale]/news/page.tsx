import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { newsArticles } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, ArrowRight } from 'lucide-react';

export default function NewsPage() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            {isZh ? '新闻动态' : 'News & Updates'}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            {isZh
              ? '了解芈雅中乐学院的最新动态'
              : 'Stay up to date with Meya Conservatory'}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {newsArticles.map((article) => {
            const title = isZh ? article.titleZh : article.title;
            const excerpt = isZh ? article.excerptZh : article.excerpt;

            return (
              <Link key={article.id} href={`/news/${article.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <div className="relative h-56 w-full overflow-hidden rounded-t-xl bg-muted">
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <CalendarDays className="size-12 text-primary/30" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="size-4" />
                      <time dateTime={article.date}>{article.date}</time>
                    </div>
                    <CardTitle className="mt-2 text-xl">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {isZh ? '阅读更多' : 'Read More'}
                      <ArrowRight className="size-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
