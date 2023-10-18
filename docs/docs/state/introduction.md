---
sidebar_position: 1
---

# Introduction

Client side data fetching and callback-based state management library. Library's syntaxes and functionalities are very similar to and inspired by `react-query` library. Queries make network requests and cache the results along with the `queryKey`.

## Features

- auto caching
- data are in sync across multiple Hooks.
- ability to combine the same multiple network requests (determined by `queryKey`) into a single one.
- ability to avoid race conditions.
- reducing the number of render times as much as possible.
- freshness of data are guaranteed (depends on passed `options` object).
- can also be used to share global state as it has been built using callbacks and guarantee to re-render only affected components.


## Response Vs Data

```tsx
const { isSuccess, data, response } = useMyQuery();
```

The `response` represents the untouched response returned from the async function.
On the other hand, the `data` represents the customized selection of the response obtained using the `select` option.
If we didn't define the `select` option, `data` will be equal to `response`.

## Getting started

> Note: before you start using Hooks, you need to wrap your components with`QueryProvider`, which is a context provider for all Hooks. You should put `QueryProvider` on top of all your components. For example :

```jsx
export default function App(props) {
  return <QueryProvider>{/* your components */}</QueryProvider>;
}
```

Now you can start using Hooks provided by the library!

```jsx
const fetchPets = (context) => {
  return fetch("url").then((res) => res.json());
};

export const Pets = (props) => {
  const queryInstance = useQuery(["pets"], fetchPets);

  return <div>{/* some jsx elements */}</div>;
};
```