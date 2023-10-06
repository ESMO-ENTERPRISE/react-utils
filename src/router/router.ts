import { Fragment, createElement, memo, useCallback, useContext, useEffect, useState } from "react";

import { EsmoRouterEvents } from "./events";
import { MatchedRoute, NavigationActionType, RouteSettings, RouterType, RoutesType, UseNavigation } from "./types";
import { matchRoutes } from "./utils";
import { EsmoRouterContext, EsmoRouterProvider, routerInitialState } from "./context";

const routerEvents = new EsmoRouterEvents();

function createEsmoRouter(settings: RouteSettings): [RouterType, RoutesType] {
    const Router = memo(function Router({ children }: { children: React.ReactNode }) {
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
            const onPopState = (event: PopStateEvent) => {
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

        const handleRouteChange = useCallback(
            (url: string, hash: string = '', state: unknown = {}, action: NavigationActionType) => {
                const matchedRoutes = matchRoutes(settings.routes, url);
                const params = matchedRoutes.reduce(
                    (_params, route) => ({ ..._params, ...route.params }),
                    {}
                );
                setRouterState(routerState => ({
                    state: { ...routerState.state, url, hash, routeState: state, action },
                    matchedRoutes,
                    params
                }));
            },
            [settings.routes]
        );

        const navigate = useCallback(
            (url: string, state?: unknown) => {
                handleRouteChange(url, undefined, state, 'navigate')
                window.history.pushState(state, '', url)
            },
            [handleRouteChange]
        );

        return createElement(
            EsmoRouterProvider,
            {
                value: {
                    state: routerState.state,
                    navigate,
                    matchedRoutes: routerState.matchedRoutes,
                    params: routerState.params,
                },
            },
            [children]
        );
    })

    const RouterView = memo(function Routes({ children }: { children?: React.ReactNode }) {
        const context = useContext(EsmoRouterContext)
        if (!context || !context.navigate) {
            throw new Error('The <Routes>-component needs to be wrapped inside a <Router>-component')
        }

        const HAS_MATCHES = context.matchedRoutes.length > 0
        const childrenToRender = HAS_MATCHES
            ? createElements(context.matchedRoutes)
            : createElement(settings.fallback, { key: 'fallback' })

        return createElement(Fragment, null, [children, childrenToRender])
    })

    return [Router, RouterView]
}

function createElements(matchedRoutes: MatchedRoute[]) {
    return matchedRoutes.map((route, idx) =>
        createElement(route.component, {
            key: idx,
        }),
    );
}

function useEsmoNavigation<PropsType = any, StateType = any>(): UseNavigation<PropsType, StateType> {
    const context = useContext(EsmoRouterContext);
    if (!context || !context.navigate) {
        throw new Error(
            'In order to use useNavigation, the component needs to be a child to the <Router>-component'
        );
    }

    return {
        navigate: context.navigate,
        state: context.state,
        params: context.params,
    }
}

export { createEsmoRouter, useEsmoNavigation, routerEvents }