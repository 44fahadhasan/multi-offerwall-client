import { getMyProfile } from "@/actions/user.action";
import {
  TypographyMuted,
  TypographySmall,
} from "@/components/shared/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { profileNavLinks } from "./profile-nav-links";
import SignOutButton from "./sing-out-button";

export default async function ProfileNav() {
  const { success, data: user } = await getMyProfile();

  if (!success || !user) {
    return (
      <div className="py-2">
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage src={user.imageUrl ?? ""} alt={user.name} />
          <AvatarFallback>{user.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={7} align="start" className="w-52">
        <DropdownMenuLabel className="space-y-1">
          <TypographyMuted>{user.name}</TypographyMuted>
          <TypographyMuted className="text-xs">{user.email}</TypographyMuted>
          <TypographySmall className="text-xs text-primary">
            {role}
          </TypographySmall>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileNavLinks.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="flex items-center">
                <Icon className="mr-2 size-4" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
