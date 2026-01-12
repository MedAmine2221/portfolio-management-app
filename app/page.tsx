"use client";
import { getToken } from "@/lib/server-functions";
import { signIn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Home() {
    const router = useRouter();
    const auth = useSelector((item: RootState) => item.auth.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const checkToken = async () => {
        const res = await getToken();
        
        if (res) {
          signIn(
            {
              email: auth.email,
              password: auth.password,
            },
            dispatch,
            router,
          );
          router.replace("/calendar/week-view");
        } else {
          router.replace("/auth");
        }
      };
  
      checkToken();
    }, [router]);
  return (
    <div className="grid place-items-center min-h-screen">
      <Image alt="loading" height={500} src="/loading.gif" width={500} />
    </div>
  );
}
