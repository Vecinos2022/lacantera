import { Calendar1, Home, Image } from "lucide-react";

export interface route {
  icon?: React.ElementType; // Icon component
  title: string;
  route: string | null;
  childRoutes?: route[];
  //   role: roles[]; // Roles allowed to access the route
  show?: boolean; // Whether to show the route in the navbar
}

export const routes: route[] = [
  {
    icon: Home,
    title: "Dashboard",
    route: "/admin",
    // role: ["ADMIN", "SUPERADMIN"],
    show: true,
  },
  {
    icon: Calendar1,
    title: "Eventos",
    route: "/admin/event",
    // role: ["ADMIN", "SUPERADMIN"],
    show: true,
  },
  {
    icon: Image,
    title: "Imágenes",
    route: "/admin/images",
    // role: ["ADMIN", "SUPERADMIN"],
    show: true,
  },
];
