import { adminAuth } from "@/config/firebase-admin.init";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();
    if (!uid) return NextResponse.json({ error: "UID missing" }, { status: 400 });

    await adminAuth.updateUser(uid, { emailVerified: false });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
