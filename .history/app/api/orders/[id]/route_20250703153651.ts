import { NextRequest, NextResponse } from 'next/server';
import { getOrderByIdAction, updateOrderAction, deleteOrderAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function GET(_req: NextRequest,
  { params }: { params: { id: string } }) {
  await connectDB();
  const result = await getOrderByIdAction(params.id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}

export async function DELETE(_req: NextRequest,
  { params }: { params: { id: string } }) {
  await connectDB();
  const result = await deleteOrderAction(params.id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}

export async function PATCH(_req: NextRequest,
  { params }: { params: { id: string } }) {
  await connectDB();
  const body = await_req.json();
  const result = await updateOrderAction(params.id, body);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
} 