import { USER_ROLE } from "@/constants/user.const";
import { adminNavItems } from "@/routes/admin-route";
import { commonNavItems } from "@/routes/common-route";
import { userNavItems } from "@/routes/user-route";
import { INavSection, TUserRole } from "@/types";
import { routeRulesUtil } from "./route-rules-util";

const getDashboardNavSections = (role: TUserRole): INavSection[] => {
  const defaultDashboardRoute = routeRulesUtil.getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboardRoute,
          icon: "LayoutDashboard",
        },
      ],
    },
  ];
};

export const getNavItemsByRole = (role: TUserRole): INavSection[] => {
  const { USER, ADMIN, SUPER_ADMIN } = USER_ROLE;
  const defaultDashboardNavItems = getDashboardNavSections(role);

  switch (role) {
    case USER:
      return [...defaultDashboardNavItems, ...userNavItems, ...commonNavItems];

    case ADMIN:
    case SUPER_ADMIN:
      return [...defaultDashboardNavItems, ...adminNavItems, ...commonNavItems];

    default:
      return [];
  }
};

export const sidebarNavUtils = { getNavItemsByRole };
