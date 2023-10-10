---
sidebar_position: 9
---

# API

## createStore

```ts
const useStore = createStore<T>(initializer, {
  defaultDeps,
  intercept,
  onFirstSubscribe,
  onSubscribe,
  onUnsubscribe,
  onLastUnsubscribe,
});

// Inside component or custom hook
const state = useStore(selectDeps);
```

**Parameters**

<div className="[&_ul]:text-sm">

- `initializer` A function that returns an initial state
- `options?` (_optional_)
  - `defaultDeps` Set default reactivity ([learn more](/docs/store/introduction#set-default-reactivity))
  - `intercept` Intercept set state
  - `onFirstSubscribe` Handle first subscribe event
  - `onSubscribe` Handle subscribe event
  - `onUnsubscribe` Handle unsubscribe event
  - `onLastUnsubscribe` Handle last unsubscribe event

</div>

**Return Value**

<div className="[&_ul_ul]:text-sm">

- `useStore()`

  - **Parameters** (_optional_)
    - `selectDeps` Customize when to re-render
  - **Return Value**
    - `state`

- **Methods**
  - `useStore.get` Get state
  - `useStore.set` Set state
  - `useStore.subscribe` Subscribe the store state
  - `useStore.getSubscribers` Get store subscribers
  - `useStore.setDefaultValues` Set default/initial values from inside a component (must be called inside component before it gets any subscribers)
  - `useStore.Watch` A helper component that will watch the state changes ([learn more](/docs/store/watch-component))

</div>

## createStores

```ts
const useStores = createStores<TKey, T>(initializer, {
  ...options, // Same as createStore options
  hashKeyFn,
  onBeforeChangeKey,
  onStoreInitialized,
});

// Inside component or custom hook
const state = useStores(storeKey, selectDeps);
const state = useStores(selectDeps);
```

**Parameters**

<div className="[&_ul]:text-sm">

- `initializer` A function that returns an initial single store state
- `options?` (_optional_)
  - `hashKeyFn" href="stores/introduction#store-key" /> Custom function to transform the store key (object) into a hash string ([learn more](/docs/stores/introduction#store-key))
  - `onBeforeChangeKey" href="stores/stores-event" /> Handle change key passed to the hook
  - `onStoreInitialized" href="stores/stores-event" /> Handle single store state initialized event
  - _... same as `useStore`'s_

</div>

**Return Value**

<div className="[&_ul_ul]:text-sm">

- `useStores()`

  - **Parameters** (_optional_)
    - `storeKey` Choose which store state will be used ([learn more](/docs/stores/introduction#store-key))
    - `selectDeps` Customize when to re-render
  - **Return Value**
    - `state`

- **Methods**
  - `useStores.get` Get state of specific store (specific store key)
  - `useStores.getAll` Get all stores state
  - `useStores.getAllWithSubscriber` Get all stores state that has subscriber
  - `useStores.set` Set state of specific store (specific store key)
  - `useStores.setAll` Set all stores state
  - `useStores.subscribe` Subscribe to a store state
  - `useStores.getSubscribers` Get subscribers of a store state
  - `useStores.getStore` Get a store
  - `useStores.getStores` Get all stores
  - `useStores.setDefaultValues` Set default/initial values from inside a component (must be called inside component before it gets any subscribers)
  - `useStores.Watch` A helper component that will watch the state changes ([learn more](/docs/store/watch-component))

</div>

## createQuery

```ts
const useQuery = createQuery<TKey, TResponse, TData, TError>(queryFn, {
  ...options, // Same as createStores options
  select,
  staleTime,
  cacheTime,
  fetchOnMount,
  fetchOnWindowFocus,
  enabled,
  retry,
  retryDelay,
  keepPreviousData,
  getNextPageParam,
  refetchInterval,
  onSuccess,
  onError,
  onSettled,
});

// Inside component or custom hook
const state = useQuery(storeKey, selectDeps);
const state = useQuery(selectDeps);
```

**Parameters**

<div className="[&_ul]:text-sm">

- `queryFn`
- `options?` (_optional_)
  - `select` Transform or select a portion of the raw response
  - `staleTime` Determine how long a response is categorized as fresh, defaults to 3 seconds
  - `cacheTime` Determine how long the query data should be stored in memory, defaults to 5 minutes
  - `fetchOnMount` Should we fetch/refetch when the component mounted?
  - `fetchOnWindowFocus` Should we fetch/refetch when a window focus event triggered?
  - `fetchOnReconnect` Should we fetch/refetch when a window online event triggered?
  - `enabled` Should we fetch/refetch for any reason?
  - `retry` Maximum error retry count ([learn more](/docs/query/error-retries))
  - `retryDelay` Error retry delay in milliseconds
  - `keepPreviousData` Return the previous key's data until the current key's fetching finished
  - `getNextPageParam` Determine the value that should be used when getting next page
  - `refetchInterval` Auto refetching / polling interval ([learn more](/docs/query/polling))
  - `onSuccess` Triggered after fetch, refetch, & fetch next/prev page succeed
  - `onError` Triggered after fetch, refetch, & fetch next/prev page failed
  - `onSettled` Triggered after fetch, refetch, & fetch next/prev page (both succeed or failed)
  - _... same as `useStores`'s_

</div>

**Return Value**

<div className="[&_ul_ul]:text-sm">

- `useQuery()`

  - **Parameters** (_optional_)
    - `storeKey` Choose which query store state will be used ([learn more](/docs/stores/introduction#store-key))
    - `selectDeps` Customize when to re-render
  - **Return Value**
    - `state`

- **Methods**
  - `useQuery.setInitialResponse` Set default/initial response from inside a component (must be called inside component before it gets any subscribers)
  - `useQuery.reset` Reset query to empty state for all query keys
  - `useQuery.resetSpecificKey` Reset a specific query to empty state
  - `useQuery.invalidate` Invalidate query for all query keys ([learn more](/docs/query/query-invalidation))
  - `useQuery.invalidateSpecificKey` Invalidate a specific query
  - `useQuery.optimisticUpdate` Optimistic update ([learn more](/docs/query/optimistic-update))
  - `useQuery.suspend` Use query with suspense mode ([learn more](/docs/query/suspense))
  - _... same as `useStores`'s_

</div>

## createMutation

```ts
const useMutation = createMutation<T>(initializer, {
  ...options, // Same as createStore options
  onMutate,
  onSuccess,
  onError,
  onSettled,
});

// Inside component or custom hook
const state = useMutation(selectDeps);
```

**Parameters**

<div className="[&_ul]:text-sm">

- `mutationFn`
- `options?` (_optional_)
  - `onMutate` Handle mutate event (right after the mutation function fired)
  - `onSuccess` Handle success event (promise resolved)
  - `onError` Handle error event (promise rejected)
  - `onSettled` Handle success or error event
  - _... same as `useStore`'s_

</div>

**Return Value**

<div className="[&_ul_ul]:text-sm">

- `useMutation()`

  - **Parameters** (_optional_)
    - `selectDeps` Customize when to re-render
  - **Return Value**
    - `state`

- **Methods**
  - _... same as `useStore`'s_

</div>