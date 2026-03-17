import { httpClient } from "@/lib/http-client";
import { IUserInfo } from "@/types";
import {
  ISignInResponse,
  ISignUpResponse,
  ITokenRefreshResponse,
} from "@/types/auth-type";
import { errorResponse } from "@/utils/response-util";
import { tokenUtils } from "@/utils/token-util";

export const authService = {
  signInUser: async (payload: Record<string, unknown>) => {
    try {
      const response = await httpClient.post<ISignInResponse>(
        "/auth/login",
        payload,
        { isProtected: false },
      );

      return response;
    } catch (error) {
      return errorResponse(error);
    }
  },

  signUpUser: async (payload: Record<string, unknown>) => {
    try {
      const response = await httpClient.post<ISignUpResponse>(
        "/auth/register",
        payload,
        { isProtected: false },
      );

      return response;
    } catch (error) {
      return errorResponse(error);
    }
  },

  getUserInfo: async () => {
    try {
      const response = await httpClient.get<IUserInfo>("/auth/me");
      return response;
    } catch (error) {
      return errorResponse(error);
    }
  },

  tokenRefresh: async (refreshToken: string) => {
    try {
      const response = await httpClient.post<ITokenRefreshResponse>(
        "/auth/refresh",
        {
          refreshToken: refreshToken,
        },
        {
          isProtected: false,
        },
      );
      return response;
    } catch (error) {
      return errorResponse(error);
    }
  },

  singOutUser: async () => {
    try {
      const { refreshToken } = await tokenUtils.getTokens();

      const response = await httpClient.post<null>("/auth/logout", {
        refreshToken: refreshToken,
      });
      return response;
    } catch (error) {
      return errorResponse(error);
    }
  },
};
