"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouteMatch = void 0;
const react_1 = require("react");
const route_match_context_1 = require("./route-match-context");
const useRouteMatch = () => {
    return (0, react_1.useContext)(route_match_context_1.RouteMatchContext);
};
exports.useRouteMatch = useRouteMatch;
