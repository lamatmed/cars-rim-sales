import { NextRequest, NextResponse } from 'next/server';
import { loginAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const result = await loginAction(body);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
} 