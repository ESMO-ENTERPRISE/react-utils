import { Children, isValidElement, useMemo, createElement } from 'react';
import { createMatcher } from './create-matcher';
import { useJsonMemo } from './use-json-memo';
import { Route } from './route';
import { RouteMatchContext } from './route-match-context';
import { useLocation } from './use-location';
import { useRouteMatch } from './use-route-match';
const isRoute = (child) => {
    return isValidElement(child) && child.type === Route;
};
const Routes = ({ children } = {}) => {
    const { state, path, search, hash } = useLocation();
    const patternPrefix = useRouteMatch()?.patternPrefix ?? '/';
    const childArray = Children.toArray(children);
    const patterns = useJsonMemo(childArray.map((child) => {
        return isRoute(child)
            ? (Array.isArray(child.props.path) ? child.props.path : [child.props.path ?? '*']).map((routePath) => routePath.startsWith('/') ? routePath : `${patternPrefix}${routePath}`)
            : null;
    }));
    const matchers = useMemo(() => {
        return patterns.map((pattern) => pattern && createMatcher(pattern));
    }, [patterns]);
    const [match, index] = useMemo(() => {
        for (let i = 0; i < matchers.length; ++i) {
            const matcher = matchers[i];
            if (!matcher) {
                continue;
            }
            const match0 = matcher(path);
            if (match0) {
                return [match0, i];
            }
        }
        return [null, -1];
    }, [matchers, path]);
    const routeMatch = useMemo(() => {
        return match && { ...match, hash, search, state };
    }, [match, hash, state, search]);
    // return (
    //   <>
    //     {childArray.map((child, i): ReactNode => {
    //       return isRoute(child)
    //         ? i === index
    //           ? [
    //               <RouteMatchContext.Provider key={child.key} value={routeMatch}>
    //                 {child.props.children}
    //               </RouteMatchContext.Provider>,
    //             ]
    //           : []
    //         : [child];
    //     })}
    //   </>
    // );
    return childArray.map((child, i) => {
        return isRoute(child)
            ? i === index
                ? [
                    createElement(RouteMatchContext.Provider, { key: child.key, value: routeMatch }, [child.props.children]),
                    // <RouteMatchContext.Provider key={child.key} value={routeMatch}>
                    //   {child.props.children}
                    // </RouteMatchContext.Provider>,
                ]
                : []
            : [child];
    });
};
export { Routes };
