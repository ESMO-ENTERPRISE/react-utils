"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoute = void 0;
const react_1 = require("react");
const create_matcher_1 = require("./create-matcher");
const use_json_memo_1 = require("./use-json-memo");
const use_location_1 = require("./use-location");
const use_route_match_1 = require("./use-route-match");
const useRoute = (pathPattern = []) => {
    const { state, path, search, hash } = (0, use_location_1.useLocation)();
    const patternPrefix = (0, use_route_match_1.useRouteMatch)()?.patternPrefix ?? '/';
    const patterns = (0, use_json_memo_1.useJsonMemo)((Array.isArray(pathPattern) ? pathPattern : [pathPattern ?? '*']).map((pattern) => {
        return pattern.startsWith('/') ? pattern : `${patternPrefix}${pattern}`;
    }));
    const matcher = (0, react_1.useMemo)(() => (0, create_matcher_1.createMatcher)(patterns), [patterns]);
    const match = (0, react_1.useMemo)(() => matcher(path), [matcher, path]);
    return (0, react_1.useMemo)(() => match && { ...match, hash, search, state }, [match, state, search, hash]);
};
exports.useRoute = useRoute;
