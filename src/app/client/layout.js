"use client";

import { useStore } from "@/context/StoreContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientLayout({ children }) {
  const { isSystemBlocked } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (isSystemBlocked) {
      router.push("/blocked");
    }
  }, [isSystemBlocked, router]);

  // Don't return null here, as it can cause flickering
  // Only render children when not blocked
  return children;
}