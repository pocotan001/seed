import React from "react";
import { MediaQuery } from "../styles/enums";

export interface Media {
  matches: boolean;
}

const useMedia = (query: MediaQuery): Media => {
  const [matches, setMatches] = React.useState(
    window.matchMedia(query).matches
  );

  React.useEffect(
    () => {
      const queryList = window.matchMedia(query);

      const handleMatchesChange = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
      };

      if (matches !== queryList.matches) {
        setMatches(queryList.matches);
      }

      queryList.addEventListener("change", handleMatchesChange);
      setMatches(queryList.matches);

      return () => {
        queryList.removeEventListener("change", handleMatchesChange);
      };
    },
    [query]
  );

  return {
    matches
  };
};

export default useMedia;
