'use client';

import { useState, useEffect, useMemo } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen, Search, ChevronDown, ChevronUp, Music,
  Save, Calendar, Clock, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

interface Lesson {
  id: string;
  date: string;
  time: string;
  duration: string;
  studentName: string;
  studentId: string;
  instrument: string;
  campus: string;
  status: 'scheduled' | 'completed' | 'missed' | 'cancelled';
  notes: string;
  homework: string;
}

const mockLessons: Lesson[] = [
  { id: '1', date: '2026-03-22', time: '09:00', duration: '45 min', studentName: 'Emily Chen', studentId: '1', instrument: 'Guzheng', campus: 'Burwood', status: 'scheduled', notes: '', homework: '' },
  { id: '2', date: '2026-03-22', time: '10:00', duration: '45 min', studentName: 'Kevin Wu', studentId: '2', instrument: 'Erhu', campus: 'Burwood', status: 'scheduled', notes: '', homework: '' },
  { id: '3', date: '2026-03-21', time: '14:00', duration: '45 min', studentName: 'Amy Wang', studentId: '5', instrument: 'Dizi', campus: 'CBD', status: 'scheduled', notes: '', homework: '' },
  { id: '4', date: '2026-03-15', time: '09:00', duration: '45 min', studentName: 'Emily Chen', studentId: '1', instrument: 'Guzheng', campus: 'Burwood', status: 'completed', notes: 'Worked on tremolo technique. Good progress on High Mountain Flowing Water.', homework: 'Practice tremolo exercise 3x daily.' },
  { id: '5', date: '2026-03-15', time: '10:00', duration: '45 min', studentName: 'Kevin Wu', studentId: '2', instrument: 'Erhu', campus: 'Burwood', status: 'completed', notes: 'Reviewed bowing technique. Started second position work.', homework: 'Practice long bows with metronome at 60bpm.' },
  { id: '6', date: '2026-03-15', time: '11:00', duration: '45 min', studentName: 'Sarah Li', studentId: '3', instrument: 'Pipa', campus: 'Burwood', status: 'completed', notes: 'Excellent performance of Grade 7 piece. Ready for exam.', homework: 'Final run-through of all exam pieces. Record and review.' },
  { id: '7', date: '2026-03-15', time: '14:00', duration: '45 min', studentName: 'Jason Zhang', studentId: '4', instrument: 'Guzheng', campus: 'CBD', status: 'missed', notes: '', homework: '' },
  { id: '8', date: '2026-03-15', time: '15:00', duration: '45 min', studentName: 'Amy Wang', studentId: '5', instrument: 'Dizi', campus: 'CBD', status: 'completed', notes: 'Worked on breathing technique and tonal production. Good improvement.', homework: 'Practice long tones - 5 minutes each note. Review fingering chart for chromatic scale.' },
  { id: '9', date: '2026-03-08', time: '09:00', duration: '45 min', studentName: 'Emily Chen', studentId: '1', instrument: 'Guzheng', campus: 'Burwood', status: 'completed', notes: 'Started new piece Fishing Boat Sings Late. Good sight-reading.', homework: 'Memorize first page. Practice scales in D major.' },
  { id: '10', date: '2026-03-08', time: '10:00', duration: '45 min', studentName: 'Olivia Huang', studentId: '7', instrument: 'Guzheng', campus: 'Burwood', status: 'completed', notes: 'Performance preparation. Excellent stage presence.', homework: 'Record final performance. Submit by Thursday.' },
  { id: '11', date: '2026-03-08', time: '14:00', duration: '45 min', studentName: 'Daniel Park', studentId: '6', instrument: 'Erhu', campus: 'Burwood', status: 'cancelled', notes: 'Student requested cancellation - illness.', homework: '' },
  { id: '12', date: '2026-03-01', time: '09:00', duration: '45 min', studentName: 'Emily Chen', studentId: '1', instrument: 'Guzheng', campus: 'Burwood', status: 'completed', notes: 'Completed Grade 5 technique exercises.', homework: 'Prepare Spring River Flower Moon Night for recording.' },
  { id: '13', date: '2026-03-01', time: '11:00', duration: '45 min', studentName: 'Mia Liu', studentId: '8', instrument: 'Pipa', campus: 'CBD', status: 'completed', notes: 'First lesson. Covered basic posture, tuning, and right-hand technique.', homework: 'Practice holding the instrument 10 min daily. Right-hand plucking exercises.' },
];

export default function TeacherLessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editHomework, setEditHomework] = useState('');

  useEffect(() => {
    async function fetchLessons() {
      try {
        const res = await fetch('/api/teacher/lessons');
        if (res.ok) {
          const data = await res.json();
          if (data.lessons) setLessons(data.lessons);
        }
      } catch {
        // Use mock data
      } finally {
        setLoading(false);
      }
    }
    fetchLessons();
  }, []);

  const filtered = useMemo(() => {
    return lessons.filter((l) => {
      const matchesSearch =
        search === '' ||
        l.studentName.toLowerCase().includes(search.toLowerCase()) ||
        l.instrument.toLowerCase().includes(search.toLowerCase());
      const matchesTab =
        activeTab === 'all' || l.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [lessons, search, activeTab]);

  const statusCounts = useMemo(() => ({
    all: lessons.length,
    scheduled: lessons.filter((l) => l.status === 'scheduled').length,
    completed: lessons.filter((l) => l.status === 'completed').length,
    missed: lessons.filter((l) => l.status === 'missed').length,
    cancelled: lessons.filter((l) => l.status === 'cancelled').length,
  }), [lessons]);

  function toggleExpand(lessonId: string) {
    if (expandedId === lessonId) {
      setExpandedId(null);
    } else {
      setExpandedId(lessonId);
      const lesson = lessons.find((l) => l.id === lessonId);
      if (lesson) {
        setEditNotes(lesson.notes);
        setEditHomework(lesson.homework);
      }
    }
  }

  function saveNotesAndHomework(lessonId: string) {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === lessonId
          ? { ...l, notes: editNotes, homework: editHomework }
          : l
      )
    );
    setExpandedId(null);
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'completed': return <CheckCircle className="size-4 text-emerald-600" />;
      case 'missed': return <XCircle className="size-4 text-red-500" />;
      case 'cancelled': return <AlertCircle className="size-4 text-gray-500" />;
      case 'scheduled': return <Clock className="size-4 text-blue-500" />;
      default: return null;
    }
  }

  function getStatusBadgeClass(status: string) {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'missed': return 'bg-red-50 text-red-700 border-red-200';
      case 'cancelled': return 'bg-gray-50 text-gray-600 border-gray-200';
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-muted text-muted-foreground';
    }
  }

  return (
    <DashboardShell role="teacher" userName="Teacher Name">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lesson Records</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View all lessons, add notes, and assign homework.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Total', count: statusCounts.all, color: 'text-foreground' },
            { label: 'Scheduled', count: statusCounts.scheduled, color: 'text-blue-600' },
            { label: 'Completed', count: statusCounts.completed, color: 'text-emerald-600' },
            { label: 'Missed', count: statusCounts.missed, color: 'text-red-500' },
            { label: 'Cancelled', count: statusCounts.cancelled, color: 'text-gray-500' },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-2 text-center">
                <div className={`text-xl font-bold ${s.color}`}>{s.count}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name or instrument..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Tabs + table */}
        <Tabs value={activeTab} onValueChange={(val) => val && setActiveTab(val)}>
          <TabsList>
            <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled ({statusCounts.scheduled})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({statusCounts.completed})</TabsTrigger>
            <TabsTrigger value="missed">Missed ({statusCounts.missed})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <Card className="mt-4">
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-6 space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="animate-pulse h-12 rounded bg-muted" />
                    ))}
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <BookOpen className="size-12 text-muted-foreground/40 mb-3" />
                    <p className="text-sm font-medium text-foreground">No lessons found</p>
                    <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filter.</p>
                  </div>
                ) : (
                  <div>
                    {filtered.map((lesson) => (
                      <div key={lesson.id} className="border-b border-border last:border-0">
                        {/* Lesson row */}
                        <div
                          className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => toggleExpand(lesson.id)}
                        >
                          {getStatusIcon(lesson.status)}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                              <span className="font-medium text-foreground text-sm">{lesson.studentName}</span>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="size-3" />
                                  {new Date(lesson.date).toLocaleDateString('en-AU', {
                                    weekday: 'short', month: 'short', day: 'numeric'
                                  })}
                                </span>
                                <span>{lesson.time}</span>
                                <span className="hidden sm:inline flex items-center gap-1">
                                  <Music className="size-3 inline" /> {lesson.instrument}
                                </span>
                                <span className="hidden md:inline">{lesson.campus}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${getStatusBadgeClass(lesson.status)}`}>
                            {lesson.status}
                          </span>
                          {expandedId === lesson.id ? (
                            <ChevronUp className="size-4 text-muted-foreground flex-shrink-0" />
                          ) : (
                            <ChevronDown className="size-4 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>

                        {/* Expanded section */}
                        {expandedId === lesson.id && (
                          <div className="px-3 pb-4 pt-1 bg-muted/30">
                            <div className="rounded-lg border border-border bg-card p-4 space-y-4">
                              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                    <Calendar className="size-3" /> Date & Time
                                  </div>
                                  <p className="text-foreground">
                                    {new Date(lesson.date).toLocaleDateString('en-AU', {
                                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                    })} at {lesson.time} ({lesson.duration})
                                  </p>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                    <Music className="size-3" /> Details
                                  </div>
                                  <p className="text-foreground">
                                    {lesson.instrument} | {lesson.campus} Campus
                                  </p>
                                </div>
                              </div>

                              <Separator />

                              <div>
                                <label className="text-xs font-medium text-foreground mb-1.5 block">Lesson Notes</label>
                                <Textarea
                                  placeholder="Add notes about this lesson..."
                                  value={editNotes}
                                  onChange={(e) => setEditNotes(e.target.value)}
                                  rows={3}
                                />
                              </div>

                              <div>
                                <label className="text-xs font-medium text-foreground mb-1.5 block">Homework Assignment</label>
                                <Textarea
                                  placeholder="Assign homework for the student..."
                                  value={editHomework}
                                  onChange={(e) => setEditHomework(e.target.value)}
                                  rows={2}
                                />
                              </div>

                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => setExpandedId(null)}>
                                  Cancel
                                </Button>
                                <Button size="sm" onClick={() => saveNotesAndHomework(lesson.id)}>
                                  <Save className="size-3 mr-1" />
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {!loading && (
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {lessons.length} lessons
          </p>
        )}
      </div>
    </DashboardShell>
  );
}
