import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { instruments, teachers } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return instruments.map((i) => ({ instrument: i.id }));
}

export default async function InstrumentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; instrument: string }>;
}) {
  const { locale, instrument: instrumentId } = await params;
  setRequestLocale(locale);

  const instrument = instruments.find((i) => i.id === instrumentId);
  if (!instrument) {
    notFound();
  }

  return <InstrumentDetailContent instrument={instrument} />;
}

function InstrumentDetailContent({
  instrument,
}: {
  instrument: (typeof instruments)[number];
}) {
  const t = useTranslations('lessons');
  const locale = useLocale();
  const isZh = locale === 'zh';

  // Find teachers who teach this instrument
  const availableTeachers = teachers.filter((teacher) =>
    teacher.instruments.some(
      (inst) => inst.toLowerCase() === instrument.name.toLowerCase()
    )
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-primary py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/lessons"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm"
          >
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t('back')}
          </Link>
        </div>
      </section>

      {/* Instrument Detail */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image & Icon */}
            <div>
              <div className="bg-primary/15 w-full aspect-square rounded-xl flex items-center justify-center mb-4">
                <span className="text-8xl">{instrument.icon}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {instrument.campuses.map((campus) => (
                  <span
                    key={campus}
                    className="inline-block bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full capitalize"
                  >
                    {campus}
                  </span>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {isZh ? instrument.nameZh : instrument.name}
              </h1>
              <p className="text-lg text-foreground/50 mb-6">
                {isZh ? instrument.name : instrument.nameZh}
              </p>

              {/* Levels */}
              <div className="mb-8">
                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                    {t('beginner')}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    {t('intermediate')}
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                    {t('advanced')}
                  </span>
                </div>
                <p className="text-sm text-foreground/60 mt-2">
                  {t('allLevels')}
                </p>
              </div>

              {/* Pricing placeholder */}
              <div className="bg-muted rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {isZh ? '课程费用' : 'Lesson Pricing'}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">
                      30 {t('duration')} ({isZh ? '个人课' : 'Private'})
                    </span>
                    <span className="font-semibold text-foreground">
                      $50 {t('perLesson')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">
                      45 {t('duration')} ({isZh ? '个人课' : 'Private'})
                    </span>
                    <span className="font-semibold text-foreground">
                      $70 {t('perLesson')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">
                      60 {t('duration')} ({isZh ? '个人课' : 'Private'})
                    </span>
                    <span className="font-semibold text-foreground">
                      $90 {t('perLesson')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Trial CTA */}
              <Link
                href="/booking"
                className="inline-flex items-center justify-center w-full h-12 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors text-lg"
              >
                {t('bookTrial')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Available Teachers */}
      {availableTeachers.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {t('availableTeachers')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {availableTeachers.map((teacher) => (
                <Link
                  key={teacher.id}
                  href={`/teachers/${teacher.slug}`}
                  className="flex items-center gap-4 bg-card rounded-xl p-4 ring-1 ring-foreground/10 hover:ring-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-xl text-primary/60">
                      {(isZh ? teacher.nameZh : teacher.name).charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {isZh ? teacher.nameZh : teacher.name}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {isZh ? teacher.titleZh : teacher.title}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {teacher.campuses.map((campus) => (
                        <span
                          key={campus}
                          className="text-xs text-[#c5a55a] capitalize"
                        >
                          {campus}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
