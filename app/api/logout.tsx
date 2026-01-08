import { adminAuth } from "@/config/firebase-admin.init";

export default async function handler(req: any, res: any) {
  const { uid } = req.body;
  try {
    await adminAuth.updateUser(uid, { emailVerified: false });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
}