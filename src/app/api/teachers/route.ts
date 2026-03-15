import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: { select: { name: true, nameZh: true, email: true, phone: true, avatar: true } },
        instruments: { include: { instrument: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { userId, bio, bioZh, slug, campuses, image, instrumentIds } = body;

    const teacher = await prisma.teacher.create({
      data: {
        userId,
        bio,
        bioZh,
        slug,
        campuses: campuses || [],
        image,
        instruments: instrumentIds
          ? {
              create: instrumentIds.map((id: string) => ({
                instrumentId: id,
              })),
            }
          : undefined,
      },
      include: {
        user: { select: { name: true, email: true } },
        instruments: { include: { instrument: true } },
      },
    });

    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    console.error('Error creating teacher:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
