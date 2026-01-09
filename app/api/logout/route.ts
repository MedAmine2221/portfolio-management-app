import { adminAuth } from "@/config/firebase-admin.init";
import { removeToken } from "@/lib/server-functions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();
    await adminAuth.updateUser(uid, { emailVerified: false });
    await removeToken();
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}
