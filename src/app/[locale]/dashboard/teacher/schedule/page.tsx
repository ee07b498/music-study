'use client';

import { useState, useEffect } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogTrigger
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Calendar, Plus, Clock, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
  studentName?: string;
  instrument?: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS_DISPLAY = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00',
];

const mockSlots: TimeSlot[] = [
  { id: '1', day: 'Monday', startTime: '09:00', endTime: '09:45', available: false, studentName: 'Emily Chen', instrument: 'Guzheng' },
  { id: '2', day: 'Monday', startTime: '10:00', endTime: '10:45', available: true },
  { id: '3', day: 'Monday', startTime: '11:00', endTime: '11:45', available: false, studentName: 'Sarah Li', instrument: 'Pipa' },
  { id: '4', day: 'Monday', startTime: '14:00', endTime: '14:45', available: true },
  { id: '5', day: 'Monday', startTime: '15:00', endTime: '15:45', available: true },
  { id: '6', day: 'Tuesday', startTime: '09:00', endTime: '09:45', available: true },
  { id: '7', day: 'Tuesday', startTime: '10:00', endTime: '10:45', available: false, studentName: 'Kevin Wu', instrument: 'Erhu' },
  { id: '8', day: 'Tuesday', startTime: '14:00', endTime: '14:45', available: true },
  { id: '9', day: 'Tuesday', startTime: '15:00', endTime: '15:45', available: false, studentName: 'Amy Wang', instrument: 'Dizi' },
  { id: '10', day: 'Wednesday', startTime: '10:00', endTime: '10:45', available: true },
  { id: '11', day: 'Wednesday', startTime: '11:00', endTime: '11:45', available: true },
  { id: '12', day: 'Wednesday', startTime: '14:00', endTime: '14:45', available: false, studentName: 'Jason Zhang', instrument: 'Guzheng' },
  { id: '13', day: 'Thursday', startTime: '09:00', endTime: '09:45', available: true },
  { id: '14', day: 'Thursday', startTime: '10:00', endTime: '10:45', available: false, studentName: 'Olivia Huang', instrument: 'Guzheng' },
  { id: '15', day: 'Thursday', startTime: '15:00', endTime: '15:45', available: true },
  { id: '16', day: 'Friday', startTime: '10:00', endTime: '10:45', available: true },
  { id: '17', day: 'Friday', startTime: '11:00', endTime: '11:45', available: false, studentName: 'Daniel Park', instrument: 'Erhu' },
  { id: '18', day: 'Friday', startTime: '14:00', endTime: '14:45', available: true },
  { id: '19', day: 'Saturday', startTime: '09:00', endTime: '09:45', available: false, studentName: 'Mia Liu', instrument: 'Pipa' },
  { id: '20', day: 'Saturday', startTime: '10:00', endTime: '10:45', available: true },
  { id: '21', day: 'Saturday', startTime: '11:00', endTime: '11:45', available: true },
  { id: '22', day: 'Saturday', startTime: '14:00', endTime: '14:45', available: false, studentName: 'Emily Chen', instrument: 'Guzheng' },
];

export default function TeacherSchedulePage() {
  const [slots, setSlots] = useState<TimeSlot[]>(mockSlots);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSlotDay, setNewSlotDay] = useState('Monday');
  const [newSlotStart, setNewSlotStart] = useState('09:00');
  const [newSlotEnd, setNewSlotEnd] = useState('09:45');
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const res = await fetch('/api/teacher/schedule');
        if (res.ok) {
          const data = await res.json();
          if (data.slots) setSlots(data.slots);
        }
      } catch {
        // Use mock data
      } finally {
        setLoading(false);
      }
    }
    fetchSchedule();
  }, []);

  function getWeekDateRange() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + weekOffset * 7);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${fmt(monday)} - ${fmt(sunday)}, ${sunday.getFullYear()}`;
  }

  function getDayDate(dayIndex: number) {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + weekOffset * 7);
    const target = new Date(monday);
    target.setDate(monday.getDate() + dayIndex);
    return target.getDate();
  }

  function getSlotsForDayAndTime(day: string, time: string) {
    return slots.filter(
      (s) => s.day === day && s.startTime === time
    );
  }

  function toggleSlotAvailability(slotId: string) {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === slotId ? { ...s, available: !s.available } : s
      )
    );
  }

  function removeSlot(slotId: string) {
    setSlots((prev) => prev.filter((s) => s.id !== slotId));
  }

  function addSlot() {
    const newSlot: TimeSlot = {
      id: `new-${Date.now()}`,
      day: newSlotDay,
      startTime: newSlotStart,
      endTime: newSlotEnd,
      available: true,
    };
    setSlots((prev) => [...prev, newSlot]);
    setDialogOpen(false);
  }

  return (
    <DashboardShell role="teacher" userName="Teacher Name">
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Schedule</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your weekly availability and view booked lessons.
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger
              render={<Button><Plus className="size-4 mr-1" /> Add Time Slot</Button>}
            />
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Available Time Slot</DialogTitle>
                <DialogDescription>
                  Create a new available time slot for students to book.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Day</label>
                  <Select value={newSlotDay} onValueChange={(val) => val && setNewSlotDay(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS.map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Start Time</label>
                    <Input
                      type="time"
                      value={newSlotStart}
                      onChange={(e) => setNewSlotStart(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">End Time</label>
                    <Input
                      type="time"
                      value={newSlotEnd}
                      onChange={(e) => setNewSlotEnd(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={addSlot}>Add Slot</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Week navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => setWeekOffset((o) => o - 1)}>
            <ChevronLeft className="size-4 mr-1" /> Previous
          </Button>
          <div className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            {getWeekDateRange()}
          </div>
          <Button variant="outline" size="sm" onClick={() => setWeekOffset((o) => o + 1)}>
            Next <ChevronRight className="size-4 ml-1" />
          </Button>
        </div>

        {/* Week view */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-10 rounded bg-muted" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="w-20 p-3 text-left text-xs font-medium text-muted-foreground">Time</th>
                      {DAYS.map((day, i) => (
                        <th key={day} className="p-3 text-center text-xs font-medium text-muted-foreground">
                          <div>{day.substring(0, 3)}</div>
                          <div className="text-foreground font-semibold text-sm mt-0.5">{getDayDate(i)}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TIME_SLOTS_DISPLAY.map((time) => {
                      const hasAnySlot = DAYS.some((day) => getSlotsForDayAndTime(day, time).length > 0);
                      if (!hasAnySlot) return null;
                      return (
                        <tr key={time} className="border-b border-border last:border-0">
                          <td className="p-3 text-xs font-medium text-muted-foreground whitespace-nowrap">
                            {time}
                          </td>
                          {DAYS.map((day) => {
                            const daySlots = getSlotsForDayAndTime(day, time);
                            return (
                              <td key={day} className="p-1.5 text-center">
                                {daySlots.map((slot) => (
                                  <div
                                    key={slot.id}
                                    className={`rounded-md p-1.5 text-[11px] leading-tight ${
                                      slot.studentName
                                        ? 'bg-primary/10 border border-primary/20'
                                        : slot.available
                                        ? 'bg-emerald-50 border border-emerald-200'
                                        : 'bg-muted border border-border'
                                    }`}
                                  >
                                    {slot.studentName ? (
                                      <>
                                        <div className="font-medium text-foreground truncate">{slot.studentName}</div>
                                        <div className="text-muted-foreground">{slot.instrument}</div>
                                      </>
                                    ) : (
                                      <div className="flex items-center justify-center gap-1">
                                        <span className="text-emerald-700 font-medium">Available</span>
                                      </div>
                                    )}
                                    <div className="flex justify-center gap-1 mt-1">
                                      <button
                                        className="text-[10px] text-primary hover:underline"
                                        onClick={() => toggleSlotAvailability(slot.id)}
                                      >
                                        {slot.available ? 'Close' : 'Open'}
                                      </button>
                                      {!slot.studentName && (
                                        <button
                                          className="text-[10px] text-destructive hover:underline"
                                          onClick={() => removeSlot(slot.id)}
                                        >
                                          Remove
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded bg-primary/10 border border-primary/20" />
            <span>Booked lesson</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded bg-emerald-50 border border-emerald-200" />
            <span>Available for booking</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded bg-muted border border-border" />
            <span>Unavailable</span>
          </div>
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              Weekly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {slots.filter((s) => s.studentName).length}
                </div>
                <div className="text-xs text-muted-foreground">Booked Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {slots.filter((s) => s.available && !s.studentName).length}
                </div>
                <div className="text-xs text-muted-foreground">Available Slots</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {slots.length}
                </div>
                <div className="text-xs text-muted-foreground">Total Slots</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {DAYS.filter((day) => slots.some((s) => s.day === day)).length}
                </div>
                <div className="text-xs text-muted-foreground">Active Days</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
