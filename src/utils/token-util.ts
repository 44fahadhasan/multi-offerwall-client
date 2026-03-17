import { tokenRefresh } from "@/actions/auth-actions";
import { TOKEN_CONFIG } from "@/constants/token.const";
import { headers } from "next/headers";
import { env } from "../../env";
import { cookieUtils } from "./cookie-util";
import { jwtUtils } from "./jwt-util";

const { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } = TOKEN_CONFIG;

async function tryRefreshTokenFromProxy(
  refreshToken: string,
): Promise<boolean> {
  try {
    const { success } = await tokenRefresh(refreshToken);

    console.debug("🔄 [Auth] tryRefreshTokenFromProxy executed", {
      success,
    });

    return success;
  } catch (error) {
    console.error("Error refreshing token in middleware:", error);
    return false;
  }
}

const tryRefreshTokenFromHttpClient = async (
  accessToken: string,
  refreshToken: string,
) => {
  try {
    const headerName = TOKEN_CONFIG.TOKEN_REFRESHED_HEADER;

    const isAccessTokenExpSoon = tokenUtils.isTokenExpiringSoon(accessToken);
    if (!isAccessTokenExpSoon) return;

    const requestHeader = await headers();
    const isTokenRefreshed = requestHeader.get(headerName) === "1";
    if (!isTokenRefreshed) return;

    const { success } = await tokenRefresh(refreshToken);

    console.debug("🔄 [Auth] tryRefreshTokenFromHttpClient executed", {
      success,
    });
  } catch (error) {
    console.error("Error refreshing token in http client:", error);
  }
};

const getRemainingSecondsOfToken = (token: string): number => {
  try {
    if (!token) return 0;

    const tokenPayload = jwtUtils.decodeToken(token);
    if (!tokenPayload.exp) return 0;

    const currentSeconds = Math.floor(Date.now() / 1000);
    const remainingSeconds = tokenPayload.exp - currentSeconds;

    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0;
  }
};

const isTokenExpiringSoon = (token: string, thresholdSeconds = 300) => {
  const remainingSeconds = getRemainingSecondsOfToken(token);

  return remainingSeconds > 0 && remainingSeconds <= thresholdSeconds;
};

const isTokenExpired = (token: string) => {
  const remainingSeconds = getRemainingSecondsOfToken(token);

  return remainingSeconds === 0;
};

const setTokenIntoCookie = async (
  name: string,
  token: string,
  maxAgeInSeconds: number,
) => {
  await cookieUtils.setCookie(name, token, maxAgeInSeconds);
};

const getTokens = async () => {
  const accessToken = await cookieUtils.getCookie(ACCESS_TOKEN_NAME);
  const refreshToken = await cookieUtils.getCookie(REFRESH_TOKEN_NAME);

  return { accessToken, refreshToken };
};

const getAccessTokenInfo = (token?: string) => {
  const { success, data } = token
    ? jwtUtils.verifyToken(token, env.ACCESS_TOKEN_SECRET)
    : {};

  return { decoded: data, isValid: success };
};

export const tokenUtils = {
  getTokens,
  isTokenExpired,
  getAccessTokenInfo,
  setTokenIntoCookie,
  isTokenExpiringSoon,
  tryRefreshTokenFromProxy,
  tryRefreshTokenFromHttpClient,
};
