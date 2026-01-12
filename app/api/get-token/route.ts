// app/api/get-token/route.ts
import { NextResponse } from "next/server";

import { getToken } from "@/lib/server-functions";

export async function GET() {
  const token = await getToken();

  return NextResponse.json({ token: token ?? null });
}
