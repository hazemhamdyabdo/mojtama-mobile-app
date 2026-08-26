import {
  getRequestsState,
  subscribeToRequests,
} from "@/features/requests/store/requestState";
import { useEffect, useState } from "react";

export function useRequestsState() {
  const [requests, setRequests] = useState(getRequestsState());

  useEffect(() => {
    return subscribeToRequests(() => {
      setRequests(getRequestsState());
    });
  }, []);

  return requests;
}
