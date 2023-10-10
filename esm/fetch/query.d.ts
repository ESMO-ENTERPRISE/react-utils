import { FunctionComponent } from 'react';
import { Maybe } from './utils';
import { CreateStoresOptions, StoreKey, UseStores } from '../store';
export type QueryState<TKey extends StoreKey = StoreKey, TResponse = any, TData = TResponse, TError = unknown, TPageParam = any> = {
    /**
     * Query store key, an object that will be hashed into a string as a query store identifier.
     */
    key: TKey;
    /**
     * Query store key hash, a string used as a query store identifier.
     */
    keyHash: string;
    /**
     * Will only be called if the data is stale or empty.
     */
    fetch: () => void;
    /**
     * Will be called even if the data is still fresh (not stale).
     *
     * @returns Promise that will always get resolved.
     */
    forceFetch: () => Promise<QueryState<TKey, TResponse, TData, TError, TPageParam>>;
    /**
     * Fetch next page if has next page.
     *
     * If the data is empty, it will just fetch the first page.
     *
     * You can ignore this if your query is not an infinite query.
     *
     * @returns Promise that will always get resolved.
     */
    fetchNextPage: () => Promise<QueryState<TKey, TResponse, TData, TError, TPageParam>>;
    /**
     * Set query state (data, error, etc) to initial state.
     */
    reset: () => void;
    /**
     * Optimistic update.
     *
     * @returns function to revert the changes & function to invalidate the query
     *
     * IMPORTANT NOTE: This won't work well on infinite query.
     */
    optimisticUpdate: (response: TResponse | ((prevState: QueryState<TKey, TResponse, TData, TError, TPageParam>) => TResponse)) => {
        revert: () => void;
        invalidate: () => void;
    };
    /**
     * Network fetching status.
     */
    isWaiting: boolean;
    /**
     * Network fetching status for fetching next page.
     */
    isWaitingNextPage: boolean;
    isRefetching: boolean;
    isRefetchError: boolean;
    /**
     * Will be `true` if the response/data comes from the previous query key.
     *
     * @see `keepPreviousData` option
     */
    isPreviousData: boolean;
    isOptimisticData: boolean;
    error: TError | undefined;
    errorUpdatedAt: number | undefined;
    retryCount: number;
    isGoingToRetry: boolean;
    pageParam: Maybe<TPageParam>;
    pageParams: Maybe<TPageParam>[];
    hasNextPage: boolean;
    retryNextPageCount: number;
    isGoingToRetryNextPage: boolean;
} & ({
    /**
     * Status of the data.
     *
     * `"loading"` = no data.
     *
     * `"success"` = has data.
     *
     * `"error"` = has error and no data.
     *
     * It has no relation with network fetching state.
     * If you're looking for network fetching state, use `isWaiting` instead.
     *
     */
    status: 'loading';
    /**
     * Data state, will be `true` if the query has no data.
     *
     * It has no relation with network fetching state.
     * If you're looking for network fetching state, use `isWaiting` instead.
     *
     */
    isLoading: true;
    /**
     * Data state, will be `true` if the query has a data.
     *
     */
    isSuccess: false;
    /**
     * Error state, will be `true` if the query has no data but has an error.
     *
     * This will only happened if an error occured after first fetch.
     *
     * If data fetched successfully but then an error occured, `isError` will be `false` but `isRefetchError` will be `true`.
     *
     */
    isError: false;
    data: undefined;
    response: undefined;
    responseUpdatedAt: undefined;
} | {
    status: 'success';
    isLoading: false;
    isSuccess: true;
    isError: false;
    data: TData;
    response: TResponse;
    responseUpdatedAt: number | undefined;
} | {
    status: 'error';
    isLoading: false;
    isSuccess: false;
    isError: true;
    data: undefined;
    response: undefined;
    responseUpdatedAt: undefined;
});
export type CreateQueryOptions<TKey extends StoreKey = StoreKey, TResponse = any, TData = TResponse, TError = unknown, TPageParam = any> = CreateStoresOptions<TKey, QueryState<TKey, TResponse, TData, TError, TPageParam>> & {
    select?: (response: TResponse, state: Pick<QueryState<TKey, TResponse, TData, TError, TPageParam>, 'data' | 'key'>) => TData;
    /**
     * Stale time in miliseconds.
     *
     * Defaults to `3000` (3 seconds).
     */
    staleTime?: number;
    /**
     * Auto call the query when the component is mounted.
     *
     * Defaults to `true`.
     *
     * - If set to `true`, the query will be called on mount focus **if the data is stale**.
     * - If set to `false`, the query won't be called on mount focus.
     * - If set to `"always"`, the query will be called on mount focus.
     */
    fetchOnMount?: boolean | 'always' | ((key: TKey) => boolean | 'always');
    /**
     * Defaults to follow the value of `fetchOnMount`.
     *
     * `fetchOnMount` and `fetchOnWindowFocus` can be set to different values.
     * However, if `fetchOnWindowFocus` is not explicitly set, it will mimic the value of `fetchOnMount`.
     *
     * - If set to `true`, the query will be called on window focus **if the data is stale**.
     * - If set to `false`, the query won't be called on window focus.
     * - If set to `"always"`, the query will be called on window focus.
     */
    fetchOnWindowFocus?: boolean | 'always' | ((key: TKey) => boolean | 'always');
    /**
     * Defaults to follow the value of `fetchOnMount`.
     *
     * `fetchOnMount` and `fetchOnReconnect` can be set to different values.
     * However, if `fetchOnReconnect` is not explicitly set, it will mimic the value of `fetchOnMount`.
     *
     * - If set to `true`, the query will be called on window focus **if the data is stale**.
     * - If set to `false`, the query won't be called on window focus.
     * - If set to `"always"`, the query will be called on window focus.
     */
    fetchOnReconnect?: boolean | 'always' | ((key: TKey) => boolean | 'always');
    /**
     * If set to `false` or return `false`, the query won't be called in any condition.
     * Auto fetch on mount will be disabled.
     * Manually trigger `fetch` method (returned from `createQuery`) won't work too.
     *
     * Defaults to `true`.
     */
    enabled?: boolean | ((key: TKey) => boolean);
    /**
     * Number of maximum error retries.
     *
     * Defaults to `1`.
     */
    retry?: number | ((error: TError, prevState: QueryState<TKey, TResponse, TData, TError, TPageParam>) => number);
    /**
     * Error retry delay in miliseconds.
     *
     * Defaults to `2000` (2 seconds).
     */
    retryDelay?: number | ((error: TError, prevState: QueryState<TKey, TResponse, TData, TError, TPageParam>) => number);
    /**
     * Used for lagged query.
     *
     * If set to `true`, then:
     * when the query key changed and there is no `data` in the next query key cache,
     * the previous query key cache `data` will be used while fetching new data.
     */
    keepPreviousData?: boolean;
    /**
     * Only set this if you have an infinite query.
     *
     * This function should return a variable that will be stored as `pageParam` that can be used when fetching next page.
     */
    getNextPageParam?: (lastPage: TResponse, index: number, stateBeforeCallQuery: QueryState<TKey, TResponse, TData, TError, TPageParam>) => Maybe<TPageParam>;
    onSuccess?: (response: TResponse, stateBeforeCallQuery: QueryState<TKey, TResponse, TData, TError, TPageParam>) => void;
    onError?: (error: TError, stateBeforeCallQuery: QueryState<TKey, TResponse, TData, TError, TPageParam>) => void;
    onSettled?: (stateBeforeCallQuery: QueryState<TKey, TResponse, TData, TError, TPageParam>) => void;
    /**
     * Cache time in miliseconds.
     *
     * When a query becomes inactive (no longer have subscribers), it will be reset after this duration,
     * and the cache data will be garbage collected.
     *
     * Set it to `Infinity` to disable garbage collection.
     *
     * Defaults to `5 * 60 * 1000` (5 minutes).
     */
    cacheTime?: number;
    /**
     * Polling interval in milliseconds.
     *
     * Disabled by default.
     *
     * If last data fetching is failed, the polling interval will be disabled, and it will use `retry` mechanism instead.
     *
     */
    refetchInterval?: number | false | ((state: QueryState<TKey, TResponse, TData, TError, TPageParam>) => number | false);
};
export type UseQuery<TKey extends StoreKey = StoreKey, TResponse = any, TData = TResponse, TError = unknown, TPageParam = any> = UseStores<TKey, QueryState<TKey, TResponse, TData, TError, TPageParam>> & {
    /**
     * Set query's initial response.
     *
     * This is used for server-side rendered page or static page.
     *
     * IMPORTANT NOTE: Put this on the root component or parent component, before any component subscribed!
     */
    setInitialResponse: (options: {
        key?: Maybe<TKey>;
        response: TResponse;
        skipRevalidation?: boolean;
    }) => void;
    /**
     * Set query state (data, error, etc) to initial state.
     */
    reset: () => void;
    /**
     * Set query state (data, error, etc) to initial state.
     */
    resetSpecificKey: (key?: Maybe<TKey>) => void;
    /**
     * Invalidate query means marking a query as stale, and will refetch only if the query is active (has subscriber)
     */
    invalidate: () => void;
    /**
     * Invalidate query means marking a query as stale, and will refetch only if the query is active (has subscriber)
     */
    invalidateSpecificKey: (key?: Maybe<TKey>) => void;
    /**
     * Optimistic update.
     *
     * @returns function to revert the changes & function to invalidate the query
     *
     * IMPORTANT NOTE: This won't work well on infinite query.
     */
    optimisticUpdate: (options: {
        key?: Maybe<TKey>;
        response: TResponse | ((prevState: QueryState<TKey, TResponse, TData, TError, TPageParam>) => TResponse);
    }) => {
        revert: () => void;
        invalidate: () => void;
    };
    /**
     * Use query with suspense mode.
     */
    suspend: (key?: Maybe<TKey>) => Extract<QueryState<TKey, TResponse, TData, TError, TPageParam>, {
        status: 'success';
    }>;
    Render: (props: {
        queryKey?: Maybe<TKey>;
        loading?: FunctionComponent<TKey>;
        success?: FunctionComponent<TKey>;
        error?: FunctionComponent<TKey>;
    }) => JSX.Element;
};
export declare const createQuery: <TKey extends StoreKey = StoreKey, TResponse = any, TData = TResponse, TError = unknown, TPageParam = any>(queryFn: (key: TKey, state: QueryState<TKey, TResponse, TData, TError, TPageParam>) => Promise<TResponse>, options?: CreateQueryOptions<TKey, TResponse, TData, TError, TPageParam>) => UseQuery<TKey, TResponse, TData, TError, TPageParam>;
