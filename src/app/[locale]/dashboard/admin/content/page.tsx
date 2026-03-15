'use client';

import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Image, Calendar, Newspaper, ExternalLink, Settings } from 'lucide-react';

const contentSections = [
  {
    title: 'Homepage',
    description: 'Hero section, featured courses, upcoming events display',
    icon: FileText,
    status: 'Static',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'News & Blog',
    description: 'News articles, blog posts, announcements',
    icon: Newspaper,
    status: 'CMS Ready',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    title: 'Events',
    description: 'Upcoming concerts, workshops, cultural events',
    icon: Calendar,
    status: 'Database',
    statusColor: 'bg-purple-100 text-purple-700',
  },
  {
    title: 'Media Gallery',
    description: 'Photos, videos from performances and classes',
    icon: Image,
    status: 'Planned',
    statusColor: 'bg-yellow-100 text-yellow-700',
  },
];

export default function AdminContentPage() {
  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <p className="text-sm text-muted-foreground">Manage website content and media</p>
      </div>

      {/* Sanity Studio Notice */}
      <Card className="mb-6 border-gold/30 bg-gold/5">
        <CardContent className="flex items-start gap-4 py-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/20">
            <Settings className="size-5 text-gold" />
          </div>
          <div>
            <h3 className="font-semibold">Sanity CMS Integration</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Sanity Studio will be integrated in Phase 4 for advanced content management including rich text editing,
              image management, and real-time preview. For now, content is managed through the database.
            </p>
            <Button variant="outline" size="sm" className="mt-3" disabled>
              <ExternalLink className="mr-2 size-3" />
              Open Sanity Studio (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Sections */}
      <div className="grid gap-4 sm:grid-cols-2">
        {contentSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{section.title}</CardTitle>
                      <CardDescription className="text-xs">{section.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className={section.statusColor}>
                    {section.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full">
                  Manage {section.title}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Content Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground">Pages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2</div>
              <div className="text-xs text-muted-foreground">News Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-xs text-muted-foreground">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-xs text-muted-foreground">Products</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
