import { useEffect, useState } from "react";

export function useMockListFetch(fetchList: () => Promise<unknown>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    void fetchList().finally(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fetchList]);

  return isLoading;
}
