import "@/styles/globals.css";
import { Providers } from "./providers";
import { ReduxProviders } from "./redux-provider";
import ChangePathProvider from "./change-path-provider";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

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
              <div className="relative flex flex-col">
                <main>
                  {children}
                </main>
              </div>
            </ChangePathProvider>
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}
