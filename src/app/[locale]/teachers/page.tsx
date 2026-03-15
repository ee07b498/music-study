import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { teachers } from '@/lib/data';

export default async function TeachersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TeachersContent />;
}

function TeachersContent() {
  const t = useTranslations('teachers');
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-card rounded-xl overflow-hidden ring-1 ring-foreground/10 hover:ring-primary/30 transition-all hover:shadow-lg"
              >
                {/* Photo placeholder */}
                <div className="bg-primary/20 w-full h-56 flex items-center justify-center">
                  <span className="text-5xl text-primary/40">
                    {(isZh ? teacher.nameZh : teacher.name).charAt(0)}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {isZh ? teacher.nameZh : teacher.name}
                  </h3>
                  <p className="text-sm text-[#c5a55a] font-medium mb-3">
                    {isZh ? teacher.titleZh : teacher.title}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs text-foreground/60 uppercase tracking-wider mb-1.5">
                      {t('instruments')}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(isZh ? teacher.instrumentsZh : teacher.instruments).map(
                        (instrument, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full"
                          >
                            {instrument}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/teachers/${teacher.slug}`}
                    className="inline-flex items-center justify-center w-full h-9 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {t('readMore')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
