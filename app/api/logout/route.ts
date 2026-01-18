import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();

  (await cookieStore).getAll().forEach(async (cookie) => {
    (await cookieStore).set(cookie.name, "", {
      path: "/",
      expires: new Date(0),
    });
  });

  return NextResponse.json({ success: true });
}
