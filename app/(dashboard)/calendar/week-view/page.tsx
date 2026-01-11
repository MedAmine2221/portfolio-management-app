"use client";
import { ClientContainer } from "@/components/app/calendar/client-container";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Page() {
    
      const auth = useSelector((item: RootState)=>item.auth.auth);
  console.log(auth.email, auth.password);

  return <ClientContainer view="week" />;
}
