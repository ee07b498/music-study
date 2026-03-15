import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

const quickLinks = [
  { key: 'about' as const, href: '/about' },
  { key: 'lessons' as const, href: '/lessons' },
  { key: 'teachers' as const, href: '/teachers' },
  { key: 'orchestra' as const, href: '/orchestra' },
  { key: 'shop' as const, href: '/shop' },
  { key: 'news' as const, href: '/news' },
  { key: 'contact' as const, href: '/contact' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Left: Logo + school name + social */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="block font-serif text-2xl font-bold tracking-wide text-white">
                芈雅中乐学院
              </span>
              <span className="block font-serif text-sm tracking-widest text-white/70">
                Meya Conservatory of Chinese Music
              </span>
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/60 transition-colors hover:text-gold"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Middle: Quick links */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-gold">
              {t('quickLinks')}
            </h3>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="font-serif text-sm text-white/70 transition-colors hover:text-gold"
                >
                  {tNav(key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Tagline */}
          <div className="flex flex-col justify-between">
            <p className="font-serif text-lg leading-relaxed text-white/90 italic">
              {t('tagline')}
            </p>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <p className="text-center font-serif text-xs text-white/50">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
