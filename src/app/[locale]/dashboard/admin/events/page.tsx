'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Pencil, Eye, EyeOff, Calendar, MapPin, DollarSign } from 'lucide-react';

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  ticketPrice: number;
  published: boolean;
  capacity: number;
  registered: number;
};

const initialEvents: Event[] = [
  {
    id: 'E-001',
    title: 'Spring Recital 2026',
    description: 'Annual spring recital featuring performances by students of all levels. Showcasing Guzheng, Erhu, Pipa, and ensemble pieces.',
    date: '2026-04-12',
    time: '2:00 PM',
    venue: 'Chatswood Concourse, 409 Victoria Ave',
    ticketPrice: 25,
    published: true,
    capacity: 200,
    registered: 156,
  },
  {
    id: 'E-002',
    title: 'Chinese Music Workshop',
    description: 'A hands-on workshop for beginners interested in traditional Chinese instruments. Try Guzheng, Erhu, and Dizi.',
    date: '2026-03-29',
    time: '10:00 AM',
    venue: 'Burwood Campus, 28 Belmore St',
    ticketPrice: 0,
    published: true,
    capacity: 30,
    registered: 24,
  },
  {
    id: 'E-003',
    title: 'Mid-Autumn Festival Concert',
    description: 'Celebrate the Mid-Autumn Festival with an evening of beautiful Chinese music performances and cultural activities.',
    date: '2026-09-25',
    time: '6:30 PM',
    venue: 'Sydney Town Hall, 483 George St',
    ticketPrice: 35,
    published: false,
    capacity: 500,
    registered: 0,
  },
  {
    id: 'E-004',
    title: 'AMEB Exam Preparation Masterclass',
    description: 'Intensive masterclass for students preparing for AMEB exams in Chinese instruments.',
    date: '2026-05-10',
    time: '9:00 AM',
    venue: 'Chatswood Campus, 1 Help St',
    ticketPrice: 15,
    published: true,
    capacity: 40,
    registered: 31,
  },
  {
    id: 'E-005',
    title: 'End of Year Gala',
    description: 'Celebrate the achievements of our students with a gala concert and award ceremony.',
    date: '2026-12-05',
    time: '5:00 PM',
    venue: 'Chatswood Concourse, 409 Victoria Ave',
    ticketPrice: 30,
    published: false,
    capacity: 300,
    registered: 0,
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('');
  const [formVenue, setFormVenue] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCapacity, setFormCapacity] = useState('');

  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormDate('');
    setFormTime('');
    setFormVenue('');
    setFormPrice('');
    setFormCapacity('');
  };

  const handleAdd = () => {
    if (!formTitle || !formDate) return;
    const newEvent: Event = {
      id: `E-${String(events.length + 1).padStart(3, '0')}`,
      title: formTitle,
      description: formDescription,
      date: formDate,
      time: formTime,
      venue: formVenue,
      ticketPrice: parseFloat(formPrice) || 0,
      published: false,
      capacity: parseInt(formCapacity) || 0,
      registered: 0,
    };
    setEvents([...events, newEvent]);
    resetForm();
    setAddOpen(false);
  };

  const handleEdit = () => {
    if (!editingEvent || !formTitle || !formDate) return;
    setEvents(events.map((e) =>
      e.id === editingEvent.id
        ? {
            ...e,
            title: formTitle,
            description: formDescription,
            date: formDate,
            time: formTime,
            venue: formVenue,
            ticketPrice: parseFloat(formPrice) || 0,
            capacity: parseInt(formCapacity) || 0,
          }
        : e
    ));
    resetForm();
    setEditOpen(false);
    setEditingEvent(null);
  };

  const openEdit = (event: Event) => {
    setEditingEvent(event);
    setFormTitle(event.title);
    setFormDescription(event.description);
    setFormDate(event.date);
    setFormTime(event.time);
    setFormVenue(event.venue);
    setFormPrice(String(event.ticketPrice));
    setFormCapacity(String(event.capacity));
    setEditOpen(true);
  };

  const togglePublished = (id: string) => {
    setEvents(events.map((e) =>
      e.id === id ? { ...e, published: !e.published } : e
    ));
  };

  const formFields = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground">Event Title</label>
        <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Event name" className="mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Description</label>
        <Textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="Event description..." className="mt-1" rows={3} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Date</label>
          <Input value={formDate} onChange={(e) => setFormDate(e.target.value)} type="date" className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Time</label>
          <Input value={formTime} onChange={(e) => setFormTime(e.target.value)} placeholder="2:00 PM" className="mt-1" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Venue</label>
        <Input value={formVenue} onChange={(e) => setFormVenue(e.target.value)} placeholder="Venue name and address" className="mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Ticket Price ($)</label>
          <Input value={formPrice} onChange={(e) => setFormPrice(e.target.value)} placeholder="0" type="number" className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Capacity</label>
          <Input value={formCapacity} onChange={(e) => setFormCapacity(e.target.value)} placeholder="100" type="number" className="mt-1" />
        </div>
      </div>
    </div>
  );

  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Event Management</h1>
            <p className="text-sm text-muted-foreground">Create and manage concerts, workshops, and recitals.</p>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger
              onClick={() => { resetForm(); setAddOpen(true); }}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
            >
              <Plus className="size-4" />
              Add Event
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              {formFields}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd}>Create Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Event cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription className="mt-1">{event.description}</CardDescription>
                  </div>
                  <Badge variant={event.published ? 'default' : 'secondary'}>
                    {event.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="size-4" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="size-4" />
                    <span>{event.ticketPrice === 0 ? 'Free' : `$${event.ticketPrice}`}</span>
                  </div>
                  {event.published && (
                    <div className="pt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Registrations</span>
                        <span>{event.registered} / {event.capacity}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-[#8b2323] transition-all"
                          style={{ width: `${event.capacity > 0 ? (event.registered / event.capacity) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(event)}>
                    <Pencil className="size-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePublished(event.id)}
                  >
                    {event.published ? (
                      <>
                        <EyeOff className="size-3 mr-1" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="size-3 mr-1" />
                        Publish
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            {formFields}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => { setEditOpen(false); setEditingEvent(null); }}>Cancel</Button>
              <Button onClick={handleEdit}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  );
}
