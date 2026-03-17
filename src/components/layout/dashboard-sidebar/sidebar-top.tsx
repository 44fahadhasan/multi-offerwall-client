import { Coins } from "lucide-react";
import Link from "next/link";
import { env } from "../../../../env";

interface ISidebarTopParams {
  href: string;
}

export default function SidebarTop({ href }: ISidebarTopParams) {
  return (
    <div className="border-b pb-2 pl-3">
      <Link
        href={href}
        className="flex items-center gap-2 font-bold text-xl text-primary"
      >
        <Coins />
        <span>{env.NEXT_PUBLIC_APP_NAME}</span>
      </Link>
    </div>
  );
}
