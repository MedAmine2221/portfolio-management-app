"use client";
import "@/styles/globals.css";
import { FaCopyright } from "react-icons/fa";

import { Providers } from "./providers";
import { ReduxProviders } from "./redux-provider";

import ChangePathProvider from "./change-path-provider";
import { SessionProvider } from "next-auth/react";
import { ChildrenProps } from "@/types/interfaces";
import { useEffect } from "react";
import { hasNextAuthSessionToken } from "@/lib/server-functions";
import { usePathname, useRouter } from "next/navigation";
export default function RootLayout({
  children,
}: ChildrenProps) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    async function checkSession() {
      const verify = await hasNextAuthSessionToken();
      if (!verify) {
        router.push("/auth");
      }
    }
    checkSession();
  }, [router, pathname]);

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <ReduxProviders>
          <Providers>
            <SessionProvider>
              <ChangePathProvider>
                <div className="relative flex min-h-screen flex-col">
                  <main className="flex-1">{children}</main>
                  <footer className="w-full flex items-center justify-center py-3">
                    <div className="flex items-center gap-1 text-current">
                      <FaCopyright className="text-white" />
                      <span className="text-default-600 text-sm">
                        All rights reserved {new Date().getFullYear()}
                      </span>
                      <p className="text-primary text-sm">Mohamed Amine LAZREG</p>
                    </div>
                  </footer>
                </div>
              </ChangePathProvider>
            </SessionProvider>
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}
