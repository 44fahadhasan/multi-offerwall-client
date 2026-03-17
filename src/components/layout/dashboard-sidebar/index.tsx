import { getUserInfo } from "@/actions/auth-actions";
import { getMyProfile } from "@/actions/user.action";
import { TypographySmall } from "@/components/shared/typography";
import { routeRulesUtil } from "@/utils/route-rules-util";
import { sidebarNavUtils } from "@/utils/sidebar-nav-util";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SidebarBottom from "./sidebar-bottom";
import SidebarNav from "./sidebar-nav";
import SidebarTop from "./sidebar-top";

export default async function Sidebar() {
  const { success, data: user } = await getUserInfo();

  if (!success || !user) {
    return (
      <div className="flex flex-col items-center justify-center w-64 h-screen bg-sidebar">
        <TypographySmall className="text-destructive">
          Unable to load user session.
        </TypographySmall>
      </div>
    );
  }

  const navItems = sidebarNavUtils.getNavItemsByRole(user.role);
  const dashboardRoute = routeRulesUtil.getDefaultDashboardRoute(user.role);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user-profile"],
    queryFn: getMyProfile,
  });

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-sidebar border-sidebar-border border-r py-2">
      <SidebarTop href={dashboardRoute} />
      <SidebarNav navItems={navItems} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SidebarBottom />
      </HydrationBoundary>
    </aside>
  );
}
