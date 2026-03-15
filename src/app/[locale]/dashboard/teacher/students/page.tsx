'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Users, Search, Music, ChevronRight, Mail, Phone } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  instrument: string;
  level: string;
  lessonsCompleted: number;
  campus: string;
  joinedDate: string;
  status: 'active' | 'inactive' | 'trial';
}

const mockStudents: Student[] = [
  { id: '1', name: 'Emily Chen', email: 'emily.chen@email.com', phone: '0412 345 678', instrument: 'Guzheng', level: 'Intermediate', lessonsCompleted: 32, campus: 'Burwood', joinedDate: '2025-03-15', status: 'active' },
  { id: '2', name: 'Kevin Wu', email: 'kevin.wu@email.com', phone: '0423 456 789', instrument: 'Erhu', level: 'Beginner', lessonsCompleted: 12, campus: 'Burwood', joinedDate: '2025-09-01', status: 'active' },
  { id: '3', name: 'Sarah Li', email: 'sarah.li@email.com', phone: '0434 567 890', instrument: 'Pipa', level: 'Advanced', lessonsCompleted: 56, campus: 'Burwood', joinedDate: '2024-06-10', status: 'active' },
  { id: '4', name: 'Jason Zhang', email: 'jason.z@email.com', phone: '0445 678 901', instrument: 'Guzheng', level: 'Beginner', lessonsCompleted: 8, campus: 'CBD', joinedDate: '2025-11-20', status: 'active' },
  { id: '5', name: 'Amy Wang', email: 'amy.wang@email.com', phone: '0456 789 012', instrument: 'Dizi', level: 'Intermediate', lessonsCompleted: 24, campus: 'CBD', joinedDate: '2025-05-08', status: 'active' },
  { id: '6', name: 'Daniel Park', email: 'daniel.p@email.com', phone: '0467 890 123', instrument: 'Erhu', level: 'Beginner', lessonsCompleted: 4, campus: 'Burwood', joinedDate: '2026-01-10', status: 'trial' },
  { id: '7', name: 'Olivia Huang', email: 'olivia.h@email.com', phone: '0478 901 234', instrument: 'Guzheng', level: 'Advanced', lessonsCompleted: 48, campus: 'Burwood', joinedDate: '2024-08-20', status: 'active' },
  { id: '8', name: 'Mia Liu', email: 'mia.liu@email.com', phone: '0489 012 345', instrument: 'Pipa', level: 'Beginner', lessonsCompleted: 6, campus: 'CBD', joinedDate: '2026-01-05', status: 'trial' },
  { id: '9', name: 'Ryan Tan', email: 'ryan.tan@email.com', phone: '0490 123 456', instrument: 'Guzheng', level: 'Intermediate', lessonsCompleted: 20, campus: 'Burwood', joinedDate: '2025-07-15', status: 'inactive' },
  { id: '10', name: 'Sophie Xu', email: 'sophie.x@email.com', phone: '0401 234 567', instrument: 'Dizi', level: 'Advanced', lessonsCompleted: 40, campus: 'CBD', joinedDate: '2024-11-01', status: 'active' },
];

const INSTRUMENTS = ['All', 'Guzheng', 'Erhu', 'Pipa', 'Dizi'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const STATUSES = ['All', 'active', 'inactive', 'trial'];

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [instrumentFilter, setInstrumentFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch('/api/teacher/students');
        if (res.ok) {
          const data = await res.json();
          if (data.students) setStudents(data.students);
        }
      } catch {
        // Use mock data
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        search === '' ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.instrument.toLowerCase().includes(search.toLowerCase());
      const matchesInstrument = instrumentFilter === 'All' || s.instrument === instrumentFilter;
      const matchesLevel = levelFilter === 'All' || s.level === levelFilter;
      const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
      return matchesSearch && matchesInstrument && matchesLevel && matchesStatus;
    });
  }, [students, search, instrumentFilter, levelFilter, statusFilter]);

  function getStatusBadgeVariant(status: string) {
    switch (status) {
      case 'active': return 'default';
      case 'trial': return 'secondary';
      case 'inactive': return 'outline';
      default: return 'secondary';
    }
  }

  function getLevelColor(level: string) {
    switch (level) {
      case 'Beginner': return 'text-emerald-700 bg-emerald-50';
      case 'Intermediate': return 'text-amber-700 bg-amber-50';
      case 'Advanced': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  }

  return (
    <DashboardShell role="teacher" userName="Teacher Name">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Students</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage your students. Click on a student to see their details.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-2">
              <div className="text-2xl font-bold text-foreground">{students.length}</div>
              <div className="text-xs text-muted-foreground">Total Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-2">
              <div className="text-2xl font-bold text-emerald-600">
                {students.filter((s) => s.status === 'active').length}
              </div>
              <div className="text-xs text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-2">
              <div className="text-2xl font-bold text-amber-600">
                {students.filter((s) => s.status === 'trial').length}
              </div>
              <div className="text-xs text-muted-foreground">On Trial</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-2">
              <div className="text-2xl font-bold text-muted-foreground">
                {students.filter((s) => s.status === 'inactive').length}
              </div>
              <div className="text-xs text-muted-foreground">Inactive</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or instrument..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={instrumentFilter} onValueChange={(val) => val && setInstrumentFilter(val)}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Instrument" />
                </SelectTrigger>
                <SelectContent>
                  {INSTRUMENTS.map((inst) => (
                    <SelectItem key={inst} value={inst}>{inst === 'All' ? 'All Instruments' : inst}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={(val) => val && setLevelFilter(val)}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>{level === 'All' ? 'All Levels' : level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(val) => val && setStatusFilter(val)}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Student list */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center gap-4">
                    <div className="size-10 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-40 rounded bg-muted" />
                      <div className="h-3 w-60 rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="size-12 text-muted-foreground/40 mb-3" />
                <p className="text-sm font-medium text-foreground">No students found</p>
                <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium text-muted-foreground">Student</th>
                      <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Instrument</th>
                      <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Level</th>
                      <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Contact</th>
                      <th className="text-center p-3 font-medium text-muted-foreground hidden sm:table-cell">Lessons</th>
                      <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-right p-3 font-medium text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((student) => (
                      <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0">
                              {student.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{student.name}</div>
                              <div className="text-xs text-muted-foreground sm:hidden">{student.instrument}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 hidden sm:table-cell">
                          <div className="flex items-center gap-1.5">
                            <Music className="size-3 text-muted-foreground" />
                            <span>{student.instrument}</span>
                          </div>
                        </td>
                        <td className="p-3 hidden md:table-cell">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getLevelColor(student.level)}`}>
                            {student.level}
                          </span>
                        </td>
                        <td className="p-3 hidden lg:table-cell">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Mail className="size-3" />
                              <span className="truncate max-w-[160px]">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="size-3" />
                              <span>{student.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-center hidden sm:table-cell">
                          <span className="font-semibold text-foreground">{student.lessonsCompleted}</span>
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant={getStatusBadgeVariant(student.status) as 'default' | 'secondary' | 'outline'}>
                            {student.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Link
                            href={`/dashboard/teacher/students/${student.id}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                          >
                            View <ChevronRight className="size-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results count */}
        {!loading && (
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {students.length} students
          </p>
        )}
      </div>
    </DashboardShell>
  );
}
