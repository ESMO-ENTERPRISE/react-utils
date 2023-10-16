import {useMemo} from 'react';

import {createMatcher} from './create-matcher';
import {useJsonMemo} from './use-json-memo';
import {useLocation} from './use-location';
import {useRouteMatch} from './use-route-match';
import {RouteMatch} from "./types";

const useRoute = (pathPattern: string[] | string = []): RouteMatch | null => {
  const { state, path, search, hash } = useLocation();
  const patternPrefix = useRouteMatch()?.patternPrefix ?? '/';
  const patterns = useJsonMemo(
    (Array.isArray(pathPattern) ? pathPattern : [pathPattern ?? '*']).map((pattern): `/${string}` => {
      return pattern.startsWith('/') ? (pattern as `/${string}`) : `${patternPrefix}${pattern}`;
    }),
  );
  const matcher = useMemo(() => createMatcher(patterns), [patterns]);
  const match = useMemo(() => matcher(path), [matcher, path]);
  return useMemo<RouteMatch | null>(
      () => match && {...match, hash, search, state},
      [match, state, search, hash],
  );
};

export { useRoute };
