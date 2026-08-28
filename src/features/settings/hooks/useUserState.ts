import { useEffect, useState } from "react";
import {
  getUserState,
  subscribeToUser,
} from "@/features/settings/store/userState";

export function useUserState() {
  const [user, setUser] = useState(getUserState());

  useEffect(() => {
    return subscribeToUser(() => {
      setUser(getUserState());
    });
  }, []);

  return user;
}
