'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users, GraduationCap, CalendarCheck, DollarSign,
  Plus, UserPlus, BookOpen, Calendar,
} from 'lucide-react';

const stats = [
  { label: 'Total Students', value: '128', change: '+12 this month', icon: <GraduationCap className="size-5" />, color: 'bg-blue-100 text-blue-700' },
  { label: 'Total Teachers', value: '14', change: '+2 this quarter', icon: <Users className="size-5" />, color: 'bg-emerald-100 text-emerald-700' },
  { label: 'Monthly Bookings', value: '342', change: '+8% vs last month', icon: <CalendarCheck className="size-5" />, color: 'bg-amber-100 text-amber-700' },
  { label: 'Revenue', value: '$48,250', change: '+15% vs last month', icon: <DollarSign className="size-5" />, color: 'bg-purple-100 text-purple-700' },
];

const monthlyData = [
  { month: 'Sep', bookings: 280, revenue: 38000 },
  { month: 'Oct', bookings: 310, revenue: 41500 },
  { month: 'Nov', bookings: 295, revenue: 39800 },
  { month: 'Dec', bookings: 260, revenue: 35200 },
  { month: 'Jan', bookings: 320, revenue: 44100 },
  { month: 'Feb', bookings: 342, revenue: 48250 },
];

const recentBookings = [
  { id: 'BK-001', student: 'Emily Chen', instrument: 'Guzheng', teacher: 'Ms. Li Wei', date: '2026-03-15', time: '10:00 AM', status: 'Confirmed', type: 'Regular' },
  { id: 'BK-002', student: 'James Wang', instrument: 'Erhu', teacher: 'Mr. Zhang Hao', date: '2026-03-15', time: '11:30 AM', status: 'Pending', type: 'Trial' },
  { id: 'BK-003', student: 'Sophie Liu', instrument: 'Pipa', teacher: 'Ms. Chen Mei', date: '2026-03-15', time: '2:00 PM', status: 'Confirmed', type: 'Regular' },
  { id: 'BK-004', student: 'Oliver Zhang', instrument: 'Dizi', teacher: 'Mr. Wang Jun', date: '2026-03-16', time: '9:00 AM', status: 'Pending', type: 'Trial' },
  { id: 'BK-005', student: 'Mia Huang', instrument: 'Guzheng', teacher: 'Ms. Li Wei', date: '2026-03-16', time: '3:30 PM', status: 'Cancelled', type: 'Regular' },
];

const statusColor: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Confirmed: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
  Completed: 'bg-blue-100 text-blue-800 border-blue-200',
};

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

export default function AdminDashboardPage() {
  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">Welcome back. Here is what is happening at your music school.</p>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4">
                <div className={`flex size-10 items-center justify-center rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts section */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Revenue chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trend over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-48">
                {monthlyData.map((d) => (
                  <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-xs font-medium text-muted-foreground">${(d.revenue / 1000).toFixed(0)}k</span>
                    <div
                      className="w-full rounded-t-md bg-[#8b2323] transition-all hover:bg-[#8b2323]/80"
                      style={{ height: `${(d.revenue / maxRevenue) * 140}px` }}
                    />
                    <span className="text-xs text-muted-foreground">{d.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bookings chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Bookings</CardTitle>
              <CardDescription>Lesson bookings over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-48">
                {monthlyData.map((d) => {
                  const maxBookings = Math.max(...monthlyData.map(m => m.bookings));
                  return (
                    <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                      <span className="text-xs font-medium text-muted-foreground">{d.bookings}</span>
                      <div
                        className="w-full rounded-t-md bg-[#c5a55a] transition-all hover:bg-[#c5a55a]/80"
                        style={{ height: `${(d.bookings / maxBookings) * 140}px` }}
                      />
                      <span className="text-xs text-muted-foreground">{d.month}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent bookings table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest lesson bookings across both campuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">ID</th>
                    <th className="pb-3 pr-4 font-medium">Student</th>
                    <th className="pb-3 pr-4 font-medium">Instrument</th>
                    <th className="pb-3 pr-4 font-medium">Teacher</th>
                    <th className="pb-3 pr-4 font-medium">Date</th>
                    <th className="pb-3 pr-4 font-medium">Time</th>
                    <th className="pb-3 pr-4 font-medium">Type</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-mono text-xs">{booking.id}</td>
                      <td className="py-3 pr-4 font-medium">{booking.student}</td>
                      <td className="py-3 pr-4">{booking.instrument}</td>
                      <td className="py-3 pr-4">{booking.teacher}</td>
                      <td className="py-3 pr-4">{booking.date}</td>
                      <td className="py-3 pr-4">{booking.time}</td>
                      <td className="py-3 pr-4">
                        <Badge variant={booking.type === 'Trial' ? 'outline' : 'secondary'}>
                          {booking.type}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColor[booking.status]}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => {}}>
                <UserPlus className="size-4 mr-1.5" />
                Add Student
              </Button>
              <Button variant="outline" onClick={() => {}}>
                <Users className="size-4 mr-1.5" />
                Add Teacher
              </Button>
              <Button variant="outline" onClick={() => {}}>
                <BookOpen className="size-4 mr-1.5" />
                New Course
              </Button>
              <Button variant="outline" onClick={() => {}}>
                <Calendar className="size-4 mr-1.5" />
                New Booking
              </Button>
              <Button variant="outline" onClick={() => {}}>
                <Plus className="size-4 mr-1.5" />
                Create Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
