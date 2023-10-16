---
sidebar_position: 4
---

# Match data

The `useRoute` and `useRouteMatch` hooks return the following data.

```tsx
type RouteMatch = {
  /** True if the matched pattern contained path parameters. */
  readonly isParameterized: boolean;
  /** True if the matched pattern ended with a wildcard. */
  readonly isPrefix: boolean;
  /** Matched pattern, including a wildcard. */
  readonly pattern: string;
  /** Matched pattern, excluding a wildcard. */
  readonly patternPrefix: string;
  /** Matched full path, including a wildcard part. */
  readonly path: `/${string}`;
  /** Matched prefix path, excluding a wildcard part. */
  readonly pathPrefix: `/${string}`;
  /** Path parameter value map. */
  readonly params: Readonly<Record<string, string | undefined>>;
  /** Search (query) string including `?` prefix if non-empty. */
  readonly search: '' | `?${string}`;
  /** Hash string including `#` prefix if non-empty. */
  readonly hash: '' | `#${string}`;
  /** History state data (JSON serializable). */
  readonly state: {} | null;
};
```