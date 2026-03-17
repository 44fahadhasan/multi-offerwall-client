"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useIsMobile from "@/hooks/use-mobile";
import { INavSection } from "@/types";
import { Menu } from "lucide-react";
import { useState } from "react";
import SidebarBottom from "./sidebar-bottom";
import SidebarNav from "./sidebar-nav";
import SidebarTop from "./sidebar-top";

interface IMobileSidebarProps {
  navItems: INavSection[];
  href: string;
}

export default function MobileSidebar({ navItems, href }: IMobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

  return (
    <div className="grow">
      <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="data-[side=left]:w-64">
          <aside className="flex flex-col h-screen bg-sidebar border-sidebar-border border-r py-2">
            <SidebarTop href={href} />
            <SidebarNav navItems={navItems} />
            <SidebarBottom />
          </aside>
        </SheetContent>
      </Sheet>
    </div>
  );
}
