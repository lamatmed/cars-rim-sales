import { NextResponse } from 'next/server';
import { updateUserAction, deleteUserAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function PATCH(request: Request, { params }: any) {
  await connectDB();
  const body = await request.json();
  const result = await updateUserAction(params.id, body);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
}

export async function DELETE(request: Request, { params }) {
  await connectDB();
  const result = await deleteUserAction(params.id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
} 