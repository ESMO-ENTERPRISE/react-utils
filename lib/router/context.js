"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterContext = exports.RouterConsumer = exports.RouterProvider = exports.routerInitialState = void 0;
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
exports.RouterContext = routerContext;
const { Provider, Consumer } = routerContext;
exports.RouterProvider = Provider;
exports.RouterConsumer = Consumer;
