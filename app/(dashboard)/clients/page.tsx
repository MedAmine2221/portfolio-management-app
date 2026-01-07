import AppTables from "@/components/table";
import { adminDb } from "@/config/firebase-admin.init";
import { AppUser } from "@/types";

export default async function Layout({ children }: { children: React.ReactNode }) {

  const snapshot = await adminDb.collection("contact").get();
  const users = snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<AppUser, 'id'>;
    return {
      id: doc.id,
      ...data,
    };
  }) as AppUser[];
  return (

    <div className="p-6 m-4">
      <AppTables data={users} />
    </div>
  );
}
