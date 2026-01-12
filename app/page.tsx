import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import Image from "next/image";
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
export default function Home() {
  return (
    <div className="grid place-items-center min-h-screen">
      <Image alt="loading" height={500} src="/loading.gif" width={500} />
    </div>
  );
}
