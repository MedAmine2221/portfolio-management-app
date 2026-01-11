"use client";

import { signIn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const auth = useSelector((item: RootState)=>item.auth.auth);
  console.log(auth.email, auth.password);
  
  const dispatch = useDispatch();
  useEffect(() => {
    const checkToken = async () => {
      const res = await fetch("/api/get-token");
      const data = await res.json();
      
      if (data.token) {
        signIn({
          email: auth.email,
          password: auth.password
        },dispatch, router)
        router.replace("/calendar/week-view");
      } else {
        router.replace("/auth");
      }
    };

    checkToken();
  }, [router]);

  return (
    <div className="grid place-items-center min-h-screen">
      <Image src="/loading.gif" width={500} height={500} alt="loading" />
    </div>
  )
}
