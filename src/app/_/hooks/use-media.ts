import { useCallback, useEffect, useState } from "react";
import { Entries } from "type-fest";
import { media as mediaToken } from "~/app/_/styles/theme/tokens";

type Key = keyof typeof mediaToken;
type MediaMatches = Record<Key, boolean>;

const initialMatches = Object.fromEntries(
  Object.keys(mediaToken).map((key) => [key, false])
) as MediaMatches;

export const useMedia = (): MediaMatches => {
  const [matches, setMatches] = useState<MediaMatches>(initialMatches);

  const subscribe = useCallback((key: Key, query: string): (() => void) => {
    const mql = window.matchMedia(query);

    const handleChange: Parameters<typeof mql.addEventListener<"change">>[1] = (
      ev
    ) => {
      setMatches((prev) => ({ ...prev, [key]: ev.matches }));
    };

    setMatches((prev) => ({ ...prev, [key]: mql.matches }));
    mql.addEventListener("change", handleChange);

    return () => {
      mql.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const unsubscribes = (
      Object.entries(mediaToken) as Entries<typeof mediaToken>
    ).map(([key, query]) => subscribe(key, query));

    return () => {
      for (const unsubscribe of unsubscribes) {
        unsubscribe();
      }
    };
  }, [subscribe]);

  return matches;
};
