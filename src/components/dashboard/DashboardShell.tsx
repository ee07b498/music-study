'use client';

import { ReactNode, useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Calendar, Users, BookOpen, Bell,
  Settings, Menu, X, LogOut, ChevronRight,
  GraduationCap, ClipboardList, CreditCard, BarChart3,
  ShoppingBag, FileText, UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const teacherNav: NavItem[] = [
  { label: 'Overview', href: '/dashboard/teacher', icon: <LayoutDashboard className="size-5" /> },
  { label: 'My Schedule', href: '/dashboard/teacher/schedule', icon: <Calendar className="size-5" /> },
  { label: 'My Students', href: '/dashboard/teacher/students', icon: <Users className="size-5" /> },
  { label: 'Lesson Records', href: '/dashboard/teacher/lessons', icon: <BookOpen className="size-5" /> },
  { label: 'Notifications', href: '/dashboard/teacher/notifications', icon: <Bell className="size-5" /> },
  { label: 'Profile', href: '/dashboard/teacher/profile', icon: <Settings className="size-5" /> },
];

const studentNav: NavItem[] = [
  { label: 'Overview', href: '/dashboard/student', icon: <LayoutDashboard className="size-5" /> },
  { label: 'My Schedule', href: '/dashboard/student/schedule', icon: <Calendar className="size-5" /> },
  { label: 'Learning Progress', href: '/dashboard/student/progress', icon: <GraduationCap className="size-5" /> },
  { label: 'Booking', href: '/dashboard/student/booking', icon: <ClipboardList className="size-5" /> },
  { label: 'Payments', href: '/dashboard/student/payments', icon: <CreditCard className="size-5" /> },
  { label: 'Profile', href: '/dashboard/student/profile', icon: <Settings className="size-5" /> },
];

const adminNav: NavItem[] = [
  { label: 'Overview', href: '/dashboard/admin', icon: <BarChart3 className="size-5" /> },
  { label: 'Teachers', href: '/dashboard/admin/teachers', icon: <Users className="size-5" /> },
  { label: 'Students', href: '/dashboard/admin/students', icon: <GraduationCap className="size-5" /> },
  { label: 'Courses', href: '/dashboard/admin/courses', icon: <BookOpen className="size-5" /> },
  { label: 'Bookings', href: '/dashboard/admin/bookings', icon: <ClipboardList className="size-5" /> },
  { label: 'Events', href: '/dashboard/admin/events', icon: <Calendar className="size-5" /> },
  { label: 'Shop', href: '/dashboard/admin/shop', icon: <ShoppingBag className="size-5" /> },
  { label: 'Content', href: '/dashboard/admin/content', icon: <FileText className="size-5" /> },
];

interface DashboardShellProps {
  children: ReactNode;
  role: 'teacher' | 'student' | 'admin';
  userName?: string;
}

export default function DashboardShell({ children, role, userName }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = role === 'teacher' ? teacherNav : role === 'student' ? studentNav : adminNav;
  const roleLabel = role === 'teacher' ? 'Teacher' : role === 'student' ? 'Student' : 'Admin';
  const roleColor = role === 'admin' ? 'bg-crimson' : role === 'teacher' ? 'bg-brown' : 'bg-gold';

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 transform bg-card shadow-lg transition-transform duration-200 lg:static lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <div>
              <Link href="/" className="font-serif text-lg font-bold text-brown">芈雅中乐学院</Link>
              <div className="mt-1 flex items-center gap-2">
                <span className={cn('rounded px-2 py-0.5 text-xs font-medium text-white', roleColor)}>
                  {roleLabel}
                </span>
                {userName && <span className="text-xs text-muted-foreground">{userName}</span>}
              </div>
            </div>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="size-5" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== `/dashboard/${role}` && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                      {isActive && <ChevronRight className="ml-auto size-4" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-border px-3 py-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="size-5" />
              Back to Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-card px-4 py-3 lg:px-6">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="size-6" />
          </button>
          <div className="flex-1" />
          <Button variant="ghost" size="icon-sm">
            <Bell className="size-4" />
          </Button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
