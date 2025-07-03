import { NextRequest, NextResponse } from 'next/server';
import { getOrderByIdAction, updateOrderAction, deleteOrderAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function GET(req, { params }) {
  await connectDB();
  const result = await getOrderByIdAction(params.id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const result = await deleteOrderAction(params.id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}

export async function PATCH(req, { params }) {
  await connectDB();
  const body = await req.json();
  const result = await updateOrderAction(params.id, body);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
} 