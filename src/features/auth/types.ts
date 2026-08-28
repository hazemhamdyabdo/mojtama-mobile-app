import type { ServiceRole } from "@/features/service/types";

export type AuthUserRole = "resident" | "manager";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AuthUserRole;
};

export type AuthSession = {
  accessToken: string;
  user: AuthUser;
  serviceRole: ServiceRole;
};

export type LoginWithEmailRequest = {
  email: string;
  password: string;
  role?: AuthUserRole;
};

export type LoginResponse = {
  user: AuthUser;
  accessToken: string;
};

export type RequestOtpRequest = {
  phone: string;
};

export type VerifyOtpRequest = {
  phone: string;
  otp: string;
  role?: AuthUserRole;
};

export type RequestPasswordResetRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  email: string;
  password: string;
};
