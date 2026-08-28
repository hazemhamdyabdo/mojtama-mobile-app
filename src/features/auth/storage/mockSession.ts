import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AuthSession } from "@/features/auth/types";

export const MOCK_SESSION_STORAGE_KEY = "@mojtama/mock-session";

export async function getMockSession(): Promise<AuthSession | null> {
  const raw = await AsyncStorage.getItem(MOCK_SESSION_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export async function saveMockSession(session: AuthSession): Promise<void> {
  await AsyncStorage.setItem(MOCK_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export async function clearMockSession(): Promise<void> {
  await AsyncStorage.removeItem(MOCK_SESSION_STORAGE_KEY);
}

function isValidSession(session: AuthSession | null): session is AuthSession {
  return (
    session !== null &&
    typeof session.accessToken === "string" &&
    session.accessToken.length > 0 &&
    typeof session.user?.id === "string" &&
    session.user.id.length > 0
  );
}

export async function hasValidMockSession(): Promise<boolean> {
  const session = await getMockSession();

  if (!isValidSession(session)) {
    if (session !== null) {
      await clearMockSession();
    }
    return false;
  }

  return true;
}
