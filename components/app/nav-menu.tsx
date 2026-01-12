"use client";

import { Tabs, Tab } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";

export default function NavMenu({ isMobile }: { isMobile?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  return isMobile ? (
    <Tabs
      aria-label="Navigation"
      classNames={{
        tabList: "overflow-x-auto scrollbar-hide w-100",
      }}
      selectedKey={pathname}
      variant="bordered"
      onSelectionChange={(key) => router.push(key as string)}
    >
      {siteConfig.navItems.map((item) => (
        <Tab key={item.href} title={item.label} />
      ))}
    </Tabs>):(
    <Tabs
      aria-label="Navigation"
      selectedKey={pathname}
      variant="bordered"
      onSelectionChange={(key) => router.push(key as string)}
    >
      {siteConfig.navItems.map((item) => (
        <Tab key={item.href} title={item.label} />
      ))}
    </Tabs>
  );
}
