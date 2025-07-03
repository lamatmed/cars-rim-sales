import { NextRequest, NextResponse } from 'next/server';
import { getAllCarsAction, createCarAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function GET() {
  await connectDB();
  const result = await getAllCarsAction();
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const result = await createCarAction(body);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
} 