import { PROFILE_USER } from "@/features/profile/constants/dummy";
import type { SettingsProfile } from "@/features/settings/types";
import type { UserProfile } from "@/features/profile/types";
import type { AuthUser } from "@/features/auth/types";

export type SessionUser = UserProfile & {
  id: string;
};

const dummyAvatar = PROFILE_USER.avatar;

function createInitialUserState(): SessionUser {
  return {
    id: "user-1",
    name: PROFILE_USER.name,
    status: PROFILE_USER.status,
    avatar: dummyAvatar,
    phone: PROFILE_USER.phone,
    email: PROFILE_USER.email,
    units: [...PROFILE_USER.units],
  };
}

let userState: SessionUser = createInitialUserState();

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getUserState(): SessionUser {
  return userState;
}

export function getSettingsProfile(): SettingsProfile {
  return {
    name: userState.name,
    status: userState.status,
    avatar:
      typeof userState.avatar === "number"
        ? userState.avatar
        : require("@/features/home/constants/dummy-avatar.jpg"),
    units: userState.units,
  };
}

export function updateUserName(name: string): SessionUser {
  userState = { ...userState, name };
  notifyListeners();
  return userState;
}

export function updateUserEmail(email: string): SessionUser {
  userState = { ...userState, email };
  notifyListeners();
  return userState;
}

export function updateUserPhone(phone: string): SessionUser {
  userState = { ...userState, phone };
  notifyListeners();
  return userState;
}

export function syncUserFromAuth(user: AuthUser): SessionUser {
  userState = {
    ...userState,
    id: user.id,
    name: user.name,
    email: user.email,
  };
  notifyListeners();
  return userState;
}

export function resetUserState(): void {
  userState = createInitialUserState();
  notifyListeners();
}

export function subscribeToUser(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}
