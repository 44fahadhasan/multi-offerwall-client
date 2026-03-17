"use server";

import { signInSchema } from "@/components/modules/sign-in/sign-in.form.schema";
import { signUpSchema } from "@/components/modules/sign-up/sign-up.form.schema";
import { TOKEN_CONFIG } from "@/constants/token.const";
import { authService } from "@/services/auth-service";
import { cookieUtils } from "@/utils/cookie-util";
import { routeRulesUtil } from "@/utils/route-rules-util";
import { tokenUtils } from "@/utils/token-util";
import { validatePayload } from "@/utils/validation-util";
import { redirect } from "next/navigation";

const {
  ACCESS_TOKEN_NAME,
  ACCESS_TOKEN_AGE,
  REFRESH_TOKEN_NAME,
  REFRESH_TOKEN_AGE,
} = TOKEN_CONFIG;

export async function signInUser(
  payload: Record<string, unknown>,
  redirectPath?: string,
) {
  const result = validatePayload(payload, signInSchema);
  if (!result.success) return result;

  const response = await authService.signInUser(result.data);

  if (response.success && response.data) {
    const { accessToken, refreshToken, user } = response.data;

    await tokenUtils.setTokenIntoCookie(
      ACCESS_TOKEN_NAME,
      accessToken,
      ACCESS_TOKEN_AGE,
    );

    await tokenUtils.setTokenIntoCookie(
      REFRESH_TOKEN_NAME,
      refreshToken,
      REFRESH_TOKEN_AGE,
    );

    const { isValidRedirectForRole, getDefaultDashboardRoute } = routeRulesUtil;

    const targetedPath =
      redirectPath && isValidRedirectForRole(redirectPath, user.role)
        ? redirectPath
        : getDefaultDashboardRoute(user.role);

    redirect(targetedPath);
  }

  return response;
}

export async function signUpUser(payload: Record<string, unknown>) {
  const result = validatePayload(payload, signUpSchema);
  if (!result.success) return result;

  const response = await authService.signUpUser(result.data);

  if (response.success && response.data) {
    const { accessToken, refreshToken } = response.data;

    await tokenUtils.setTokenIntoCookie(
      ACCESS_TOKEN_NAME,
      accessToken,
      ACCESS_TOKEN_AGE,
    );

    await tokenUtils.setTokenIntoCookie(
      REFRESH_TOKEN_NAME,
      refreshToken,
      REFRESH_TOKEN_AGE,
    );
  }

  return response;
}

export async function getUserInfo() {
  const res = await authService.getUserInfo();
  return res;
}

export async function tokenRefresh(refreshToken: string) {
  const response = await authService.tokenRefresh(refreshToken);

  if (response.success && response.data) {
    const { accessToken, refreshToken } = response.data;

    await tokenUtils.setTokenIntoCookie(
      ACCESS_TOKEN_NAME,
      accessToken,
      ACCESS_TOKEN_AGE,
    );

    await tokenUtils.setTokenIntoCookie(
      REFRESH_TOKEN_NAME,
      refreshToken,
      REFRESH_TOKEN_AGE,
    );
  }

  console.log("🔄 [Auth] Token refresh successful", response);

  return response;
}

export async function singOutUser() {
  const res = await authService.singOutUser();

  if (res.success) {
    const { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } = TOKEN_CONFIG;

    await cookieUtils.deleteCookie(ACCESS_TOKEN_NAME);
    await cookieUtils.deleteCookie(REFRESH_TOKEN_NAME);
  }

  return res;
}
