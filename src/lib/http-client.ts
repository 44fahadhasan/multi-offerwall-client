import { IApiResponse } from "@/types";
import axios, { AxiosRequestConfig, Method } from "axios";
import { cookies } from "next/headers";
import { env } from "../../env";
import { tokenUtils } from "../utils/token-util";

interface IRequestOptions extends AxiosRequestConfig {
  isProtected?: boolean;
}

const createAxiosInstance = async (isProtected = true) => {
  const headers: AxiosRequestConfig["headers"] = {};

  if (isProtected) {
    const { accessToken, refreshToken } = await tokenUtils.getTokens();

    // Refresh token if needed
    if (accessToken && refreshToken) {
      await tokenUtils.tryRefreshTokenFromHttpClient(accessToken, refreshToken);
    }

    // Attach Authorization header
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // Forward cookies
    const cookieStore = await cookies();
    headers["Cookie"] = cookieStore.toString();
  }

  return axios.create({
    baseURL: env.API_BASE_URL,
    timeout: 15000, // 15 seconds
    headers,
  });
};

const request = async <T>(
  method: Method,
  endpoint: string,
  data?: unknown,
  options?: IRequestOptions,
): Promise<IApiResponse<T>> => {
  const { isProtected = true, ...axiosOptions } = options || {};

  const instance = await createAxiosInstance(isProtected);

  const response = await instance.request<IApiResponse<T>>({
    url: endpoint,
    method,
    data,
    ...axiosOptions,
  });

  return response.data;
};

export const httpClient = {
  get: <T>(endpoint: string, options?: IRequestOptions) =>
    request<T>("GET", endpoint, undefined, options),

  post: <T>(endpoint: string, data?: unknown, options?: IRequestOptions) =>
    request<T>("POST", endpoint, data, options),

  put: <T>(endpoint: string, data?: unknown, options?: IRequestOptions) =>
    request<T>("PUT", endpoint, data, options),

  patch: <T>(endpoint: string, data?: unknown, options?: IRequestOptions) =>
    request<T>("PATCH", endpoint, data, options),

  delete: <T>(endpoint: string, options?: IRequestOptions) =>
    request<T>("DELETE", endpoint, undefined, options),
};
