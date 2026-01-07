export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Mohamed Amine's Portfolio Management",
  description: "Manage appointments coming from Mohamed Amine’s portfolio",
  navItems: [
    {
      label: "Home",
      href: "/calendar/week-view",
    },
    {
      label: "Clients",
      href: "/clients",
    }
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/calendar/week-view",
    },
    {
      label: "Clients",
      href: "/clients",
    }
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
  },
};
