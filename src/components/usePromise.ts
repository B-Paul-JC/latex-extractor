// usePromise.ts
import { useState, useEffect } from "react";

export const usePromise = <T,>(
  promiseFn: () => Promise<T>,
  dependencies: any[] = []
): { data: T | null; loading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const execute = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await promiseFn();
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("An error occurred"));
          setLoading(false);
        }
      }
    };

    execute();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error };
};
