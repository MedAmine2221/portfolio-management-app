import AppTables from "@/components/table";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const userData = [
    {
      id: "1",
      username: "Tony Reichert",
      phoneNumber: "CEO",
      lang: "Management",
      freePeriod: 5,
      goals: ["29"],
      createdAt: "20-01-2025",
      imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      address: "ddd",
      validatedAccount: true,
    },
    {
      id: "2",
      username: "Zoey Lang",
      phoneNumber: "Technical Lead",
      lang: "Development",
      freePeriod: 5,
      goals: ["25"],
      address: "ddd",
      createdAt: "20-01-2025",
      imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      validatedAccount: true,
    },
  ];
  return (

        <div className="p-6 m-4">
          <AppTables data={userData} />
        </div>
  );
}
