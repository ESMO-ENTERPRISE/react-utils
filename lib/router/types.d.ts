export type RouteMatch = {
    /** Hash string including `#` prefix if non-empty. */
    readonly hash: '' | `#${string}`;
    /** True if the matched pattern contained path parameters. */
    readonly isParameterized: boolean;
    /** True if the matched pattern ended with a wildcard. */
    readonly isPrefix: boolean;
    /** Path parameter value map. */
    readonly params: Readonly<Record<string, string | undefined>>;
    /** Matched full path, including a wildcard part. */
    readonly path: `/${string}`;
    /** Matched prefix path, excluding a wildcard part. */
    readonly pathPrefix: `/${string}`;
    /** Matched pattern, including a wildcard. */
    readonly pattern: `/${string}`;
    /** Matched pattern, excluding a wildcard. */
    readonly patternPrefix: `/${string}`;
    /** Search (query) string including `?` prefix if non-empty. */
    readonly search: '' | `?${string}`;
    /** History state data (JSON serializable). */
    readonly state: {} | null;
};
export type RouterAction = {
    readonly href?: string;
    readonly replace?: boolean;
    readonly state?: {} | null;
} | {
    readonly delta: number;
};
export type RouterLocation = {
    readonly hash: '' | `#${string}`;
    readonly href: `${'http' | 'https'}://${string}`;
    readonly path: `/${string}`;
    readonly search: '' | `?${string}`;
    readonly state: {} | null;
};
export type Router = {
    readonly go: (action?: RouterAction | number | string) => void;
    readonly isPushed: boolean;
    readonly location: RouterLocation;
    readonly subscribe: (subscriber: () => void) => () => void;
};
export type LiteWindow = {
    readonly addEventListener: (event: 'popstate', listener: () => void, options?: {
        capture?: boolean;
    }) => void;
    readonly history: {
        readonly go: (delta: number) => void;
        readonly length: number;
        readonly pushState: (state: {} | null, unused: '', url: URL) => void;
        readonly replaceState: (state: {} | null, unused: '', url: URL) => void;
        readonly state: {} | null;
    };
    readonly location: {
        readonly assign: (url: URL) => void;
        readonly href: string;
        replace: (url: URL) => void;
    };
    readonly removeEventListener: (event: 'popstate', listener: () => void, options?: {
        capture?: boolean;
    }) => void;
    readonly scrollTo: (options: {
        behavior: ScrollBehavior;
        left: 0;
        top: 0;
    }) => void;
};
export type Match = {
    readonly isParameterized: boolean;
    readonly isPrefix: boolean;
    readonly params: Readonly<Record<string, string | undefined>>;
    readonly path: `/${string}`;
    readonly pathPrefix: `/${string}`;
    readonly pattern: `/${string}`;
    readonly patternPrefix: `/${string}`;
};
export type Matcher = (path: string) => Match | null;
