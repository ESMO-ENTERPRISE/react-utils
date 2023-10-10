import { createContext } from "react";
export const routerInitialState = {
    url: window.location.pathname,
    hash: window.location.hash,
    action: 'initNavigation'
};
const routerContext = createContext({
    state: routerInitialState,
    matchedRoutes: [],
    navigate: () => undefined,
    params: []
});
const { Provider, Consumer } = routerContext;
export { Provider as EsmoRouterProvider, Consumer as EsmoRouterConsumer, routerContext as EsmoRouterContext };
