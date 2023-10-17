"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatcher = void 0;
const createOneMatcher = (pattern) => {
    let isParameterized = false;
    let isPrefix = false;
    const names = [];
    const expression = pattern.replace(/:(\w+)|\/([*])$|[|\\{}()[\]^$+*?.]|-/gu, (match, name, wildcard) => {
        if (name) {
            isParameterized = true;
            names.push(name);
            return '([^/]*?)';
        }
        if (wildcard) {
            isPrefix = true;
            names.push('*');
            return '/(.*)';
        }
        return `\\${match === '-' ? 'x2d' : match}`;
    });
    const rx = new RegExp('^' + expression + '$', 'u');
    return (path) => {
        const match = path.match(rx);
        if (!match) {
            return null;
        }
        const params = {};
        match.slice(1).forEach((value, i) => (params[names[i]] = value));
        return {
            isParameterized,
            isPrefix,
            params,
            path: match[0],
            pathPrefix: match[0].slice(0, match[0].length - (params['*']?.length ?? 0)),
            pattern: pattern,
            patternPrefix: pattern.replace(/\/\*$/u, '/'),
        };
    };
};
const createMatcher = (pattern) => {
    const matchers = pattern.map(createOneMatcher);
    return (path) => {
        for (const matcher of matchers) {
            const result = matcher(path);
            if (result) {
                return result;
            }
        }
        return null;
    };
};
exports.createMatcher = createMatcher;
