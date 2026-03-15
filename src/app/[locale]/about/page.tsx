import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('about');
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

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t('mission.title')}
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {t('mission.description')}
              </p>
            </div>
            <div className="bg-primary/20 w-full h-72 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Campuses Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            {t('campuses.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Chatswood Campus */}
            <div className="bg-card rounded-xl overflow-hidden ring-1 ring-foreground/10">
              <div className="bg-primary/15 w-full h-48" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {t('campuses.chatswood.name')}
                </h3>
                <p className="text-sm text-[#c5a55a] font-medium mb-3">
                  {t('campuses.chatswood.address')}
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  {t('campuses.chatswood.description')}
                </p>
              </div>
            </div>

            {/* Burwood Campus */}
            <div className="bg-card rounded-xl overflow-hidden ring-1 ring-foreground/10">
              <div className="bg-primary/15 w-full h-48" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {t('campuses.burwood.name')}
                </h3>
                <p className="text-sm text-[#c5a55a] font-medium mb-3">
                  {t('campuses.burwood.address')}
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  {t('campuses.burwood.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            {t('values.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Excellence */}
            <div className="text-center p-8 bg-card rounded-xl ring-1 ring-foreground/10">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t('values.excellence')}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {t('values.excellenceDesc')}
              </p>
            </div>

            {/* Culture */}
            <div className="text-center p-8 bg-card rounded-xl ring-1 ring-foreground/10">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t('values.culture')}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {t('values.cultureDesc')}
              </p>
            </div>

            {/* Community */}
            <div className="text-center p-8 bg-card rounded-xl ring-1 ring-foreground/10">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t('values.community')}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {t('values.communityDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
