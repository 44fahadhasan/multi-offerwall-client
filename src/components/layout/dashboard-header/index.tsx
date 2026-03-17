import { getUserInfo } from "@/actions/auth-actions";
import { TypographySmall } from "@/components/shared/typography";
import { routeRulesUtil } from "@/utils/route-rules-util";
import { sidebarNavUtils } from "@/utils/sidebar-nav-util";
import MobileSidebar from "../dashboard-sidebar/mobile-sidebar";
import ProfileNav from "./profile-nav";

export default async function DashboardHeader() {
  const { success, data: user } = await getUserInfo();

  if (!success || !user) {
    return (
      <div className="flex justify-center w-full h- bg-sidebar">
        <TypographySmall className="text-destructive">
          Unable to load user session.
        </TypographySmall>
      </div>
    );
  }

  const navItems = sidebarNavUtils.getNavItemsByRole(user.role);
  const dashboardRoute = routeRulesUtil.getDefaultDashboardRoute(user.role);

  return (
    <header className="flex items-center px-4 py-1.5 border-b bg-muted/50">
      <MobileSidebar href={dashboardRoute} navItems={navItems} />
      <ProfileNav />
    </header>
  );
}
