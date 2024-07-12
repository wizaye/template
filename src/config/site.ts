export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Sorting Visualizer",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
      subRoutes: [
        {
          label: "Getting Started",
          description: "Get started with ACME documentation.",
          href: "/docs/getting-started",
        },
        {
          label: "API Reference",
          description: "Detailed API reference for ACME services.",
          href: "/docs/api-reference",
        },
        {
          label: "Guides",
          description: "In-depth guides and tutorials.",
          href: "/docs/guides",
        },
        {
          label: "FAQ",
          description: "Frequently asked questions.",
          href: "/docs/faq",
        },
        {
          label: "Support",
          description: "Get support and assistance.",
          href: "/docs/support",
        },
      ],
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui-docs-v2.vercel.app",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
