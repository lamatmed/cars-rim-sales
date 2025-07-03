import { NextResponse } from 'next/server';
import { getCarByIdAction, updateCarAction, deleteCarAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function GET( { params }) {
  await connectDB();
  const result = await getCarByIdAction(params.id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}

export async function DELETE( { params }) {
  await connectDB();
  const result = await deleteCarAction(params.id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}

export async function PATCH(req, { params }) {
  await connectDB();
  const body = await req.json();
  const result = await updateCarAction(params.id, body);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
} 