'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Check, X } from 'lucide-react';

type Booking = {
  id: string;
  student: string;
  instrument: string;
  teacher: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  type: 'Trial' | 'Regular';
  campus: string;
};

const initialBookings: Booking[] = [
  { id: 'BK-001', student: 'Emily Chen', instrument: 'Guzheng', teacher: 'Li Wei', date: '2026-03-15', time: '10:00 AM', status: 'Confirmed', type: 'Regular', campus: 'Chatswood' },
  { id: 'BK-002', student: 'James Wang', instrument: 'Erhu', teacher: 'Zhang Hao', date: '2026-03-15', time: '11:30 AM', status: 'Pending', type: 'Trial', campus: 'Chatswood' },
  { id: 'BK-003', student: 'Sophie Liu', instrument: 'Pipa', teacher: 'Chen Mei', date: '2026-03-15', time: '2:00 PM', status: 'Confirmed', type: 'Regular', campus: 'Burwood' },
  { id: 'BK-004', student: 'Oliver Zhang', instrument: 'Dizi', teacher: 'Wang Jun', date: '2026-03-16', time: '9:00 AM', status: 'Pending', type: 'Trial', campus: 'Burwood' },
  { id: 'BK-005', student: 'Mia Huang', instrument: 'Guzheng', teacher: 'Li Wei', date: '2026-03-16', time: '3:30 PM', status: 'Cancelled', type: 'Regular', campus: 'Chatswood' },
  { id: 'BK-006', student: 'Liam Xu', instrument: 'Erhu', teacher: 'Zhang Hao', date: '2026-03-14', time: '10:00 AM', status: 'Completed', type: 'Regular', campus: 'Burwood' },
  { id: 'BK-007', student: 'Chloe Lin', instrument: 'Pipa', teacher: 'Chen Mei', date: '2026-03-14', time: '1:00 PM', status: 'Completed', type: 'Regular', campus: 'Chatswood' },
  { id: 'BK-008', student: 'Noah Wu', instrument: 'Hulusi', teacher: 'Wang Jun', date: '2026-03-17', time: '11:00 AM', status: 'Pending', type: 'Trial', campus: 'Burwood' },
  { id: 'BK-009', student: 'Ava Li', instrument: 'Guqin', teacher: 'Li Wei', date: '2026-03-17', time: '2:30 PM', status: 'Confirmed', type: 'Regular', campus: 'Chatswood' },
  { id: 'BK-010', student: 'Ethan Ma', instrument: 'Zhongruan', teacher: 'Chen Mei', date: '2026-03-18', time: '4:00 PM', status: 'Pending', type: 'Trial', campus: 'Burwood' },
];

const statusColor: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Confirmed: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
  Completed: 'bg-blue-100 text-blue-800 border-blue-200',
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? bookings
    : bookings.filter((b) => b.status === activeTab);

  const counts = {
    all: bookings.length,
    Pending: bookings.filter((b) => b.status === 'Pending').length,
    Confirmed: bookings.filter((b) => b.status === 'Confirmed').length,
    Cancelled: bookings.filter((b) => b.status === 'Cancelled').length,
    Completed: bookings.filter((b) => b.status === 'Completed').length,
  };

  const approve = (id: string) => {
    setBookings(bookings.map((b) =>
      b.id === id ? { ...b, status: 'Confirmed' } : b
    ));
  };

  const reject = (id: string) => {
    setBookings(bookings.map((b) =>
      b.id === id ? { ...b, status: 'Cancelled' } : b
    ));
  };

  const renderTable = (items: Booking[]) => (
    items.length === 0 ? (
      <div className="py-12 text-center text-muted-foreground">
        No bookings found in this category.
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">ID</th>
              <th className="pb-3 pr-4 font-medium">Student</th>
              <th className="pb-3 pr-4 font-medium">Instrument</th>
              <th className="pb-3 pr-4 font-medium">Teacher</th>
              <th className="pb-3 pr-4 font-medium">Campus</th>
              <th className="pb-3 pr-4 font-medium">Date</th>
              <th className="pb-3 pr-4 font-medium">Time</th>
              <th className="pb-3 pr-4 font-medium">Type</th>
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((booking) => (
              <tr key={booking.id} className="border-b last:border-0">
                <td className="py-3 pr-4 font-mono text-xs">{booking.id}</td>
                <td className="py-3 pr-4 font-medium">{booking.student}</td>
                <td className="py-3 pr-4">{booking.instrument}</td>
                <td className="py-3 pr-4">{booking.teacher}</td>
                <td className="py-3 pr-4">
                  <Badge variant="outline">{booking.campus}</Badge>
                </td>
                <td className="py-3 pr-4">{booking.date}</td>
                <td className="py-3 pr-4">{booking.time}</td>
                <td className="py-3 pr-4">
                  <Badge variant={booking.type === 'Trial' ? 'outline' : 'secondary'}>
                    {booking.type}
                  </Badge>
                </td>
                <td className="py-3 pr-4">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColor[booking.status]}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-3">
                  {booking.status === 'Pending' ? (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => approve(booking.id)}
                        title="Approve"
                      >
                        <Check className="size-4 text-green-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => reject(booking.id)}
                        title="Reject"
                      >
                        <X className="size-4 text-red-600" />
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">--</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );

  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Booking Management</h1>
          <p className="text-sm text-muted-foreground">Manage and review lesson bookings across all campuses.</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card size="sm">
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-foreground">{counts.Pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-green-700">{counts.Confirmed}</p>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-blue-700">{counts.Completed}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-red-700">{counts.Cancelled}</p>
              <p className="text-xs text-muted-foreground">Cancelled</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(val) => val && setActiveTab(val)}>
          <TabsList>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="Pending">Pending ({counts.Pending})</TabsTrigger>
            <TabsTrigger value="Confirmed">Confirmed ({counts.Confirmed})</TabsTrigger>
            <TabsTrigger value="Cancelled">Cancelled ({counts.Cancelled})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <Card className="mt-4">
              <CardContent>
                {renderTable(filtered)}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
