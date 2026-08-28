import {
  clearMockSession,
  saveMockSession,
} from "@/features/auth/storage/mockSession";
import type {
  AuthSession,
  AuthUser,
  AuthUserRole,
  LoginResponse,
  LoginWithEmailRequest,
  RequestOtpRequest,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from "@/features/auth/types";
import {
  clearUserRole,
  mapAuthRoleToServiceRole,
  saveUserRole,
} from "@/features/service/storage/userRole";
import { syncUserFromAuth } from "@/features/settings/store/userState";
import { resetAllMockStores } from "@/utils/resetMockStores";
import { MockApiError, mockDelay } from "@/utils/mockApi";

/** Valid OTP for TestFlight QA — any other 5-digit code fails. */
export const MOCK_VALID_OTP = "12345";

const MOCK_INVALID_LOGIN_EMAIL = "invalid@mojtama.test";
const MOCK_VALID_PASSWORD = "12345678";

function resolveAuthRole(role?: AuthUserRole): AuthUserRole {
  return role ?? "resident";
}

function buildMockUser(
  email: string,
  role: AuthUserRole,
  name = "Omar Essam",
): AuthUser {
  return {
    id: "user-1",
    name,
    email,
    role,
  };
}

async function persistAuthSession(
  user: AuthUser,
  accessToken: string,
): Promise<AuthSession> {
  const serviceRole = mapAuthRoleToServiceRole(user.role);

  if (!serviceRole) {
    throw new MockApiError("Invalid user role", 400);
  }

  const session: AuthSession = {
    accessToken,
    user,
    serviceRole,
  };

  await saveMockSession(session);
  await saveUserRole(serviceRole);
  syncUserFromAuth(user);

  return session;
}

export async function loginWithEmail(
  request: LoginWithEmailRequest,
): Promise<LoginResponse> {
  await mockDelay();

  if (
    request.email.toLowerCase() === MOCK_INVALID_LOGIN_EMAIL ||
    request.password !== MOCK_VALID_PASSWORD
  ) {
    throw new MockApiError("Invalid email or password", 401);
  }

  const role = resolveAuthRole(request.role);
  const user = buildMockUser(request.email, role);
  const accessToken = `mock-token-${Date.now()}`;

  await persistAuthSession(user, accessToken);

  return { user, accessToken };
}

export async function requestOtp(_request: RequestOtpRequest): Promise<void> {
  await mockDelay();
}

export async function verifyOtp(
  request: VerifyOtpRequest,
): Promise<LoginResponse> {
  await mockDelay();

  if (request.otp !== MOCK_VALID_OTP) {
    throw new MockApiError("Invalid OTP code", 400);
  }

  const role = resolveAuthRole(request.role);
  const email = `${request.phone.replace(/\D/g, "")}@phone.mojtama.test`;
  const user = buildMockUser(email, role);
  const accessToken = `mock-token-${Date.now()}`;

  await persistAuthSession(user, accessToken);

  return { user, accessToken };
}

export async function requestPasswordReset(
  request: RequestPasswordResetRequest,
): Promise<void> {
  await mockDelay();

  if (!request.email.trim()) {
    throw new MockApiError("Email is required", 400);
  }
}

export async function resetPassword(
  request: ResetPasswordRequest,
): Promise<void> {
  await mockDelay();

  if (!request.email.trim()) {
    throw new MockApiError("Email is required", 400);
  }

  if (request.password.length < 8) {
    throw new MockApiError("Password must be at least 8 characters", 400);
  }
}

export async function logout(): Promise<void> {
  await mockDelay(200);
  await clearMockSession();
  await clearUserRole();
  resetAllMockStores();
}
