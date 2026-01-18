"use client";
import { useSelector } from "react-redux";

import AppTables from "@/components/table";
import { RootState } from "@/redux/store";

export default function ClientList() {
  const users = useSelector((item: RootState) => item.clients.clients);  
  return (
    <div className="p-2">
      <AppTables data={users} />
    </div>
  );
}
