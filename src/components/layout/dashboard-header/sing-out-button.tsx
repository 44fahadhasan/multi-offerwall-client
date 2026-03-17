"use client";

import { singOutUser } from "@/actions/auth-actions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const toastId = toast.loading("Signing out...");

    try {
      const { success, message } = await singOutUser();

      if (!success) {
        toast.error(message ?? "Sign out failed", { id: toastId });
        return;
      }

      router.push("/");
      toast.success(message ?? "Signed out successfully!", { id: toastId });
    } catch (error) {
      toast.error((error as Error).message ?? "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="flex items-center w-full cursor-pointer text-destructive focus:text-destructive"
    >
      <LogOut className="mr-2 size-4" />
      Sign Out
    </button>
  );
}
