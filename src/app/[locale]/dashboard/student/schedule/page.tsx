'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock, User, Music } from 'lucide-react';

// --- Types ---
type LessonStatus = 'upcoming' | 'completed' | 'cancelled';

interface Lesson {
  id: number;
  day: number; // 0=Mon, 1=Tue, ..., 6=Sun
  time: string;
  duration: string;
  teacher: string;
  instrument: string;
  status: LessonStatus;
}

// --- Mock Data ---
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const weekDaysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const weeklyLessons: Lesson[] = [
  { id: 1, day: 0, time: '4:00 PM', duration: '45 min', teacher: 'Ms. Wang Li', instrument: 'Guzheng', status: 'completed' },
  { id: 2, day: 2, time: '4:00 PM', duration: '45 min', teacher: 'Ms. Wang Li', instrument: 'Guzheng', status: 'upcoming' },
  { id: 3, day: 3, time: '5:30 PM', duration: '45 min', teacher: 'Mr. Zhang Wei', instrument: 'Erhu', status: 'upcoming' },
  { id: 4, day: 4, time: '3:00 PM', duration: '30 min', teacher: 'Ms. Liu Mei', instrument: 'Pipa', status: 'cancelled' },
  { id: 5, day: 5, time: '10:00 AM', duration: '60 min', teacher: 'Mr. Chen Bo', instrument: 'Dizi', status: 'upcoming' },
  { id: 6, day: 5, time: '2:00 PM', duration: '45 min', teacher: 'Ms. Wang Li', instrument: 'Guzheng', status: 'upcoming' },
];

const statusConfig: Record<LessonStatus, { label: string; color: string; badgeClass: string }> = {
  upcoming: { label: 'Upcoming', color: 'border-l-blue-500 bg-blue-50', badgeClass: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completed', color: 'border-l-green-500 bg-green-50', badgeClass: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', color: 'border-l-red-500 bg-red-50', badgeClass: 'bg-red-100 text-red-700' },
};

export default function StudentSchedulePage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [loading] = useState(false);

  // Calculate week dates
  const today = new Date();
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(today.getDate() + diffToMonday + weekOffset * 7);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const weekLabel = `${formatDate(weekDates[0])} - ${formatDate(weekDates[6])}, ${weekDates[6].getFullYear()}`;

  if (loading) {
    return (
      <DashboardShell role="student" userName="Student Name">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading schedule...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role="student" userName="Emily Chen">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Schedule</h1>
          <p className="mt-1 text-muted-foreground">View your upcoming and past lessons.</p>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => setWeekOffset(weekOffset - 1)}>
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          <div className="text-center">
            <p className="font-semibold text-foreground">{weekLabel}</p>
            {weekOffset !== 0 && (
              <button
                className="text-xs text-primary hover:underline"
                onClick={() => setWeekOffset(0)}
              >
                Back to this week
              </button>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={() => setWeekOffset(weekOffset + 1)}>
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          {Object.entries(statusConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={`inline-block size-3 rounded-full ${config.badgeClass.split(' ')[0]}`} />
              <span className="text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>

        {/* Weekly Calendar */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {weekDays.map((day, dayIndex) => {
            const dayLessons = weeklyLessons.filter((l) => l.day === dayIndex);
            const dateObj = weekDates[dayIndex];
            const isToday =
              dateObj.toDateString() === today.toDateString() && weekOffset === 0;

            return (
              <Card
                key={day}
                className={`min-h-[140px] ${isToday ? 'ring-2 ring-primary/30' : ''}`}
              >
                <CardHeader className="p-3 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {weekDaysShort[dayIndex]}
                    </CardTitle>
                    <span
                      className={`text-sm font-medium ${
                        isToday
                          ? 'flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground'
                          : 'text-foreground'
                      }`}
                    >
                      {dateObj.getDate()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 p-3 pt-0">
                  {dayLessons.length === 0 ? (
                    <p className="py-2 text-center text-xs text-muted-foreground">No lessons</p>
                  ) : (
                    dayLessons.map((lesson) => {
                      const config = statusConfig[lesson.status];
                      return (
                        <div
                          key={lesson.id}
                          className={`rounded-md border-l-4 p-2 ${config.color}`}
                        >
                          <p className="text-xs font-semibold text-foreground">
                            {lesson.instrument}
                          </p>
                          <div className="mt-1 space-y-0.5">
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <Clock className="size-3" />
                              {lesson.time} ({lesson.duration})
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <User className="size-3" />
                              {lesson.teacher}
                            </div>
                          </div>
                          <span
                            className={`mt-1.5 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${config.badgeClass}`}
                          >
                            {config.label}
                          </span>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Upcoming Lessons List (mobile-friendly) */}
        <Card className="lg:hidden">
          <CardHeader>
            <CardTitle className="text-base">All Lessons This Week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weeklyLessons.length === 0 ? (
              <p className="py-4 text-center text-muted-foreground">No lessons scheduled this week.</p>
            ) : (
              weeklyLessons
                .sort((a, b) => a.day - b.day)
                .map((lesson) => {
                  const config = statusConfig[lesson.status];
                  return (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-3 rounded-lg border-l-4 p-3 ${config.color}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">
                          {lesson.instrument}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {weekDays[lesson.day]} &middot; {lesson.time} &middot; {lesson.duration}
                        </p>
                        <p className="text-sm text-muted-foreground">{lesson.teacher}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${config.badgeClass}`}
                      >
                        {config.label}
                      </span>
                    </div>
                  );
                })
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
