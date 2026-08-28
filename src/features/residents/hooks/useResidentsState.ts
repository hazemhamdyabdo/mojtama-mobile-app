import { useEffect, useState } from "react";
import {
  getResidentsState,
  subscribeToResidents,
} from "@/features/residents/store/residentState";

export function useResidentsState() {
  const [residents, setResidents] = useState(getResidentsState());

  useEffect(() => {
    return subscribeToResidents(() => {
      setResidents(getResidentsState());
    });
  }, []);

  return residents;
}
