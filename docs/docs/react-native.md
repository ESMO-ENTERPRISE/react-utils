---
sidebar_position: 9
---

# React Native

We can use React-utils in React Native too.
Currently, the only thing needs to be handled is the focus refetching mechanism.
In React Native, there is no such "window" focus event.
Threfore, we need to disable the `fetchOnWindowFocus`.
To trigger refetch when a screen is focused, we can use `useFocusEffect` hook.

```jsx
import { useFocusEffect } from '@react-navigation/native';

const useProductsQuery = createQuery(getProducts, {
  fetchOnWindowFocus: false,
});
const refetchProductQuery = useProductsQuery.get().fetch;

function Profile({ userId }) {
  useFocusEffect(
    refetchProductQuery
  );

  ...
}
```

## Set Globally

If we want to modify the default `fetchOnWindowFocus` option, we can just create our own `createQuery` function like this:

```jsx
import { createQuery as createQueryOriginal } from '@esmo/react-utils';

export const createQuery = (queryFn, options = {}) => {
  return createQueryOriginal(queryFn, {
    ...options,
    fetchOnWindowFocus: false,
  });
};
```

```tsx
import {
  CreateQueryOptions,
  QueryState,
  StoreKey,
  createQuery as createQueryOriginal,
} from '@esmo/react-utils';

export const createQuery = <
  TKey extends StoreKey = StoreKey,
  TResponse = any,
  TData = TResponse,
  TError = unknown,
>(
  queryFn: (key: TKey, state: QueryState<TKey, TResponse, TData, TError>) => Promise<TResponse>,
  options: Omit<CreateQueryOptions<TKey, TResponse, TData, TError>, 'fetchOnWindowFocus'> = {},
) => {
  return createQueryOriginal(queryFn, {
    ...options,
    fetchOnWindowFocus: false,
  });
};
```