import { useEffect, useMemo, useState } from "react";
import type { Fort } from "@/data/forts";
import { fetchForts } from "@/data/forts";

export function useForts() {
  const [forts, setForts] = useState<Fort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchForts()
      .then((data) => {
        if (mounted) setForts(data);
      })
      .catch((e) => setError(e?.message ?? "Failed to load forts"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { forts, loading, error };
}

export function useFort(slug?: string) {
  const { forts, loading, error } = useForts();
  const fort = useMemo(() => forts.find((f) => f.slug === slug), [forts, slug]);
  return { fort, loading, error };
}
