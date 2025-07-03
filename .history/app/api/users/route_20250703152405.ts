import { NextRequest, NextResponse } from 'next/server';
import { getAllUsersAction, updateUserAction, deleteUserAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function GET() {
  await connectDB();
  const result = await getAllUsersAction();
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
}

// PATCH et DELETE sur /api/users/[id] (voir route.ts dans [id]) 