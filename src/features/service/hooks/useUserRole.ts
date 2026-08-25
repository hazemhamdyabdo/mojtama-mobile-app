import { getStoredUserRole } from "@/features/service/storage/userRole";
import type { ServiceRole } from "@/features/service/types";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useUserRole(defaultRole: ServiceRole = "admin") {
  const [role, setRole] = useState<ServiceRole>(defaultRole);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadRole() {
        const storedRole = await getStoredUserRole();

        if (isActive) {
          setRole(storedRole ?? defaultRole);
          setIsLoading(false);
        }
      }

      void loadRole();

      return () => {
        isActive = false;
      };
    }, [defaultRole]),
  );

  return { role, isLoading };
}
