"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerEvents = exports.useEsmoNavigation = exports.createEsmoRouter = void 0;
const react_1 = require("react");
const events_1 = require("./events");
const utils_1 = require("./utils");
const context_1 = require("./context");
const routerEvents = new events_1.EsmoRouterEvents();
exports.routerEvents = routerEvents;
function createEsmoRouter(settings) {
    const Router = (0, react_1.memo)(function Router({ children }) {
        const [routerState, setRouterState] = (0, react_1.useState)(() => {
            const state = context_1.routerInitialState;
            const matchedRoutes = (0, utils_1.matchRoutes)(settings.routes, state.url);
            const params = matchedRoutes.reduce((_params, route) => ({ ..._params, ...route.params }), {});
            return {
                state,
                matchedRoutes,
                params,
            };
        });
        (0, react_1.useEffect)(() => {
            const onPopState = (event) => {
                handleRouteChange(window.location.pathname, window.location.hash, event.state, 'historyPop');
            };
            window.addEventListener('popstate', onPopState);
            return () => window.removeEventListener('popstate', onPopState);
        }, []);
        (0, react_1.useEffect)(() => {
            if (routerState.state.action === 'navigate') {
                window.scrollTo(0, 0);
            }
            routerEvents.dispatch({ ...routerState.state, params: routerState.params });
        }, [routerState.state.url]);
        const handleRouteChange = (0, react_1.useCallback)((url, hash = '', state = {}, action) => {
            const matchedRoutes = (0, utils_1.matchRoutes)(settings.routes, url);
            const params = matchedRoutes.reduce((_params, route) => ({ ..._params, ...route.params }), {});
            setRouterState(routerState => ({
                state: { ...routerState.state, url, hash, routeState: state, action },
                matchedRoutes,
                params
            }));
        }, [settings.routes]);
        const navigate = (0, react_1.useCallback)((url, state) => {
            handleRouteChange(url, undefined, state, 'navigate');
            window.history.pushState(state, '', url);
        }, [handleRouteChange]);
        return (0, react_1.createElement)(context_1.EsmoRouterProvider, {
            value: {
                state: routerState.state,
                navigate,
                matchedRoutes: routerState.matchedRoutes,
                params: routerState.params,
            },
        }, [children]);
    });
    const RouterView = (0, react_1.memo)(function Routes({ children }) {
        const context = (0, react_1.useContext)(context_1.EsmoRouterContext);
        if (!context || !context.navigate) {
            throw new Error('The <Routes>-component needs to be wrapped inside a <Router>-component');
        }
        const HAS_MATCHES = context.matchedRoutes.length > 0;
        const childrenToRender = HAS_MATCHES
            ? createElements(context.matchedRoutes)
            : (0, react_1.createElement)(settings.fallback, { key: 'fallback' });
        return (0, react_1.createElement)(react_1.Fragment, null, [children, childrenToRender]);
    });
    return [Router, RouterView];
}
exports.createEsmoRouter = createEsmoRouter;
function createElements(matchedRoutes) {
    return matchedRoutes.map((route, idx) => (0, react_1.createElement)(route.component, {
        key: idx,
    }));
}
function useEsmoNavigation() {
    const context = (0, react_1.useContext)(context_1.EsmoRouterContext);
    if (!context || !context.navigate) {
        throw new Error('In order to use useNavigation, the component needs to be a child to the <Router>-component');
    }
    return {
        navigate: context.navigate,
        state: context.state,
        params: context.params,
    };
}
exports.useEsmoNavigation = useEsmoNavigation;
