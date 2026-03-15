'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';

type Teacher = {
  id: string;
  name: string;
  email: string;
  instruments: string[];
  campuses: string[];
  status: 'Active' | 'On Leave' | 'Inactive';
  phone: string;
};

const initialTeachers: Teacher[] = [
  { id: 'T-001', name: 'Li Wei', email: 'li.wei@miyamusic.com', instruments: ['Guzheng', 'Guqin'], campuses: ['Chatswood', 'Burwood'], status: 'Active', phone: '0412 345 678' },
  { id: 'T-002', name: 'Zhang Hao', email: 'zhang.hao@miyamusic.com', instruments: ['Erhu', 'Zhonghu'], campuses: ['Chatswood'], status: 'Active', phone: '0423 456 789' },
  { id: 'T-003', name: 'Chen Mei', email: 'chen.mei@miyamusic.com', instruments: ['Pipa', 'Zhongruan'], campuses: ['Burwood'], status: 'Active', phone: '0434 567 890' },
  { id: 'T-004', name: 'Wang Jun', email: 'wang.jun@miyamusic.com', instruments: ['Dizi', 'Xiao', 'Hulusi'], campuses: ['Chatswood', 'Burwood'], status: 'On Leave', phone: '0445 678 901' },
];

const statusColor: Record<string, string> = {
  Active: 'bg-green-100 text-green-800 border-green-200',
  'On Leave': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Inactive: 'bg-red-100 text-red-800 border-red-200',
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formInstruments, setFormInstruments] = useState('');
  const [formCampuses, setFormCampuses] = useState('');

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    t.instruments.some((i) => i.toLowerCase().includes(search.toLowerCase()))
  );

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormInstruments('');
    setFormCampuses('');
  };

  const handleAdd = () => {
    if (!formName || !formEmail) return;
    const newTeacher: Teacher = {
      id: `T-${String(teachers.length + 1).padStart(3, '0')}`,
      name: formName,
      email: formEmail,
      phone: formPhone,
      instruments: formInstruments.split(',').map((s) => s.trim()).filter(Boolean),
      campuses: formCampuses.split(',').map((s) => s.trim()).filter(Boolean),
      status: 'Active',
    };
    setTeachers([...teachers, newTeacher]);
    resetForm();
    setAddOpen(false);
  };

  const handleEdit = () => {
    if (!editingTeacher || !formName || !formEmail) return;
    setTeachers(teachers.map((t) =>
      t.id === editingTeacher.id
        ? {
            ...t,
            name: formName,
            email: formEmail,
            phone: formPhone,
            instruments: formInstruments.split(',').map((s) => s.trim()).filter(Boolean),
            campuses: formCampuses.split(',').map((s) => s.trim()).filter(Boolean),
          }
        : t
    ));
    resetForm();
    setEditOpen(false);
    setEditingTeacher(null);
  };

  const openEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormName(teacher.name);
    setFormEmail(teacher.email);
    setFormPhone(teacher.phone);
    setFormInstruments(teacher.instruments.join(', '));
    setFormCampuses(teacher.campuses.join(', '));
    setEditOpen(true);
  };

  const handleDelete = (id: string) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  const formFields = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground">Name</label>
        <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Full name" className="mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Email</label>
        <Input value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="email@example.com" className="mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Phone</label>
        <Input value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="0400 000 000" className="mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Instruments (comma-separated)</label>
        <Input value={formInstruments} onChange={(e) => setFormInstruments(e.target.value)} placeholder="Guzheng, Erhu" className="mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Campuses (comma-separated)</label>
        <Input value={formCampuses} onChange={(e) => setFormCampuses(e.target.value)} placeholder="Chatswood, Burwood" className="mt-1" />
      </div>
    </div>
  );

  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Teacher Management</h1>
            <p className="text-sm text-muted-foreground">Manage your teaching staff across all campuses.</p>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger
              onClick={() => { resetForm(); setAddOpen(true); }}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
            >
              <Plus className="size-4" />
              Add Teacher
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
              </DialogHeader>
              {formFields}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd}>Add Teacher</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Table */}
        <Card>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No teachers found matching your search.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium">Name</th>
                      <th className="pb-3 pr-4 font-medium">Email</th>
                      <th className="pb-3 pr-4 font-medium">Instruments</th>
                      <th className="pb-3 pr-4 font-medium">Campuses</th>
                      <th className="pb-3 pr-4 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((teacher) => (
                      <tr key={teacher.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium">{teacher.name}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{teacher.email}</td>
                        <td className="py-3 pr-4">
                          <div className="flex flex-wrap gap-1">
                            {teacher.instruments.map((inst) => (
                              <Badge key={inst} variant="secondary">{inst}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex flex-wrap gap-1">
                            {teacher.campuses.map((campus) => (
                              <Badge key={campus} variant="outline">{campus}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColor[teacher.status]}`}>
                            {teacher.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon-sm" onClick={() => openEdit(teacher)}>
                              <Pencil className="size-4" />
                            </Button>
                            <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(teacher.id)}>
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Teacher</DialogTitle>
            </DialogHeader>
            {formFields}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => { setEditOpen(false); setEditingTeacher(null); }}>Cancel</Button>
              <Button onClick={handleEdit}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  );
}
