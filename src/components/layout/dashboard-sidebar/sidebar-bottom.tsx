"use client";

import { getMyProfile } from "@/actions/user.action";
import {
  TypographyMuted,
  TypographySmall,
} from "@/components/shared/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

export default function SidebarBottom() {
  const { data, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getMyProfile(),
  });

  const user = data?.data;

  if (isError || !user) {
    return (
      <div className="border-t px-4 py-3">
        <TypographyMuted className="text-xs text-destructive">
          Failed to load user
        </TypographyMuted>
      </div>
    );
  }

  const role = user.role
    ?.toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <div className="border-t px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user.imageUrl ?? ""} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col overflow-hidden">
          <TypographySmall className="font-medium truncate">
            {user.name}
          </TypographySmall>
          <TypographyMuted className="text-xs truncate">{role}</TypographyMuted>
        </div>
      </div>
    </div>
  );
}
