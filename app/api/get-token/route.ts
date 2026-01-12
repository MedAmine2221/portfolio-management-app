// app/api/get-token/route.ts
import { NextResponse } from "next/server";

import { getToken } from "@/lib/server-functions";

export async function GET() {
  try {
    const token = await getToken();
    return NextResponse.json({ token: token ?? null });
  } catch (err) {
    console.error('GET /api/get-token error:', err);
    return NextResponse.json({ token: null }, { status: 500 });
  }
}
