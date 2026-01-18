"use client";;
import "@/styles/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { RootState } from "@/redux/store";
import { login } from "@/lib/utils";
import { ChildrenProps } from "@/types/interfaces";

export default function ChangePathProvider({
  children,
}: ChildrenProps) {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useSelector((item: RootState) => item.auth.auth);
  const token = useSelector((item:RootState)=>item.token.token);
  const dispatch = useDispatch();  
  useEffect(() => {
    const checkToken = async () => {
      if (token != "") {
        login(
          {
            email: auth.email,
            password: auth.password,
          },
          dispatch,
          router,
        ); 
      } else {
        if (pathname != "/auth") {
          router.replace("/auth");
        }
      }
    };

    checkToken();
  }, [router,token]);

  return <>{children}</>;
}