"use client";

import { ReactNode } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import Providers from "@/providers/providers";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="flex h-screen w-screen overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 h-full overflow-auto p-8 bg-gray-100">
          {children}
        </main>
      </div>
    </Providers>
  );
}
