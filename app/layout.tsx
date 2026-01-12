import "@/styles/globals.css";
import { Providers } from "./providers";
import { ReduxProviders } from "./redux-provider";
import ChangePathProvider from "./change-path-provider";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { FaCopyright } from "react-icons/fa";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/amine.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        cz-shortcut-listen="true"
      >
        <ReduxProviders>
          <Providers>
            <ChangePathProvider>
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1">
                {children}
              </main>

              <footer className="w-full flex items-center justify-center py-3">
                <div className="flex items-center gap-1 text-current">
                  <FaCopyright className="text-white" />
                  <span className="text-default-600 text-sm">
                    All rights reserved {new Date().getFullYear()},
                  </span>
                  <p className="text-primary text-sm">Mohamed Amine LAZREG</p>
                </div>
              </footer>
            </div>
            </ChangePathProvider>
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}
