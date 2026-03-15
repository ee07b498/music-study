import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { instruments } from '@/lib/data';

const featuredIds = ['guzheng', 'erhu', 'pipa', 'dizi', 'yangqin', 'guqin'];

export default function CoursesPreview() {
  const t = useTranslations('home');
  const locale = useLocale();

  const featured = featuredIds
    .map((id) => instruments.find((i) => i.id === id))
    .filter(Boolean);

  return (
    <section className="bg-secondary/50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <div className="ornament-divider mb-6">
            <span className="text-xl text-gold">&#9835;</span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold text-brown sm:text-4xl">
            {t('courses.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-brown/70 md:text-lg">
            {t('courses.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3">
          {featured.map((instrument) => {
            if (!instrument) return null;
            return (
              <Link key={instrument.id} href="/lessons" className="group">
                <Card className="h-full border-0 bg-card/80 ring-gold/10 transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-gold/30 hover:shadow-lg">
                  <CardContent className="flex flex-col items-center py-8 text-center">
                    <span className="mb-4 text-5xl" role="img" aria-label={instrument.name}>
                      {instrument.icon}
                    </span>
                    <h3 className="mb-1 font-serif text-lg font-semibold text-brown">
                      {locale === 'zh' ? instrument.nameZh : instrument.name}
                    </h3>
                    <p className="text-sm text-brown/50">
                      {locale === 'zh' ? instrument.name : instrument.nameZh}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/lessons"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-brown/30 bg-transparent px-8 text-sm font-medium text-brown transition-colors hover:bg-brown/5"
          >
            {t('courses.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
