"use client";;
import "@/styles/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { RootState } from "@/redux/store";
import { login } from "@/lib/utils";
import { ChildrenProps } from "@/types/interfaces";
import { hasNextAuthSessionToken } from "@/lib/server-functions";

export default function ChangePathProvider({
  children,
}: ChildrenProps) {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useSelector((item: RootState) => item.auth.auth);
  const token = useSelector((item:RootState)=>item.token.token);
  const connected = useSelector((item:RootState)=>item.connected.connected);
  const dispatch = useDispatch();  
  useEffect(() => {
    const checkToken = async () => {
      const verify = await hasNextAuthSessionToken();
      if (token != "" && verify) {
        if(!connected){
          login(
            {
              email: auth.email,
              password: auth.password,
            },
            dispatch,
          );
        }
        if(pathname === "/auth" || pathname === "/") {
          router.replace("/calendar/month-view");
        }
      } else {
        if (pathname !== "/auth") {
          router.replace("/auth");
        }
      }
    };

    checkToken();
  }, [router, pathname]);

  return <>{children}</>;
}