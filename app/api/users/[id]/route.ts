import { NextRequest, NextResponse } from 'next/server';
import { updateUserAction, deleteUserAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const result = await updateUserAction(params.id, body);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const result = await deleteUserAction(params.id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
} 