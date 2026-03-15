'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Calendar, Clock, Music, User, CreditCard,
  BookOpen, ArrowRight, CheckCircle, Bell, Star,
} from 'lucide-react';

// --- Mock Data ---
const nextLesson = {
  date: 'March 18, 2026',
  time: '4:00 PM - 4:45 PM',
  teacher: 'Ms. Wang Li',
  instrument: 'Guzheng',
  location: 'Room 3A',
};

const credits = {
  remaining: 12,
  total: 20,
  expiresAt: 'June 30, 2026',
};

const recentActivity = [
  { id: 1, type: 'lesson', text: 'Completed Guzheng lesson with Ms. Wang Li', date: 'Mar 12, 2026', icon: CheckCircle },
  { id: 2, type: 'payment', text: 'Payment received — 10 lesson credits added', date: 'Mar 10, 2026', icon: CreditCard },
  { id: 3, type: 'booking', text: 'Booked Erhu lesson with Mr. Zhang Wei', date: 'Mar 8, 2026', icon: Calendar },
  { id: 4, type: 'feedback', text: 'New feedback from Ms. Wang Li on Guzheng progress', date: 'Mar 7, 2026', icon: Star },
  { id: 5, type: 'notification', text: 'Schedule change: Pipa lesson moved to Thursday', date: 'Mar 5, 2026', icon: Bell },
];

export default function StudentOverviewPage() {
  const [loading] = useState(false);

  if (loading) {
    return (
      <DashboardShell role="student" userName="Student Name">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role="student" userName="Emily Chen">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Emily!</h1>
          <p className="mt-1 text-muted-foreground">
            Here is an overview of your music learning journey.
          </p>
        </div>

        {/* Top Cards Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Next Lesson Card */}
          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="size-4 text-primary" />
                Next Lesson
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded-lg bg-primary/5 p-3">
                <p className="font-semibold text-foreground">{nextLesson.instrument}</p>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="size-3.5" />
                    <span>{nextLesson.date} &middot; {nextLesson.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="size-3.5" />
                    <span>{nextLesson.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Music className="size-3.5" />
                    <span>{nextLesson.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credits Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="size-4 text-primary" />
                Lesson Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">{credits.remaining}</span>
                <span className="text-sm text-muted-foreground">/ {credits.total} remaining</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(credits.remaining / credits.total) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Expires: {credits.expiresAt}
              </p>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="size-4 text-primary" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-primary/5 p-2 text-center">
                  <p className="text-2xl font-bold text-primary">4</p>
                  <p className="text-xs text-muted-foreground">Lessons</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-2 text-center">
                  <p className="text-2xl font-bold text-primary">3h</p>
                  <p className="text-xs text-muted-foreground">Practice</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/student/booking">
            <Button variant="default" size="lg">
              <Calendar className="size-4" />
              Book a Lesson
            </Button>
          </Link>
          <Link href="/dashboard/student/schedule">
            <Button variant="outline" size="lg">
              <Clock className="size-4" />
              View Schedule
            </Button>
          </Link>
          <Link href="/dashboard/student/progress">
            <Button variant="outline" size="lg">
              <BookOpen className="size-4" />
              View Progress
            </Button>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Your latest updates and events</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No recent activity to show.
              </div>
            ) : (
              <div className="space-y-0">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id}>
                      {index > 0 && <Separator className="my-3" />}
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Icon className="size-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{activity.text}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                        <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
