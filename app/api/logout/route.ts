import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  const allCookies = (await cookieStore).getAll();

  allCookies.forEach(async (cookie: any) => {
    const options: any = {
      path: "/",
      expires: new Date(0),
      secure: true,
      sameSite: "lax",
    };

    if (!cookie.name.startsWith("__Host-")) {
      options.domain =
        process.env.NODE_ENV === "production" ? undefined : "localhost";
    }

    (await cookieStore).set(cookie.name, "", options);
  });

  return NextResponse.json({ success: true });
}
