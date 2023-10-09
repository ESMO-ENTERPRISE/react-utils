"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchRoutes = void 0;
const path_to_regexp_1 = require("path-to-regexp");
function matchRoutes(routes, url) {
    const decode = createDecodeRoute(url);
    return routes
        .map(decode)
        .filter(onlyMatched)
        .map(addParams);
}
exports.matchRoutes = matchRoutes;
function decodePath(path, exact = false, url) {
    const keys = [];
    const re = (0, path_to_regexp_1.pathToRegexp)(path, keys, { end: exact });
    const match = re.exec(url);
    return { match, keys };
}
function createDecodeRoute(url) {
    return (route) => {
        const { component, path, exact } = route;
        const { match, keys } = decodePath(path, exact, url);
        return {
            component,
            match,
            keys,
        };
    };
}
function onlyMatched(route) {
    return route.match;
}
function getParams(keys, values) {
    return keys.reduce((res, key, index) => {
        res[key.name] = values[index];
        return res;
    }, {});
}
function addParams(route) {
    const { component, match, keys } = route;
    const values = match.slice(1);
    const params = getParams(keys, values);
    return {
        component,
        match,
        params,
    };
}
