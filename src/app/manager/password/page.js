"use client";

import { useRouter } from "next/navigation";
import PinPassword from "@/ui/components/PinPassword";

export default function PasswordPage() {
  const router = useRouter();

  const handlePasswordSubmit = (password) => {
    if (password !== "123456") return false;

    router.push("/manager/dashboard");
    return true;
  };

  return <PinPassword name="Manager" onSubmit={handlePasswordSubmit} />;
}