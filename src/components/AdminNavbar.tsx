"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import Link from "next/link";

import { routes } from "@/routes/routes";
import { LogOut } from "lucide-react";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any authentication state (if implemented)
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-center font-bold text-lg border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-4">
        {routes
          .filter((route) => route.show)
          .map((route, index) => (
            <Link
              key={index}
              href={route.route || "#"}
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700"
            >
              {route.icon && <route.icon size={20} />}
              <span>{route.title}</span>
            </Link>
          ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <Button
          color="danger"
          variant="ghost"
          className="w-full flex items-center gap-2 justify-center"
          onPress={handleLogout}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </aside>
  );
}
