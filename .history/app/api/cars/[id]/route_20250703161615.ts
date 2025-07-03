import { NextRequest, NextResponse } from 'next/server';
import { getCarByIdAction, updateCarAction, deleteCarAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function GET(request: Request, context: { params: { id: string } }) {
  await connectDB();
  const result = await getCarByIdAction(context.params.id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  await connectDB();
  const result = await deleteCarAction(context.params.id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}

export async function PATCH(request: Request, context: { params: { id: string } }) {
  await connectDB();
  const body = await request.json();
  const result = await updateCarAction(context.params.id, body);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
}