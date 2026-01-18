import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  allCookies.forEach((cookie: any) => {
    const options: any = {
      path: "/",
      expires: new Date(0),
      secure: true,
      sameSite: "lax",
    };

    // إذا كان cookie من نوع __Host- ممنوع domain
    if (!cookie.name.startsWith("__Host-")) {
      options.domain =
        process.env.NODE_ENV === "production" ? undefined : "localhost";
    }

    cookieStore.set(cookie.name, "", options);
  });

  return NextResponse.json({ success: true });
}
