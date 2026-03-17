import { USER_ROLE, USER_STATUS } from "@/constants/user.const";

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TUserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export interface IUser {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  role: TUserRole;
  status: TUserStatus;
  balance: number;
  totalEarned: number;
  totalWithdrawn: number;
  referralCode: string;
  referredById: string | null;
  adminNote: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IUserInfo {
  userId: string;
  email: string;
  role: TUserRole;
}

export interface GetMyProfileResponse {
  id: string;
  email: string;
  name: string;
  imageUrl: string | null;
  role: TUserRole;
  status: TUserStatus;
  balance: number;
  totalEarned: number;
  totalWithdrawn: number;
  referralCode: string;
  createdAt: string;
  _count: UserCounts;
}

export interface UserCounts {
  referrals: number;
  clicks: number;
  conversions: number;
}
