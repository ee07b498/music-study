'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Instagram,
  Facebook,
  Youtube,
  Menu,
  ShoppingCart,
  User,
} from 'lucide-react';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

const navLinks = [
  { key: 'about', href: '/about' },
  { key: 'lessons', href: '/lessons' },
  { key: 'teachers', href: '/teachers' },
  { key: 'orchestra', href: '/orchestra' },
  { key: 'shop', href: '/shop' },
  { key: 'news', href: '/news' },
  { key: 'career', href: '/career' },
  { key: 'contact', href: '/contact' },
] as const;

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Header() {
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-cream">
      {/* Top bar with social icons */}
      <div className="hidden border-b border-border/50 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-brown/60 transition-colors hover:text-crimson"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-1.5 font-serif text-brown hover:text-crimson">
                <User className="size-4" />
                <span>{t('login')}</span>
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="ghost" size="icon-sm" className="text-brown hover:text-crimson">
                <ShoppingCart className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        {/* Mobile: hamburger */}
        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="text-brown" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-cream p-0">
              <SheetHeader className="border-b border-border px-6 py-4">
                <SheetTitle className="font-serif text-crimson">
                  <span className="block text-lg">芈雅中乐学院</span>
                  <span className="block text-sm text-brown/70">Meya Conservatory</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col px-4 py-4">
                {navLinks.map(({ key, href }) => (
                  <SheetClose key={key} render={<Link href={href} />}>
                    <span
                      className="block w-full rounded-md px-3 py-2.5 font-serif text-sm text-brown transition-colors hover:bg-primary/5 hover:text-crimson"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(key)}
                    </span>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto border-t border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="text-brown/60 transition-colors hover:text-crimson"
                      >
                        <Icon className="size-4" />
                      </a>
                    ))}
                  </div>
                  <LanguageSwitcher />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full gap-1.5 font-serif">
                      <User className="size-4" />
                      {t('login')}
                    </Button>
                  </Link>
                  <Link href="/shop" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="icon-sm">
                      <ShoppingCart className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center lg:items-start">
          <span className="font-serif text-xl font-bold tracking-wide text-crimson">
            芈雅中乐学院
          </span>
          <span className="font-serif text-xs tracking-widest text-brown/70">
            Meya Conservatory
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="rounded-md px-3 py-2 font-serif text-sm text-brown transition-colors hover:bg-primary/5 hover:text-crimson"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Mobile: right side icons */}
        <div className="flex items-center gap-1 lg:hidden">
          <Link href="/shop">
            <Button variant="ghost" size="icon-sm" className="text-brown hover:text-crimson">
              <ShoppingCart className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
