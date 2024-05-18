import { LayoutDashboard, Vote } from "lucide-react";

export const NAV_LINKS = [
  {
    id: 0,
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: 1,
    title: "Events",
    href: "/events",
    icon: <Vote />,
  },
  {
    id: 2,
    title: "Ticketing",
    href: "/ticketing",
    icon: <Vote />,
  },
];
