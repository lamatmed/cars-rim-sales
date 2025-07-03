import { NextResponse } from 'next/server';
import { getOrderByIdAction, updateOrderAction, deleteOrderAction } from '@/lib/actions';
import connectDB from '@/lib/config/db';

export async function GET(request: Request, { params } 
.next/types/app/api/orders/[id]/route.ts:49:7
Type error: Type '{ __tag__: "GET"; __param_position__: "second"; __param_type__: { params: { id: string; }; }; }' does not satisfy the constraint 'ParamCheck<RouteContext>'.
  The types of '__param_type__.params' are incompatible between these types.    
    Type '{ id: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]

  47 |     Diff<
  48 |       ParamCheck<RouteContext>,
> 49 |       {
     |       ^
  50 |         __tag__: 'GET'
  51 |         __param_position__: 'second'
  52 |         __param_type__: SecondArg<MaybeField<TEntry, 'GET'>>
Next.js build worker exited with code: 1 and signal: null
PS D:\Nextjs\cars-rim> ) {
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