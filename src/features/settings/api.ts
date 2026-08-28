import { MOCK_VALID_OTP } from "@/features/auth/api";
import {
  getSettingsProfile,
  getUserState,
  updateUserEmail,
  updateUserName,
  updateUserPhone,
} from "@/features/settings/store/userState";
import type { UpdateNameFormValues } from "@/features/settings/schemas/updateNameSchema";
import type { UpdateEmailFormValues } from "@/features/settings/schemas/updateEmailSchema";
import type { SettingsProfile } from "@/features/settings/types";
import type { UserProfile } from "@/features/profile/types";
import { MockApiError, mockDelay } from "@/utils/mockApi";

export async function getMe(): Promise<UserProfile> {
  await mockDelay(200);
  return getUserState();
}

export async function getSettingsProfileData(): Promise<SettingsProfile> {
  await mockDelay(200);
  return getSettingsProfile();
}

export async function updateName(
  values: UpdateNameFormValues,
): Promise<UserProfile> {
  await mockDelay();
  return updateUserName(values.name);
}

export async function requestEmailUpdateOtp(email: string): Promise<void> {
  await mockDelay();

  if (!email.trim()) {
    throw new MockApiError("Email is required", 400);
  }
}

export async function verifyEmailUpdateOtp(otp: string): Promise<void> {
  await mockDelay();

  if (otp !== MOCK_VALID_OTP) {
    throw new MockApiError("Invalid OTP code", 400);
  }
}

export async function updateEmail(
  values: UpdateEmailFormValues,
): Promise<UserProfile> {
  await mockDelay();
  return updateUserEmail(values.email);
}

export async function requestPhoneUpdateOtp(phone: string): Promise<void> {
  await mockDelay();

  if (!phone.trim()) {
    throw new MockApiError("Phone is required", 400);
  }
}

export async function verifyPhoneUpdateOtp(otp: string): Promise<void> {
  await mockDelay();

  if (otp !== MOCK_VALID_OTP) {
    throw new MockApiError("Invalid OTP code", 400);
  }
}

export async function updatePhone(phoneE164: string): Promise<UserProfile> {
  await mockDelay();
  return updateUserPhone(phoneE164);
}

export async function requestSettingsOtp(): Promise<void> {
  await mockDelay();
}

export async function verifySettingsOtp(otp: string): Promise<void> {
  await mockDelay();

  if (otp !== MOCK_VALID_OTP) {
    throw new MockApiError("Invalid OTP code", 400);
  }
}
