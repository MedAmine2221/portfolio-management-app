"use client";
import "@/styles/globals.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useEffect } from "react";

import { RootState } from "@/redux/store";
import { signIn } from "@/lib/utils";
import { getToken } from "@/lib/server-functions";

export default function ChangePathProvider({
  children,
}: {
  children: ReactNode;
}) {
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

  return <>{children}</>;
}
