import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { teachers } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return teachers.map((t) => ({ slug: t.slug }));
}

export default async function TeacherDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const teacher = teachers.find((t) => t.slug === slug);
  if (!teacher) {
    notFound();
  }

  return <TeacherDetailContent teacher={teacher} />;
}

function TeacherDetailContent({
  teacher,
}: {
  teacher: (typeof teachers)[number];
}) {
  const t = useTranslations('teachers');
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
    <div className="min-h-screen">
      {/* Back Link */}
      <section className="bg-primary py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/teachers"
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

      {/* Teacher Detail */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Photo & Quick Info */}
            <div className="md:col-span-1">
              <div className="bg-primary/20 w-full aspect-[3/4] rounded-xl flex items-center justify-center mb-6">
                <span className="text-7xl text-primary/40">
                  {(isZh ? teacher.nameZh : teacher.name).charAt(0)}
                </span>
              </div>

              {/* Instruments */}
              <div className="bg-card rounded-xl p-5 ring-1 ring-foreground/10 mb-4">
                <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">
                  {t('instruments')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(isZh ? teacher.instrumentsZh : teacher.instruments).map(
                    (instrument, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium"
                      >
                        {instrument}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Campuses */}
              <div className="bg-card rounded-xl p-5 ring-1 ring-foreground/10">
                <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">
                  {isZh ? '校区' : 'Campuses'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {teacher.campuses.map((campus) => (
                    <span
                      key={campus}
                      className="inline-block bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full capitalize"
                    >
                      {campus}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {isZh ? teacher.nameZh : teacher.name}
              </h1>
              <p className="text-lg text-[#c5a55a] font-medium mb-8">
                {isZh ? teacher.titleZh : teacher.title}
              </p>

              <div className="prose max-w-none">
                <p className="text-foreground/80 text-lg leading-relaxed">
                  {isZh ? teacher.bioZh : teacher.bio}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-12 p-6 bg-muted rounded-xl">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {isZh
                    ? `想跟${teacher.nameZh}老师学习？`
                    : `Want to learn with ${teacher.name}?`}
                </h3>
                <p className="text-foreground/70 mb-4">
                  {isZh
                    ? '预约一节免费试课，开始你的音乐之旅。'
                    : 'Book a free trial lesson and start your musical journey.'}
                </p>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center h-10 bg-primary text-white px-6 font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {isZh ? '预约试课' : 'Book a Trial Lesson'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
