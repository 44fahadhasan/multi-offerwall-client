import { USER_ROLE } from "@/constants/user.const";
import { TUserRole } from "@/types";

// Allowed roles & including a common role for all authenticated users
type RouteRole = TUserRole | "COMMON";

// Exact path route
interface IExactRoute {
  type: "exact";
  path: string;
  roles: RouteRole[];
}

// Pattern route (regex)
interface IPatternRoute {
  type: "pattern";
  pattern: RegExp;
  roles: RouteRole[];
}

// Union of exact + pattern routes
type IRoute = IExactRoute | IPatternRoute;

// ----------------- Auth routes -----------------
export const authRoutes: IExactRoute[] = [
  { type: "exact", path: "/sign-up", roles: [] },
  { type: "exact", path: "/sign-in", roles: [] },
  { type: "exact", path: "/forgot-password", roles: [] },
] as const;

// ----------------- Protected routes -----------------
export const protectedRoutes: IRoute[] = [
  // Common routes
  { type: "exact", path: "/my-profile", roles: ["COMMON"] },

  // User routes
  { type: "pattern", pattern: /^\/dashboard/, roles: [USER_ROLE.USER] },

  // Admin routes
  {
    type: "pattern",
    pattern: /^\/admin\/dashboard/,
    roles: [USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN],
  },
] as const;

// ----------------- Utilities -----------------

// Check if a route matches a pathname
const isRouteMatch = (pathname: string, route: IRoute | IExactRoute) => {
  return route.type === "exact"
    ? route.path === pathname
    : route.pattern.test(pathname);
};

// Check if a route is public
export const isAuthRoute = (pathname: string) =>
  authRoutes.some((route) => isRouteMatch(pathname, route));

// Get Route Owner Role
export const getRouteOwnerRole = (pathname: string): RouteRole | null => {
  const route = protectedRoutes.find((route) => isRouteMatch(pathname, route));

  if (!route) return null;
  if (route.roles.includes("COMMON")) return "COMMON";
  if (route.roles.includes(USER_ROLE.USER)) return USER_ROLE.USER;
  if (
    route.roles.includes(USER_ROLE.ADMIN) ||
    route.roles.includes(USER_ROLE.SUPER_ADMIN)
  ) {
    return USER_ROLE.ADMIN;
  }

  return null;
};

// Check if a user can access a route
export const canAccessRoute = (pathname: string, userRole: TUserRole) => {
  if (isAuthRoute(pathname)) return true;

  const route = protectedRoutes.find((route) => isRouteMatch(pathname, route));
  if (!route) return true; // unknown route → allow

  // Normalize SUPER_ADMIN as ADMIN
  const role = userRole === USER_ROLE.SUPER_ADMIN ? USER_ROLE.ADMIN : userRole;

  return (
    route.roles.includes("COMMON") ||
    route.roles.includes(userRole) ||
    route.roles.includes(role)
  );
};

// Get default dashboard based on role
export const getDefaultDashboardRoute = (userRole: TUserRole) => {
  if (userRole === USER_ROLE.USER) return "/dashboard";
  return "/admin/dashboard"; // ADMIN + SUPER_ADMIN
};

// Validate redirect path for a role
export const isValidRedirectForRole = (
  redirectPath: string,
  userRole: TUserRole,
) => canAccessRoute(redirectPath, userRole);
