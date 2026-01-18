import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  const allCookies = (await cookieStore).getAll();

  allCookies.forEach(async (cookie) => {
    (await cookieStore).set(cookie.name, "", {
      path: "/",
      expires: new Date(0),
      secure: true,
      sameSite: "lax",
      domain: process.env.NODE_ENV === "production"
        ? ".vercel.app"
        : "localhost",
    });
  });

  return NextResponse.json({ success: true });
}
