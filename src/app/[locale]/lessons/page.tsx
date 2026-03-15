import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { instruments } from '@/lib/data';

export default async function LessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LessonsContent />;
}

function LessonsContent() {
  const t = useTranslations('lessons');
  const locale = useLocale();
  const isZh = locale === 'zh';

  const chatswoodInstruments = instruments.filter((i) =>
    i.campuses.includes('chatswood')
  );
  const burwoodInstruments = instruments.filter((i) =>
    i.campuses.includes('burwood')
  );

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

      {/* Chatswood Campus */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-primary rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t('chatswood')}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {chatswoodInstruments.map((instrument) => (
              <Link
                key={instrument.id}
                href={`/lessons/${instrument.id}`}
                className="group bg-card rounded-xl p-5 ring-1 ring-foreground/10 hover:ring-primary/30 hover:shadow-lg transition-all text-center"
              >
                <div className="text-4xl mb-3">{instrument.icon}</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {isZh ? instrument.nameZh : instrument.name}
                </h3>
                <p className="text-xs text-foreground/50 mt-1">
                  {isZh ? instrument.name : instrument.nameZh}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Burwood Campus */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-[#c5a55a] rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t('burwood')}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {burwoodInstruments.map((instrument) => (
              <Link
                key={instrument.id}
                href={`/lessons/${instrument.id}`}
                className="group bg-card rounded-xl p-5 ring-1 ring-foreground/10 hover:ring-[#c5a55a]/30 hover:shadow-lg transition-all text-center"
              >
                <div className="text-4xl mb-3">{instrument.icon}</div>
                <h3 className="font-semibold text-foreground group-hover:text-[#c5a55a] transition-colors">
                  {isZh ? instrument.nameZh : instrument.name}
                </h3>
                <p className="text-xs text-foreground/50 mt-1">
                  {isZh ? instrument.name : instrument.nameZh}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {isZh ? '不确定选择哪种乐器？' : 'Not sure which instrument to choose?'}
          </h2>
          <p className="text-foreground/70 mb-6">
            {isZh
              ? '预约一节免费试课，让我们的老师帮助你找到最适合的乐器。'
              : 'Book a free trial lesson and let our teachers help you find the perfect instrument.'}
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center h-11 bg-primary text-white px-8 font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t('bookTrial')}
          </Link>
        </div>
      </section>
    </div>
  );
}
