"use client";;
import "@/styles/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useEffect } from "react";

import { RootState } from "@/redux/store";
import { signIn } from "@/lib/utils";
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
        signIn(
          {
            email: auth.email,
            password: auth.password,
          },
          dispatch,
          router,
        );
        router.replace("/calendar/month-view");
      } else {
        if(pathname != "/auth"){
          router.replace("/auth");
        }
      }
    };

    checkToken();
  }, [router,token]);

  return <>{children}</>;
}