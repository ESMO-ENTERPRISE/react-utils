import { useMemo } from 'react';
import { createMatcher } from './create-matcher';
import { useJsonMemo } from './use-json-memo';
import { useLocation } from './use-location';
import { useRouteMatch } from './use-route-match';
const useRoute = (pathPattern = []) => {
    const { state, path, search, hash } = useLocation();
    const patternPrefix = useRouteMatch()?.patternPrefix ?? '/';
    const patterns = useJsonMemo((Array.isArray(pathPattern) ? pathPattern : [pathPattern ?? '*']).map((pattern) => {
        return pattern.startsWith('/') ? pattern : `${patternPrefix}${pattern}`;
    }));
    const matcher = useMemo(() => createMatcher(patterns), [patterns]);
    const match = useMemo(() => matcher(path), [matcher, path]);
    return useMemo(() => match && { ...match, hash, search, state }, [match, state, search, hash]);
};
export { useRoute };
