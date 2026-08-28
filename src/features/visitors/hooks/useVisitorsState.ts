import { useEffect, useState } from "react";
import {
  getVisitorsState,
  subscribeToVisitors,
} from "@/features/visitors/store/visitorState";

export function useVisitorsState() {
  const [visitors, setVisitors] = useState(getVisitorsState());

  useEffect(() => {
    return subscribeToVisitors(() => {
      setVisitors(getVisitorsState());
    });
  }, []);

  return visitors;
}
