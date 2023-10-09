"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EsmoRouterContext = exports.EsmoRouterConsumer = exports.EsmoRouterProvider = exports.routerInitialState = void 0;
const react_1 = require("react");
exports.routerInitialState = {
    url: window.location.pathname,
    hash: window.location.hash,
    action: 'initNavigation'
};
const routerContext = (0, react_1.createContext)({
    state: exports.routerInitialState,
    matchedRoutes: [],
    navigate: () => undefined,
    params: []
});
exports.EsmoRouterContext = routerContext;
const { Provider, Consumer } = routerContext;
exports.EsmoRouterProvider = Provider;
exports.EsmoRouterConsumer = Consumer;
