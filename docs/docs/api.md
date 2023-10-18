---
sidebar_position: 10
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
  - `hashKeyFn` Custom function to transform the store key (object) into a hash string ([learn more](/docs/store/introduction#store-key))
  - `onBeforeChangeKey` Handle change key passed to the hook
  - `onStoreInitialized` Handle single store state initialized event
  - _... same as `useStore`'s_

</div>

**Return Value**

<div className="[&_ul_ul]:text-sm">

- `useStores()`

  - **Parameters** (_optional_)
    - `storeKey` Choose which store state will be used ([learn more](/docs/store/introduction#store-key))
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

## QueryProvider

`QueryProvider` is a context provider for all components in which they are using library's Hooks. Hooks that were not passed any `options` by library users, will gains the default `options` from this provider.

`QueryProvider` accepts only two props called `options` and `children`. `options` accepts only `object` type. For example :

```jsx
<QueryProvider options={{...}}>
```

##### `options`'s properties

| Name                       | Type      | Default                  | Description                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------------- | --------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cacheTime`                | `number`  | `1000 * 60 * 5` (5 mins) | Set the cache time duration in milliseconds. If it has elapsed, the state data will then be set with empty data while the data is being fetched when the component mounts or on `queryKey` changes.                                                                                                                                                                                                          |
| `staleTime`                | `number`  | `1000 * 10` (10 secs)    | Set the stale time duration in milliseconds. This will be used to determine whether the data is stale or not. When `staleTime` has elapsed, the component will be notified that the data is stale, i.e the component will be re-rendered. If the `staleTime` doesn't elapse yet, fresh data that was caused by new network request of other Hooks with the same `queryKey` won't be set to the current Hook. |
| `keepCacheAlways`          | `boolean` | `false`                  | If set to `true`, the state data will always get from cache when initializing state. It takes precedence over `cacheTime`.                                                                                                                                                                                                                                                                                       |
| `keepValueOnKeyChanges`    | `boolean` | `true`                   | When the `queryKey` changes, the data with previous key will always be shown. This is useful if we want users to see the screen with previous data until the data for the next screen is ready.                                                                                                                                                                                                              |
| `dataStayInSync`           | `boolean` | `true`                   | Use to determine whether the hook want to stay in sync when the data was changed (due to new network request) with the same `queryKey`.                                                                                                                                                                                                                                                                      |
| `autoFetchEnabled`         | `boolean` | `true`                   | Set to `false` if you want to manually fetch data. Typically use in dependent queries by toggling this property.                                                                                                                                                                                                                                                                                                 |
| `refetchOnWindowFocus`     | `boolean` | `true`                   | Set to `false` unless you want to fetch data when gains focus again after losing it. This can ensure that the app receives fresh data.                                                                                                                                                                                                                                                                           |
| `markUpdatesAsTransitions` | `boolean` | `false`                  | Mark state updates as transition, i.e wrap state setter functions within the `startTransition` function. If the state update is not critical to the immediate rendering or user experience, you can consider setting to `true`.                                                                                                                                                                                  |
| `offsetBottom`             | `number`  | `0`                      | Set any value that can be converted to number. This option is useful when you want to fetch data before the scroll position reaches the bottom. Use with `useExperimentalInfiniteScrollDataQuery` Hook.                                                                                                                                                                                                          |

### TypeScript

```tsx
// Type parameter `T` for the shape of returned `data`
useQuery<T>(queryKey, fetcher?, options?)

// `MutatorInput` defines the shape of the argument passed to `mutate` and `onMutate` callback's parameter
// `ReturnedData` defines the shape of the returned data
// `Context` defines the shape of callbacks's parameter `onSuccess`, `onError`, and `onSettled`. `onMutate` callback should return the promise that resolve `Context` data type.
useMutation<MutatorInput, ReturnedData, Context>(mutator, callbacks?)

// Type parameter `T` for the shape of returned `data`. You DON'T NEED to define array type. Just need to define the shape of each item.
// For example, if you pass Color type argument, it will return like Color[][]
useInfiniteQuery<T>(queryKey, fetcher, options);

// Same as `useInfiniteQuery` Hook.
useExperimentalInfiniteScrollQuery<T>(
  dqueryKey,
  fetcher,
  containerRef,
  options
);
```

## useQuery

**Parameters**

- `queryKey` - can be any type. Better avoid falsy values. This helps to keep the query in queue and cache. When this value changed, the new data has to be initialized, i.e the new network request will be initiated. You don't need to worry about network request duplications as the library will internally handle it.
- `fetcher` - the function who initiates network request. Must return promise that will be resolved by the result of network request completion. For example:

```js
const fetcher = (context) => fetch('url`).then(res => res.json());
```

> `context` is an object that contains `queryKey` and `param` properties. `param` can be of any type that is passed as the argument of `refetch` function returned by `useQuery`.
> Note also that you should not try to catch network related error in `fetcher` function. `useQuery` will notify you whenever the error occurs.

- `options` - to override the `options` received from `QueryProvider`. You can also pass callback functions such as `onSuccess`, `onError`, `onSettled`, and `onMutated`.

  - `initialData` - initial data to return. It will be cached silently i.e other Hooks with same `queryKey` will not be notified when it is being cached. Please note that if the data with the same `queryKey` already exists in the cache, that cached data will return instead of `initialData`.
  - `onSuccess(data)` - which will be invoked when network request successfully completed.
  - `onError(reason)` - which will be invoked when network related error has occurred. All `onError` callbacks passed to library Hooks will not automatically be invoked on Server Error (HTTP statuses like `404`, `500`). You must explicitly throw it in your fetcher function.

  ```js
  fetch(...).then(res => {
    if(!res.ok) throw new Error(...)
    return res.json();
  })
  ```

  - `onSettled(data, reason)` - which will be invoked whether or not succeeded or failed`.
  - `onMutated(data)` - which will be invoked when you invoke `setQueryData` and `setQueriesData` functions returned from `useQueryMagic` Hook.

**Return Value**

| Name           | Type       | Description                                                                                                                                                                                                                                                                                              |
| -------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `queryKey`     | `any`      | the first argument of `useQuery` Hook                                                                                                                                                                                                                                                                    |
| `data`         | `any`      | the value that resolved to the returned Promise of your fetcher function                                                                                                                                                                                                                                 |
| `error`        | `any`      | The reason why error occurred                                                                                                                                                                                                                                                                            |
| `isLoading`    | `boolean`  | Indicating whether the data is being fetched. `true` for only first time network request. But if you have disabled `keepValueOnKeyChanges`, this will be set to true if there is no cache for new `queryKey`.                                                                                            |
| `isFetching`   | `boolean`  | Indicating whether the data is being fetched. This will always be `true` on every network requests.                                                                                                                                                                                                      |
| `isSuccess`    | `boolean`  | Indicating whether the data is successfully fetched.                                                                                                                                                                                                                                                     |
| `isError`      | `boolean`  | Indicating whether the network related error has occurred.                                                                                                                                                                                                                                               |
| `isStale`      | `boolean`  | Indicating whether the data becomes stale or not. The component will be re-rendered when the data becomes stale.                                                                                                                                                                                         |
| `refetch`      | `function` | A function to manually fetch data. When you call this function, the new network request will be initiated only if there is no already ongoing request with the same `queryKey`. When the data becomes available, the Hook will be notified with new data and update the `data` state with that new data. |
| `forceRefetch` | `function` | Unlike `refetch` function, this will cancel ongoing network request with the same `queryKey` and initiate the new network request.                                                                                                                                                                       |

> Cancelling network request doesn't actually cancel the request. It is just protecting from race conditions. However, future releases will actually cancel the network request by using `AbortController`.

## useMutation
**Parameters**

- `mutator` - a function to mutate remote data

**Return Value**

| Name         | Type           | Description                                                                                                                                                                                     |
| ------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`       | any \| `null`  | Data that represents mutated data                                                                                                                                                               |
| `error`      | `Error` object | The reason why error occurred                                                                                                                                                                   |
| `isMutating` | `boolean`      | Indicating whether data is mutating                                                                                                                                                             |
| `isSuccess`  | `boolean`      | Indicating whether remote data is successfully mutated                                                                                                                                          |
| `isError`    | `boolean`      | Indicating whether the error has occurred                                                                                                                                                       |
| `mutate`     | `function`     | It accepts one argument. When you call this function, it invokes `mutator` function with its argument. Before actual mutation, it invokes `onMutate` callback function first with its argument. |

## useInfiniteQuery

**Parameters**

- `queryKey` - same as `useQuery`.
- `fetcher` - function who initiate network request.
```jsx
const fetcher = (context) => {
  // extract pageParam from param
  const { pageParam } = context.param;
  return fetch(`https://...${pageParam}`).then((res) => res.json());
};
```
- `options` - to override default `options` received from `QueryProvider`. `autoFetchEnabled` and `refetchOnWindowFocus` are disabled. You can't modify it. There are another two properties you need to pass. They are callback function : `getNextPageParam` and `getPrevPageParam`. `onSuccess`, `onError` and `onSettled` are optional.
- `getNextPageParam(lastPage, pages) ` - This function will be used to determine `pageParam` for the next page and for the `hasNextPage` status. Return `undefined` if there is no more pages. Don't rely on the number of invoked times as it will generally be invoked three times for one page. Will fix it in future releases.
- `getPrevPageParam(firstPage, pages)` - This function will be used to determine `pageParam` for the previous page and for the `hasPrevPage` status. Return `undefined` if there is no more pages. Don't rely on the number of invoked times as it will generally be invoked three times for one page. Will fix it in future releases.
- `onReset(fetchPage`) - Will be invoked when you invoke `reset` function returned from `useInfiniteQuery`. Read more about `fetchPage` function below.

**Return value**

**Return**

| Name | Type | Description |
| ---- | --- | -- |
| `data` | `array` | an array of array that represent pages |
| `error` | `Error` | reason why error has occurred. |
| `isFetching` | `boolean` |Indicating whether the data is being fetched. This will always be `true` on every network requests. |
| `isLoading` | `boolean` | Indicating whether the data is being fetched. `true` for only first time network request. But if you have disabled `keepValueOnKeyChanges`, this will be set to true if there is no cache for new `queryKey`.|
| `isFetchingNextPage` | `boolean`| Indicating whether the data for the next page is being fetched. |
| `isFetchingPrevPage` | `boolean` |Indicating whether the data for the previous page is being fetched. |
| `hasNextPage` | `boolean` | Indicating whether the data for the next page exists.|
| `hasPrevPage` | `boolean` | Indicating whether the data for the previous page exists. |
| `isError` | `boolean` | Indicating whether the network related error has occurred. |
| `fetchPage` | `function` | Fetch specific page. It accepts one argument that will be passed as the `pageParam` property of `param` object which is the property of `context` object received in`fetcher` function.<br /><br />If you invoke `fetchPage` function like this: <br/> `fetchPage(2);`<br/><br/> Your fetcher function will received it via `pageParam` property : <br/> `const fetcher = ({param: { pageParam }) => {}` |
| `fetchNextPage` | `function` | Fetch next page. Your `fetcher` function will received `pageParam` via `getNextPageParam` callback function which is passed as the property of `options` object. |
| `fetchPrevPage` | `function` | Fetch previous page. Your `fetcher` function will received `pageParam` via `getPrevPageParam` callback function which is passed as the property of `options` object. |
| `reset` | `function` | Clear cache and reset `data`. It will invoke `onReset` callback function passed as the property of `options` object. |


## useExperimentalInfiniteScrollQuery
**Parameters**

- `queryKey` - same as `useInfiniteQuery`
- `fetcher` - same as `useInfiniteQuery`
- `containerRef` - ref created with `useRef` that is passed as the `ref` prop to the element.

```jsx
const containeRef = useRef(null);
const queryInstance = useExperimentalInfiniteQuery(
  queryKey,
  fetcher,
  containerRef,
  options
);
//....
//....
<div ref={containerRef}> ... </div>;
```
- `options` - same as `useInfiniteQuery`. There is an extra option `offsetBottom` It can be set any value that can be converted to number. This option is useful when you want to fetch data before the scroll position reaches the bottom most part. It is used in calculation like `scrollTop + offsetBottom`.

**Return Value**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `array` | an array of array that represent pages |
| `hasNextPage` | `boolean` |Indicating whether the data for the next page exists. |
| `isLoading` | `boolean` | Indicating whether the data is being fetched. `true` for only first time network request. But if you have disabled `keepValueOnKeyChanges`, this will be set to true if there is no cache for new `queryKey`.|
| `isFetching` | `boolean` |Indicating whether the data is being fetched. This will always be `true` on every network requests. |
| `isFetchingNextPage` | `boolean` | Indicating whether the data for the next page is being fetched.|
| `reset` | `function` |Clear cache and reset `data`. It will invoke `onReset` callback function passed as the property of `options` object. |
| `fetchPage` | `function` |Fetch specific page. It accepts one argument that will be passed as the `pageParam` property of `param` object which is the property of `context` object received in`fetcher` function.<br /><br />If you invoke `fetchPage` function like this: <br/> `fetchPage(2);`<br/><br/> Your fetcher function will received it via `pageParam` property : <br/> `const fetcher = ({param: { pageParam }) => {}` |


## useQueryMagic

**No parameters**

<br/>

**Return**

| Function| Parameter| Description |
| --- | --- | --- |
| `setQueryData` | (`queryKey`, `querySetter` ) | Can be used to synchronize data across multiple Hooks with the same `queryKey`. <br />`querySetter` can be of any type. If it is a function, that function will be invoked with the data from cache as argument and its return value will be used to set new data for all Hooks with the same `queryKey`. If is not a function, its value will be used like a returned value of the function. |
| `setQueriesData` | (`dataQueries`) | Can be used to synchronize multiple data with just one function. <br /> `dataQueries` is an array of `dataQuery` objects in which must contain `queryKey`and `querySetter` properties just like the argument of `setQueryData` function.|
| `getQueryData` | (`queryKey`) | Can be used to get data from cache with the same `queryKey`. |
| `getQueriesData` | (`queryKeys`) | Get more than one data according to the order list of `queryKeys`. <br /> `queryKeys` is an array of `queryKey`.|
| `cancelQuery` | (`queryKey`) | Cancel ongoing network request with the same `queryKey`. It is an `async` function. |
| `clearCacheData` | (`queryKey`) | Remove cache data associated with your `queryKey`. |
| `clearAllCachesData` | ( ) | Clear all cache data. |
| `invalidateQuery` | (`queryKey`) | Invalidate the data from cache, i.e the new network request will be initiated if there is no already ongoing network request associated with same `queryKey`. Whether or not network request is initiated within the Hook, its status will be updated. such as `isFetching`: `true`. |
| `invalidateQueries` | (`queryKeys`) | Invalidate all data associated with each `queryKey` of `queryKeys` array. |