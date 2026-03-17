import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_CONFIG } from "./constants/token.const";
import { USER_ROLE } from "./constants/user.const";
import { TUserRole } from "./types";
import { routeRulesUtil } from "./utils/route-rules-util";
import { tokenUtils } from "./utils/token-util";

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const { accessToken, refreshToken } = await tokenUtils.getTokens();
    const { decoded, isValid } = tokenUtils.getAccessTokenInfo(accessToken);
    const { isAuthRoute, getRouteOwnerRole, getDefaultDashboardRoute } =
      routeRulesUtil;

    // Normalize user role (SUPER_ADMIN & ADMIN)
    const userRole: TUserRole | undefined =
      decoded?.role === USER_ROLE.SUPER_ADMIN ? USER_ROLE.ADMIN : decoded?.role;

    const authRoute = isAuthRoute(pathname);
    const routeOwnerRole = getRouteOwnerRole(pathname);

    // Refresh access token if it's about to expire
    if (
      accessToken &&
      isValid &&
      refreshToken &&
      tokenUtils.isTokenExpiringSoon(accessToken)
    ) {
      const headers = new Headers(request.headers);
      const isRefresh = await tokenUtils.tryRefreshTokenFromProxy(refreshToken);

      if (isRefresh) {
        headers.set(TOKEN_CONFIG.TOKEN_REFRESHED_HEADER, "1");
      }

      return NextResponse.next({ request: { headers } });
    }

    // Prevent logged-in users from accessing auth pages
    if (authRoute && userRole && isValid) {
      const defaultDashboardRoute = getDefaultDashboardRoute(userRole);
      const url = new URL(defaultDashboardRoute, request.url);

      return NextResponse.redirect(url);
    }

    // Allow public routes (no authentication required)
    if (!routeOwnerRole) {
      return NextResponse.next();
    }

    // Redirect to sign-in if user is not authenticated
    if (!accessToken || !isValid || !refreshToken) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname);

      return NextResponse.redirect(signInUrl);
    }

    // Allow routes accessible by all authenticated users
    if (routeOwnerRole === "COMMON") {
      return NextResponse.next();
    }

    // Check role permission
    if (routeOwnerRole === "USER" || routeOwnerRole === "ADMIN") {
      if (userRole && routeOwnerRole !== userRole) {
        const defaultDashboardRoute = getDefaultDashboardRoute(userRole);
        const url = new URL(defaultDashboardRoute, request.url);

        return NextResponse.redirect(url);
      }
    }

    // Allow request if all checks pass
    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy middleware:", error);
    return NextResponse.next();
  }
}

export const config = {
  // Exclude API routes, Next.js internals, and all static files (e.g. .png, .css, .js)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
