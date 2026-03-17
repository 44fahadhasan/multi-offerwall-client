import { IUser } from "./user-type";

export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ITokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ISignUpResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
