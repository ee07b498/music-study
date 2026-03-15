'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Shield } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  // In production, this would check the session and redirect automatically
  // For now, show a role selection screen for demo purposes
  const roles = [
    {
      role: 'teacher',
      label: 'Teacher Dashboard',
      description: 'Manage your schedule, students, and lesson records',
      icon: BookOpen,
      color: 'bg-brown text-white',
      href: '/en/dashboard/teacher',
    },
    {
      role: 'student',
      label: 'Student Dashboard',
      description: 'View your schedule, progress, and booking',
      icon: GraduationCap,
      color: 'bg-gold text-white',
      href: '/en/dashboard/student',
    },
    {
      role: 'admin',
      label: 'Admin Dashboard',
      description: 'Manage teachers, students, courses, and more',
      icon: Shield,
      color: 'bg-crimson text-white',
      href: '/en/dashboard/admin',
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-brown">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Select your dashboard to continue</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {roles.map(({ role, label, description, icon: Icon, color, href }) => (
            <Card
              key={role}
              className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
              onClick={() => router.push(href)}
            >
              <CardContent className="py-8 text-center">
                <div className={`mx-auto mb-4 flex size-14 items-center justify-center rounded-full ${color}`}>
                  <Icon className="size-7" />
                </div>
                <h2 className="mb-2 font-semibold">{label}</h2>
                <p className="text-xs text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demo mode — In production, you will be redirected automatically based on your role.
        </p>
      </div>
    </div>
  );
}
