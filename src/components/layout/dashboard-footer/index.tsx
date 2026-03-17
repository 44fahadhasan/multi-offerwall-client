import { TypographyMuted } from "@/components/shared/typography";
import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import { env } from "../../../../env";

export default function DashboardFooter() {
  return (
    <footer className="border-t bg-muted/50 py-1.5 px-4">
      <div className="flex flex-col items-center justify-between gap-2 text-center xs:flex-row">
        <TypographyMuted>
          © {new Date().getFullYear()} {env.NEXT_PUBLIC_APP_NAME}. All rights
          reserved.
        </TypographyMuted>
        <TypographyMuted className="flex items-center gap-1.5">
          <HeartHandshake size={16} className="opacity-80" />
          <span className="capitalize">Designed & developed by</span>
          <Link
            aria-label="Md. Fahad Hasan"
            href="https://44fahadhasan.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:underline"
          >
            DEV.FH
          </Link>
        </TypographyMuted>
      </div>
    </footer>
  );
}
