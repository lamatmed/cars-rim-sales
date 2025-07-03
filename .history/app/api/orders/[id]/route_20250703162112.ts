/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getOrderByIdAction, updateOrderAction, deleteOrderAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function GET(request: Request, { params }  : any ) {
  await connectDB();
  const result = await getOrderByIdAction(params.id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}

export async function DELETE(request: Request, { params }) {
  await connectDB();
  const result = await deleteOrderAction(params.id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}

export async function PATCH(request: Request, { params }) {
  await connectDB();
  const body = await request.json();
  const result = await updateOrderAction(params.id, body);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
} 