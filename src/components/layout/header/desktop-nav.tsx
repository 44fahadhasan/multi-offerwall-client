import { Button } from "@/components/ui/button";
import Link from "next/link";
import { navLinks } from "./nav-links";

export default function DesktopNav() {
  return (
    <div className="hidden items-center gap-2 md:flex">
      <div>
        {navLinks.map((link) => (
          <Button asChild key={link.label} size="sm" variant="ghost">
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </div>
      <Button asChild size="sm" variant="outline">
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </div>
  );
}
