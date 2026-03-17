import { USER_ROLE } from "@/constants/user.const";
import { TUserRole } from "@/types";

interface IRouteConfig {
  exact: string[];
  patterns: RegExp[];
}

const authRoutes: string[] = [
  "/sign-up",
  "/sign-in",
  "/forgot-password",
] as const;

const commonProtectedRoutes: IRouteConfig = {
  exact: ["/my-profile"],
  patterns: [],
};

const userProtectedRoutes: IRouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/], // matches /dashboard/* routes
};

const adminProtectedRoutes: IRouteConfig = {
  exact: [],
  patterns: [/^\/admin\/dashboard/], // matches /admin/dashboard/* routes
};

const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

const isRouteMatch = (pathname: string, routes: IRouteConfig): boolean => {
  if (routes.exact.includes(pathname)) return true;

  return routes.patterns.some((regex) => regex.test(pathname));
};

const getRouteOwnerRole = (pathname: string) => {
  if (isRouteMatch(pathname, commonProtectedRoutes)) return "COMMON";
  if (isRouteMatch(pathname, userProtectedRoutes)) return USER_ROLE.USER;
  if (isRouteMatch(pathname, adminProtectedRoutes)) return USER_ROLE.ADMIN;
  return null; // public route
};

const isValidRedirectForRole = (redirectPath: string, userRole: TUserRole) => {
  const routeOwnerRole = getRouteOwnerRole(redirectPath);

  const role = userRole === USER_ROLE.SUPER_ADMIN ? USER_ROLE.ADMIN : userRole;

  const isAllowed =
    !routeOwnerRole || routeOwnerRole === "COMMON" || routeOwnerRole === role;

  return isAllowed;
};

const getDefaultDashboardRoute = (userRole: TUserRole) => {
  if (userRole === USER_ROLE.USER) return "/dashboard";
  return "/admin/dashboard"; // ADMIN + SUPER_ADMIN
};

export const routeRulesUtil = {
  isAuthRoute,
  getRouteOwnerRole,
  isValidRedirectForRole,
  getDefaultDashboardRoute,
};
