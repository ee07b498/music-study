'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Calendar, Users, BookOpen, Bell, Clock,
  Music, ChevronRight, CheckCircle, AlertCircle
} from 'lucide-react';

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
}

interface ScheduleItem {
  id: string;
  time: string;
  student: string;
  instrument: string;
  campus: string;
  status: 'confirmed' | 'pending';
}

interface BookingRequest {
  id: string;
  student: string;
  instrument: string;
  requestedDate: string;
  requestedTime: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const mockStats: StatCard[] = [
  { label: "Today's Lessons", value: 5, icon: <Calendar className="size-5 text-primary" />, description: '3 completed, 2 upcoming' },
  { label: 'Pending Bookings', value: 3, icon: <Clock className="size-5 text-amber-600" />, description: 'Awaiting your response' },
  { label: 'Total Students', value: 24, icon: <Users className="size-5 text-emerald-600" />, description: '2 new this month' },
  { label: 'Unread Notifications', value: 7, icon: <Bell className="size-5 text-blue-600" />, description: '3 booking requests' },
];

const mockSchedule: ScheduleItem[] = [
  { id: '1', time: '09:00 - 09:45', student: 'Emily Chen', instrument: 'Guzheng', campus: 'Burwood', status: 'confirmed' },
  { id: '2', time: '10:00 - 10:45', student: 'Kevin Wu', instrument: 'Erhu', campus: 'Burwood', status: 'confirmed' },
  { id: '3', time: '11:00 - 11:45', student: 'Sarah Li', instrument: 'Pipa', campus: 'Burwood', status: 'confirmed' },
  { id: '4', time: '14:00 - 14:45', student: 'Jason Zhang', instrument: 'Guzheng', campus: 'CBD', status: 'pending' },
  { id: '5', time: '15:00 - 15:45', student: 'Amy Wang', instrument: 'Dizi', campus: 'CBD', status: 'confirmed' },
];

const mockBookings: BookingRequest[] = [
  { id: '1', student: 'Olivia Huang', instrument: 'Guzheng', requestedDate: '2026-03-20', requestedTime: '10:00', status: 'pending', createdAt: '2 hours ago' },
  { id: '2', student: 'Daniel Park', instrument: 'Erhu', requestedDate: '2026-03-21', requestedTime: '14:00', status: 'pending', createdAt: '5 hours ago' },
  { id: '3', student: 'Mia Liu', instrument: 'Pipa', requestedDate: '2026-03-22', requestedTime: '11:00', status: 'pending', createdAt: '1 day ago' },
];

export default function TeacherOverviewPage() {
  const [stats, setStats] = useState<StatCard[]>(mockStats);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(mockSchedule);
  const [bookings, setBookings] = useState<BookingRequest[]>(mockBookings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/teacher/overview');
        if (res.ok) {
          const data = await res.json();
          if (data.stats) setStats(data.stats);
          if (data.schedule) setSchedule(data.schedule);
          if (data.bookings) setBookings(data.bookings);
        }
      } catch {
        // Use mock data as fallback
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <DashboardShell role="teacher" userName="Teacher Name">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Here is your summary for today, Sunday March 15, 2026.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-2">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 w-24 rounded bg-muted" />
                      <div className="h-8 w-16 rounded bg-muted" />
                      <div className="h-3 w-32 rounded bg-muted" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : stats.map((stat, i) => (
                <Card key={i}>
                  <CardContent className="pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                      {stat.icon}
                    </div>
                    <div className="mt-2 text-3xl font-bold text-foreground">{stat.value}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="size-4 text-primary" />
                  Today&apos;s Schedule
                </CardTitle>
                <Link
                  href="/dashboard/teacher/schedule"
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                >
                  View all <ChevronRight className="size-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center gap-3">
                      <div className="h-10 w-full rounded bg-muted" />
                    </div>
                  ))}
                </div>
              ) : schedule.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Calendar className="size-10 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">No lessons scheduled for today.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {schedule.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-lg border border-border p-3"
                    >
                      <div className="flex-shrink-0 text-center">
                        <div className="text-xs font-semibold text-foreground">{item.time.split(' - ')[0]}</div>
                        <div className="text-[10px] text-muted-foreground">{item.time.split(' - ')[1]}</div>
                      </div>
                      <Separator orientation="vertical" className="h-8" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground truncate">{item.student}</span>
                          <Badge variant={item.status === 'confirmed' ? 'default' : 'secondary'} className="text-[10px]">
                            {item.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <Music className="size-3" />
                          <span>{item.instrument}</span>
                          <span className="text-muted-foreground/50">|</span>
                          <span>{item.campus}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Booking Requests */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="size-4 text-amber-600" />
                  Recent Booking Requests
                </CardTitle>
                <Link
                  href="/dashboard/teacher/notifications"
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                >
                  View all <ChevronRight className="size-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center gap-3">
                      <div className="h-14 w-full rounded bg-muted" />
                    </div>
                  ))}
                </div>
              ) : bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="size-10 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">No pending booking requests.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-start gap-3 rounded-lg border border-border p-3"
                    >
                      <AlertCircle className="size-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{booking.student}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {booking.instrument} &middot; {booking.requestedDate} at {booking.requestedTime}
                        </div>
                        <div className="text-[10px] text-muted-foreground/70 mt-1">{booking.createdAt}</div>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <Button size="xs" variant="default">Approve</Button>
                        <Button size="xs" variant="outline">Decline</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
