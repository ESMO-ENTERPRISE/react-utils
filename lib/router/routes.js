"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const react_1 = require("react");
const create_matcher_1 = require("./create-matcher");
const use_json_memo_1 = require("./use-json-memo");
const route_1 = require("./route");
const route_match_context_1 = require("./route-match-context");
const use_location_1 = require("./use-location");
const use_route_match_1 = require("./use-route-match");
const isRoute = (child) => {
    return (0, react_1.isValidElement)(child) && child.type === route_1.Route;
};
const Routes = ({ children } = {}) => {
    const { state, path, search, hash } = (0, use_location_1.useLocation)();
    const patternPrefix = (0, use_route_match_1.useRouteMatch)()?.patternPrefix ?? '/';
    const childArray = react_1.Children.toArray(children);
    const patterns = (0, use_json_memo_1.useJsonMemo)(childArray.map((child) => {
        return isRoute(child)
            ? (Array.isArray(child.props.path) ? child.props.path : [child.props.path ?? '*']).map((routePath) => routePath.startsWith('/') ? routePath : `${patternPrefix}${routePath}`)
            : null;
    }));
    const matchers = (0, react_1.useMemo)(() => {
        return patterns.map((pattern) => pattern && (0, create_matcher_1.createMatcher)(pattern));
    }, [patterns]);
    const [match, index] = (0, react_1.useMemo)(() => {
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
    const routeMatch = (0, react_1.useMemo)(() => {
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
                    (0, react_1.createElement)(route_match_context_1.RouteMatchContext.Provider, { key: child.key, value: routeMatch }, [child.props.children]),
                    // <RouteMatchContext.Provider key={child.key} value={routeMatch}>
                    //   {child.props.children}
                    // </RouteMatchContext.Provider>,
                ]
                : []
            : [child];
    });
};
exports.Routes = Routes;
