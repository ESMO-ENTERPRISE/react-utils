import {Matcher} from "./types";

const createOneMatcher = (pattern: `/${string}`): Matcher => {
  let isParameterized = false;
  let isPrefix = false;

  const names: string[] = [];
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

    const params: Record<string, string | undefined> = {};

    match.slice(1).forEach((value, i) => (params[names[i] as string] = value));

    return {
      isParameterized,
      isPrefix,
      params,
      path: match[0] as `/${string}`,
      pathPrefix: match[0].slice(0, match[0].length - (params['*']?.length ?? 0)) as `/${string}`,
      pattern: pattern as `/${string}`,
      patternPrefix: pattern.replace(/\/\*$/u, '/') as `/${string}`,
    };
  };
};

const createMatcher = (pattern: `/${string}`[]): Matcher => {
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

export { createMatcher };
