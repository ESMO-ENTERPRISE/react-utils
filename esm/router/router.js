import { Fragment, createElement, memo, useCallback, useContext, useEffect, useState } from "react";
import { RouterEvents } from "./events";
import { matchRoutes } from "./utils";
import { RouterContext, RouterProvider, routerInitialState } from "./context";
const routerEvents = new RouterEvents();
function createRouter(settings) {
    const Router = memo(function Router({ children }) {
        const [routerState, setRouterState] = useState(() => {
            const state = routerInitialState;
            const matchedRoutes = matchRoutes(settings.routes, state.url);
            const params = matchedRoutes.reduce((_params, route) => ({ ..._params, ...route.params }), {});
            return {
                state,
                matchedRoutes,
                params,
            };
        });
        useEffect(() => {
            const onPopState = (event) => {
                handleRouteChange(window.location.pathname, window.location.hash, event.state, 'historyPop');
            };
            window.addEventListener('popstate', onPopState);
            return () => window.removeEventListener('popstate', onPopState);
        }, []);
        useEffect(() => {
            if (routerState.state.action === 'navigate') {
                window.scrollTo(0, 0);
            }
            routerEvents.dispatch({ ...routerState.state, params: routerState.params });
        }, [routerState.state.url]);
        const handleRouteChange = useCallback((url, hash = '', state = {}, action) => {
            const matchedRoutes = matchRoutes(settings.routes, url);
            const params = matchedRoutes.reduce((_params, route) => ({ ..._params, ...route.params }), {});
            setRouterState(routerState => ({
                state: { ...routerState.state, url, hash, routeState: state, action },
                matchedRoutes,
                params
            }));
        }, [settings.routes]);
        const navigate = useCallback((url, state) => {
            handleRouteChange(url, undefined, state, 'navigate');
            window.history.pushState(state, '', url);
        }, [handleRouteChange]);
        return createElement(RouterProvider, {
            value: {
                state: routerState.state,
                navigate,
                matchedRoutes: routerState.matchedRoutes,
                params: routerState.params,
            },
        }, [children]);
    });
    const RouterView = memo(function Routes({ children }) {
        const context = useContext(RouterContext);
        if (!context || !context.navigate) {
            throw new Error('The <Routes>-component needs to be wrapped inside a <Router>-component');
        }
        const HAS_MATCHES = context.matchedRoutes.length > 0;
        const childrenToRender = HAS_MATCHES
            ? createElements(context.matchedRoutes)
            : createElement(settings.fallback, { key: 'fallback' });
        return createElement(Fragment, null, [children, childrenToRender]);
    });
    return [Router, RouterView];
}
function createElements(matchedRoutes) {
    return matchedRoutes.map((route, idx) => createElement(route.component, {
        key: idx,
    }));
}
function useNavigation() {
    const context = useContext(RouterContext);
    if (!context || !context.navigate) {
        throw new Error('In order to use useNavigation, the component needs to be a child to the <Router>-component');
    }
    return {
        navigate: context.navigate,
        state: context.state,
        params: context.params,
    };
}
export { createRouter, useNavigation, routerEvents };
