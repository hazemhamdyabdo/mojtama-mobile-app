import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ServiceRole } from "@/features/service/types";

const USER_ROLE_STORAGE_KEY = "@mojtama/user-role";

export function mapAuthRoleToServiceRole(
  role?: string | null,
): ServiceRole | null {
  switch (role) {
    case "manager":
      return "admin";
    case "resident":
      return "resident";
    default:
      return null;
  }
}

export async function getStoredUserRole(): Promise<ServiceRole | null> {
  const storedRole = await AsyncStorage.getItem(USER_ROLE_STORAGE_KEY);

  if (storedRole === "admin" || storedRole === "resident") {
    return storedRole;
  }

  return null;
}

export async function saveUserRole(role: ServiceRole): Promise<void> {
  await AsyncStorage.setItem(USER_ROLE_STORAGE_KEY, role);
}

export async function clearUserRole(): Promise<void> {
  await AsyncStorage.removeItem(USER_ROLE_STORAGE_KEY);
}
