---
sidebar_position: 17
---

# Custom Logger

```jsx
import * as Sentry from '@sentry/react';
import { createQuery } from '@esmo/react-utils';

const usePokemonsQuery = createQuery(getPokemons, {
  onError: (error, { key }) => {
    Sentry.captureException(error);

    // Or, if we want to capture final error (after all retries performed)
    // const { isGoingToRetry, isGoingToRetryNextPage } = usePokemonsQuery.get(key);
    // if (!isGoingToRetry && !isGoingToRetryNextPage) Sentry.captureException(error);
  },
});
```

## Set Globally

```jsx
import * as Sentry from '@sentry/react';
import { createQuery as createQueryOriginal } from '@esmo/react-utils';

export const createQuery = (queryFn, options = {}) => {
  return createQueryOriginal(queryFn, {
    ...options,
    onError: (error, state) => {
      Sentry.captureException(error);
      options.onError?.(error, state);
    },
  });
};
```