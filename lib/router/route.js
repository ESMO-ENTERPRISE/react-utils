"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const react_1 = require("react");
const route_match_context_1 = require("./route-match-context");
const use_route_1 = require("./use-route");
const Route = ({ path = '/*', children } = {}) => {
    const match = (0, use_route_1.useRoute)(path);
    // return match ? <RouteMatchContext.Provider value={match}>{children}</RouteMatchContext.Provider> : null;
    return match ? (0, react_1.createElement)(route_match_context_1.RouteMatchContext.Provider, { value: match }, [children]) : null;
};
exports.Route = Route;
