import { LayoutDashboard, Vote, TicketCheckIcon } from "lucide-react";

export const NAV_LINKS = [
  {
    id: 0,
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={16} />,
  },
  {
    id: 1,
    title: "Events",
    href: "/events",
    icon: <Vote size={16} />,
  },
  {
    id: 2,
    title: "Ticketing",
    href: "/ticketing",
    icon: <TicketCheckIcon size={16} />,
  },
];
