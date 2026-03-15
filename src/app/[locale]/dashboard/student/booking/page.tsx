'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar, Clock, User, Music, X, Plus, AlertCircle,
} from 'lucide-react';

// --- Types ---
type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

interface Booking {
  id: number;
  instrument: string;
  teacher: string;
  date: string;
  time: string;
  duration: string;
  status: BookingStatus;
}

// --- Mock Data ---
const bookings: Booking[] = [
  { id: 1, instrument: 'Guzheng', teacher: 'Ms. Wang Li', date: 'Mar 18, 2026', time: '4:00 PM', duration: '45 min', status: 'confirmed' },
  { id: 2, instrument: 'Erhu', teacher: 'Mr. Zhang Wei', date: 'Mar 19, 2026', time: '5:30 PM', duration: '45 min', status: 'confirmed' },
  { id: 3, instrument: 'Guzheng', teacher: 'Ms. Wang Li', date: 'Mar 20, 2026', time: '4:00 PM', duration: '45 min', status: 'pending' },
  { id: 4, instrument: 'Dizi', teacher: 'Mr. Chen Bo', date: 'Mar 21, 2026', time: '10:00 AM', duration: '60 min', status: 'pending' },
  { id: 5, instrument: 'Pipa', teacher: 'Ms. Liu Mei', date: 'Mar 14, 2026', time: '3:00 PM', duration: '30 min', status: 'cancelled' },
  { id: 6, instrument: 'Guzheng', teacher: 'Ms. Wang Li', date: 'Mar 12, 2026', time: '4:00 PM', duration: '45 min', status: 'completed' },
  { id: 7, instrument: 'Erhu', teacher: 'Mr. Zhang Wei', date: 'Mar 10, 2026', time: '5:30 PM', duration: '45 min', status: 'completed' },
];

const instrumentOptions = ['Guzheng', 'Erhu', 'Pipa', 'Dizi', 'Yangqin'];
const teacherOptions: Record<string, string[]> = {
  Guzheng: ['Ms. Wang Li', 'Ms. Zhao Yan'],
  Erhu: ['Mr. Zhang Wei'],
  Pipa: ['Ms. Liu Mei'],
  Dizi: ['Mr. Chen Bo'],
  Yangqin: ['Ms. Huang Ting'],
};

const statusStyles: Record<BookingStatus, { label: string; className: string }> = {
  confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-700' },
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-700' },
  completed: { label: 'Completed', className: 'bg-blue-100 text-blue-700' },
};

export default function StudentBookingPage() {
  const [bookingList, setBookingList] = useState<Booking[]>(bookings);
  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading] = useState(false);
  const [cancelling, setCancelling] = useState<number | null>(null);

  const availableTeachers = selectedInstrument
    ? teacherOptions[selectedInstrument] || []
    : [];

  const handleCancel = (id: number) => {
    setCancelling(id);
    // Simulate API call
    setTimeout(() => {
      setBookingList((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b))
      );
      setCancelling(null);
    }, 600);
  };

  const handleBook = () => {
    if (!selectedInstrument || !selectedTeacher || !selectedDate) return;
    const newBooking: Booking = {
      id: Date.now(),
      instrument: selectedInstrument,
      teacher: selectedTeacher,
      date: new Date(selectedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      time: '4:00 PM',
      duration: '45 min',
      status: 'pending',
    };
    setBookingList((prev) => [newBooking, ...prev]);
    setSelectedInstrument('');
    setSelectedTeacher('');
    setSelectedDate('');
  };

  if (loading) {
    return (
      <DashboardShell role="student" userName="Student Name">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  const upcomingBookings = bookingList.filter(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  );
  const pastBookings = bookingList.filter(
    (b) => b.status === 'completed' || b.status === 'cancelled'
  );

  return (
    <DashboardShell role="student" userName="Emily Chen">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Booking Management</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your lesson bookings and schedule new ones.
          </p>
        </div>

        {/* Book New Lesson */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Plus className="size-4 text-primary" />
              Book New Lesson
            </CardTitle>
            <CardDescription>
              Select your instrument, teacher, and preferred date.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Instrument Select */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Instrument</label>
                <Select
                  value={selectedInstrument}
                  onValueChange={(val) => {
                    if (val) {
                      setSelectedInstrument(val);
                      setSelectedTeacher('');
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose instrument" />
                  </SelectTrigger>
                  <SelectContent>
                    {instrumentOptions.map((inst) => (
                      <SelectItem key={inst} value={inst}>
                        {inst}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Teacher Select */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Teacher</label>
                <Select
                  value={selectedTeacher}
                  onValueChange={(val) => val && setSelectedTeacher(val)}
                  disabled={!selectedInstrument}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedInstrument ? 'Choose teacher' : 'Select instrument first'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTeachers.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Date</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-end">
                <Button
                  onClick={handleBook}
                  disabled={!selectedInstrument || !selectedTeacher || !selectedDate}
                  className="w-full"
                  size="lg"
                >
                  <Calendar className="size-4" />
                  Book Lesson
                </Button>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary/5 p-3 text-sm text-muted-foreground">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Bookings are subject to teacher availability. You will receive a confirmation
                once the teacher approves your booking.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming Bookings</CardTitle>
            <CardDescription>
              {upcomingBookings.length} upcoming{' '}
              {upcomingBookings.length === 1 ? 'lesson' : 'lessons'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Calendar className="mx-auto mb-3 size-10 text-muted-foreground/50" />
                <p>No upcoming bookings. Book a lesson above to get started!</p>
              </div>
            ) : (
              <div className="space-y-0">
                {upcomingBookings.map((booking, index) => {
                  const style = statusStyles[booking.status];
                  return (
                    <div key={booking.id}>
                      {index > 0 && <Separator className="my-3" />}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Music className="size-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{booking.instrument}</p>
                            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="size-3" />
                                {booking.teacher}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="size-3" />
                                {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="size-3" />
                                {booking.time} ({booking.duration})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:shrink-0">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style.className}`}
                          >
                            {style.label}
                          </span>
                          {(booking.status === 'pending' || booking.status === 'confirmed') && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancel(booking.id)}
                              disabled={cancelling === booking.id}
                            >
                              {cancelling === booking.id ? (
                                <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              ) : (
                                <X className="size-3" />
                              )}
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Past Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Past Bookings</CardTitle>
            <CardDescription>History of completed and cancelled lessons</CardDescription>
          </CardHeader>
          <CardContent>
            {pastBookings.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No past bookings to show.
              </div>
            ) : (
              <div className="space-y-0">
                {pastBookings.map((booking, index) => {
                  const style = statusStyles[booking.status];
                  return (
                    <div key={booking.id}>
                      {index > 0 && <Separator className="my-3" />}
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <Music className="size-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{booking.instrument}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.teacher} &middot; {booking.date} &middot; {booking.time}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style.className}`}
                        >
                          {style.label}
                        </span>
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
