import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import CoursesPreview from '@/components/home/CoursesPreview';
import EventsPreview from '@/components/home/EventsPreview';
import OrchestraSection from '@/components/home/OrchestraSection';
import CTASection from '@/components/home/CTASection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <CoursesPreview />
      <EventsPreview />
      <OrchestraSection />
      <CTASection />
    </>
  );
}
