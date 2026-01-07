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
    github: "https://github.com/MedAmine2221",
    linkedin: "https://www.linkedin.com/in/mohamed-amine-lazreg-831b1817a/",
    facebook: "https://www.facebook.com/mouhamed.amine.lazreg/",
    instagram: "https://www.instagram.com/mouhamedaminelz/",
  },
};
