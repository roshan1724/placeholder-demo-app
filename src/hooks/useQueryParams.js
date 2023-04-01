// A custom hook that builds on useLocation to parse

import React from "react";
import { useLocation } from "react-router-dom";

// the query string for you.
function useQueryParams() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default useQueryParams;
