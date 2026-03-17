"use server";

import { httpClient } from "@/lib/http-client";
import { GetMyProfileResponse } from "@/types";
import { errorResponse } from "@/utils/response-util";

export const getMyProfile = async () => {
  try {
    const response = await httpClient.get<GetMyProfileResponse>("/users/me");
    return response;
  } catch (error) {
    return errorResponse(error);
  }
};
