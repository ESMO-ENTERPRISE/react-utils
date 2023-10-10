---
sidebar_position: 2
---

# Single Query

## Creating the Store/Hook

```tsx
import { createQuery } from '@esmo/react-utils';

const useGitHubQuery = createQuery(
  async () => {
    const res = await fetch('https://api.github.com/repos/ESMO-ENTERPRISE/react-utils');
    const resJson = await res.json();
    if (res.ok) return resJson;
    throw resJson;
  }
);
```

```tsx
import { createQuery } from '@esmo/react-utils';

type RepoDetailResponse = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
};
const useGitHubQuery = createQuery<undefined, RepoDetailResponse>(
  //                               ^store key
  async () => {
    const res = await fetch('https://api.github.com/repos/ESMO-ENTERPRISE/react-utils');
    const resJson = await res.json();
    if (res.ok) return resJson;
    throw resJson;
  }
);
```

## Using Query Hook Inside a Component

```tsx
function SingleQuery() {
  const { isLoading, data } = useGitHubQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>⭐️ {data.stargazers_count}</strong>
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
```

## Options

```tsx
const useGitHubQuery = createQuery(
  async () => {
    const res = await fetch('https://api.github.com/repos/ESMO-ENTERPRISE/react-utils');
    const resJson = await res.json();
    if (res.ok) return resJson;
    throw resJson;
  },
  {
    fetchOnMount: false,
    enabled: () => !!useUserQuery.get().data?.user,
    select: (response) => response.name,
    staleTime: Infinity, // Never stale
    retry: 0, // No retry
    onSuccess: (response) => {},
    onError: (error) => {},
    onSettled: () => {},

    // ... same as createStores options
  },
);
```

💡
See full options on [/docs/api#createQuery](/docs/api#createQuery)

## Actions

Normally, we don't need reactivity for the actions.
Therefore, using `get` method will be better, since it will not re-render the component when a query state changed.

```tsx {2}
function Actions() {
  const { fetch, forceFetch, reset } = useGitHubQuery.get();

  // Or like this if we need reactivity:
  // const { isLoading, data, error, fetch, forceFetch, reset } = useGitHubQuery();

  return (
    <>
      <button onClick={fetch}>Call query if the query data is stale</button>
      <button onClick={forceFetch}>Call query</button>
      <button onClick={reset}>Reset query</button>
    </>
  );
}
```