import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { ReduxProviders } from "./redux-provider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
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
            <div className="relative flex flex-col">
              <main>
                {children}
              </main>
            </div>
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}
