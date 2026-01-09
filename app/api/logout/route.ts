import { adminAuth } from "@/config/firebase-admin.init";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    console.log("Logout API called");

    await adminAuth.updateUser(uid, { emailVerified: false });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}
