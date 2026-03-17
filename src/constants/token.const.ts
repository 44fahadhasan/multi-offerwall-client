export const TOKEN_CONFIG = {
  ACCESS_TOKEN_NAME: "accessToken",
  REFRESH_TOKEN_NAME: "refreshToken",
  ACCESS_TOKEN_AGE: 15 * 60, // 15 minutes
  REFRESH_TOKEN_AGE: 7 * 24 * 60 * 60, // 7 days
  TOKEN_REFRESHED_HEADER: "X-Token-Refreshed",
} as const;
