import AppTables from "@/components/table";
import { adminDb } from "@/config/firebase-admin.init";

export default async function Layout({ children }: { children: React.ReactNode }) {
  type AppUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    object: string;
    message: string;
    createdAt: string;
    progress: "to do" | "in progress" | "done"
  };
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
