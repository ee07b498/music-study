import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function OrchestraPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OrchestraContent />;
}

function OrchestraContent() {
  const t = useTranslations('orchestra');
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

      {/* About the Orchestra */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {t('about.description')}
              </p>
            </div>
            <div className="bg-primary/20 w-full h-72 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            {t('benefits.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Ensemble Experience */}
            <div className="bg-card rounded-xl p-8 ring-1 ring-foreground/10 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/15 rounded-xl flex items-center justify-center mb-5">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t('benefits.ensemble')}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {t('benefits.ensembleDesc')}
              </p>
            </div>

            {/* Performance Opportunities */}
            <div className="bg-card rounded-xl p-8 ring-1 ring-foreground/10 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#c5a55a]/15 rounded-xl flex items-center justify-center mb-5">
                <svg
                  className="w-7 h-7 text-[#c5a55a]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t('benefits.performance')}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {t('benefits.performanceDesc')}
              </p>
            </div>

            {/* Musical Growth */}
            <div className="bg-card rounded-xl p-8 ring-1 ring-foreground/10 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/15 rounded-xl flex items-center justify-center mb-5">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t('benefits.growth')}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {t('benefits.growthDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join / Apply */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            {t('apply.title')}
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-10 max-w-xl mx-auto">
            {t('apply.description')}
          </p>

          {/* Steps */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold">
                1
              </div>
              <p className="text-sm text-foreground/70">
                {isZh ? '填写申请表' : 'Fill out application'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold">
                2
              </div>
              <p className="text-sm text-foreground/70">
                {isZh ? '参加面试/试奏' : 'Attend audition'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold">
                3
              </div>
              <p className="text-sm text-foreground/70">
                {isZh ? '加入排练' : 'Join rehearsals'}
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 bg-primary text-white px-10 text-lg font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t('apply.cta')}
          </Link>
        </div>
      </section>
    </div>
  );
}
