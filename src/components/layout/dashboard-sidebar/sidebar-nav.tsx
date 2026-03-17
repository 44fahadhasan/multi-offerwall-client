"use client";

import { TypographyMuted } from "@/components/shared/typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { INavSection } from "@/types";
import { getIconCom } from "@/utils/icon-mapper";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISidebarNavProps {
  navItems: INavSection[];
}

export default function SidebarNav({ navItems }: ISidebarNavProps) {
  const pathname = usePathname();

  return (
    <ScrollArea className="min-h-[calc(100vh-106px)]">
      <nav className="space-y-2">
        {navItems.map((navItem, navItemIdx) => (
          <div key={navItemIdx} className="space-y-1">
            <div className="px-3">
              {navItem.title && (
                <TypographyMuted>{navItem.title}</TypographyMuted>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              {navItem.items.map((navItem) => {
                const Icon = getIconCom(navItem.icon);
                const isActive = pathname === navItem.href;

                return (
                  <Link
                    key={navItem.href}
                    href={navItem.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-primary/70 hover:text-sidebar-primary-foreground",
                    )}
                  >
                    <Icon className="size-4" />
                    <span>{navItem.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </ScrollArea>
  );
}
