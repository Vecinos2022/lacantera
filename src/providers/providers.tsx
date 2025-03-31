// app/providers.tsx

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider
        placement="top-center"
        toastProps={{
          radius: "full",
          color: "primary",
          variant: "flat",
          timeout: 1000,

          classNames: {
            closeButton:
              "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
          },
        }}
      />

      {children}
    </HeroUIProvider>
  );
}
