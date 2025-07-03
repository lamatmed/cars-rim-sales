import { NextRequest, NextResponse } from 'next/server';
import { registerAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const result = await registerAction(body);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
} 