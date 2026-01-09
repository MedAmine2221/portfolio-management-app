"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const res = await fetch("/api/get-token");
      const data = await res.json();
      
      if (data.token) {
        router.replace("/calendar/week-view");
      } else {
        router.replace("/auth");
      }
    };

    checkToken();
  }, [router]);

  return (
    <div className="flex justify-center items-center">
      <Image src={"/loading.gif"} width={500} height={500} alt="loading" />
    </div>
  )
}
