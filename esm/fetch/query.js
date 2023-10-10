import { createElement, useState } from 'react';
import { getValueOrComputedValue, hasValue, identityFn, isClient, noop } from './utils';
import { createStores } from '../store';
const INITIAL_QUERY_STATE = {
    isWaiting: false,
    isWaitingNextPage: false,
    status: 'loading',
    isLoading: true,
    isSuccess: false,
    isError: false,
    isRefetching: false,
    isRefetchError: false,
    isPreviousData: false,
    isOptimisticData: false,
    data: undefined,
    response: undefined,
    responseUpdatedAt: undefined,
    error: undefined,
    errorUpdatedAt: undefined,
    retryCount: 0,
    isGoingToRetry: false,
    pageParam: undefined,
    pageParams: [undefined],
    hasNextPage: false,
    retryNextPageCount: 0,
    isGoingToRetryNextPage: false,
};
const useQueryDefaultDeps = (state) => [
    state.data,
    state.error,
    state.isWaitingNextPage,
    state.hasNextPage,
];
// create Query
export const createQuery = (queryFn, options = {}) => {
    const defaultFetchOnWindowFocus = options.fetchOnMount ?? true;
    const defaultFetchOnReconnect = options.fetchOnMount ?? true;
    const { onFirstSubscribe = noop, onSubscribe = noop, onLastUnsubscribe = noop, onBeforeChangeKey = noop, defaultDeps = useQueryDefaultDeps, select = identityFn, staleTime = 3000, // 3 seconds
    fetchOnMount = true, fetchOnWindowFocus = defaultFetchOnWindowFocus, fetchOnReconnect = defaultFetchOnReconnect, enabled = true, retry = 1, retryDelay = 2000, // 2 seconds
    keepPreviousData, getNextPageParam = () => undefined, onSuccess = noop, onError = noop, onSettled = noop, cacheTime = 5 * 60 * 1000, refetchInterval = false, ...createStoresOptions } = options;
    const retryTimeoutId = new Map();
    const retryNextPageTimeoutId = new Map();
    const resetTimeoutId = new Map();
    const refetchIntervalTimeoutId = new Map();
    const preventReplaceResponse = new Map(); // Prevent optimistic data to be replaced
    const useQuery = createStores(({ get, set, key: _key, keyHash }) => {
        const key = _key;
        const getRetryProps = (error, retryCount) => {
            const prevState = get();
            const maxRetryCount = getValueOrComputedValue(retry, error, prevState) || 0;
            const delay = getValueOrComputedValue(retryDelay, error, prevState) || 0;
            return { shouldRetry: retryCount < maxRetryCount, delay };
        };
        const forceFetch = () => new Promise((resolve) => {
            const state = get();
            const { isWaiting, isLoading, pageParams } = state;
            const responseAllPages = [];
            const newPageParams = [pageParams[0]];
            let pageParam = pageParams[0];
            clearTimeout(refetchIntervalTimeoutId.get(keyHash));
            if (isWaiting || !getValueOrComputedValue(enabled, key))
                return resolve(state);
            if (isLoading)
                set({ isWaiting: true });
            else
                set({ isWaiting: true, isRefetching: true });
            const callQuery = () => {
                if (get().isGoingToRetry) {
                    if (isLoading)
                        set({ isGoingToRetry: false, isWaiting: true });
                    else
                        set({ isGoingToRetry: false, isWaiting: true, isRefetching: true });
                    clearTimeout(retryTimeoutId.get(keyHash));
                }
                preventReplaceResponse.set(keyHash, false);
                const stateBeforeCallQuery = { ...get(), pageParam };
                queryFn(key, stateBeforeCallQuery)
                    .then((response) => {
                    if (preventReplaceResponse.get(keyHash)) {
                        set({ isWaiting: false, isRefetching: false });
                        return resolve(get());
                    }
                    responseAllPages.push(response);
                    const newPageParam = getNextPageParam(response, responseAllPages.length, stateBeforeCallQuery);
                    newPageParams.push(newPageParam);
                    if (hasValue(newPageParam) && newPageParams.length < pageParams.length) {
                        pageParam = newPageParam;
                        callQuery();
                        return;
                    }
                    const nextState = {
                        isWaiting: false,
                        status: 'success',
                        isLoading: false,
                        isSuccess: true,
                        isError: false,
                        isRefetching: false,
                        isRefetchError: false,
                        isPreviousData: false,
                        isOptimisticData: false,
                        data: responseAllPages.reduce((prev, responseCurrentPage) => {
                            return select(responseCurrentPage, { key, data: prev });
                        }, undefined),
                        response,
                        responseUpdatedAt: Date.now(),
                        error: undefined,
                        errorUpdatedAt: undefined,
                        retryCount: 0,
                        pageParam: newPageParam,
                        pageParams: newPageParams,
                        hasNextPage: hasValue(newPageParam),
                    };
                    const refetchIntervalValue = isClient && getValueOrComputedValue(refetchInterval, { ...get(), ...nextState });
                    if (refetchIntervalValue) {
                        refetchIntervalTimeoutId.set(keyHash, window.setTimeout(() => {
                            forceFetch();
                        }, refetchIntervalValue));
                    }
                    set(nextState);
                    onSuccess(response, stateBeforeCallQuery);
                })
                    .catch((error) => {
                    const prevState = get();
                    const errorUpdatedAt = Date.now();
                    const { shouldRetry, delay } = getRetryProps(error, prevState.retryCount);
                    set(prevState.isSuccess && !prevState.isPreviousData
                        ? {
                            isWaiting: false,
                            isRefetching: false,
                            isRefetchError: true,
                            data: responseAllPages.length
                                ? responseAllPages.reduce((prev, response) => {
                                    return select(response, { key, data: prev });
                                }, undefined)
                                : prevState.data,
                            error,
                            errorUpdatedAt,
                            isGoingToRetry: shouldRetry,
                            pageParam,
                            hasNextPage: hasValue(pageParam),
                        }
                        : {
                            isWaiting: false,
                            status: 'error',
                            isLoading: false,
                            isError: true,
                            data: undefined,
                            error,
                            errorUpdatedAt,
                            isGoingToRetry: shouldRetry,
                            pageParam,
                            hasNextPage: hasValue(pageParam),
                        });
                    if (shouldRetry && isClient) {
                        retryTimeoutId.set(keyHash, window.setTimeout(() => {
                            set({ retryCount: prevState.retryCount + 1 });
                            callQuery();
                        }, delay));
                    }
                    onError(error, stateBeforeCallQuery);
                })
                    .finally(() => {
                    onSettled(stateBeforeCallQuery);
                    resolve(get());
                });
            };
            callQuery();
        });
        const fetch = () => {
            const { responseUpdatedAt } = get();
            const isStale = Date.now() > (responseUpdatedAt || 0) + staleTime;
            if (!isStale)
                return;
            forceFetch();
        };
        const fetchNextPage = () => new Promise((resolve) => {
            const state = get();
            if (typeof options.getNextPageParam !== 'function') {
                console.warn('fetchNextPage with invalid getNextPageParam option');
                return resolve(state);
            }
            const { isLoading, isWaitingNextPage, data, hasNextPage, pageParam, pageParams } = state;
            if (isLoading)
                return resolve(forceFetch());
            if (isWaitingNextPage || !hasNextPage || !getValueOrComputedValue(enabled, key))
                return resolve(state);
            set({ isWaitingNextPage: true, isGoingToRetryNextPage: false });
            clearTimeout(retryNextPageTimeoutId.get(keyHash));
            const stateBeforeCallQuery = get();
            queryFn(key, { ...state, pageParam })
                .then((response) => {
                if (preventReplaceResponse.get(keyHash)) {
                    set({ isWaitingNextPage: false });
                    return resolve(get());
                }
                const newPageParam = getNextPageParam(response, pageParams.length, stateBeforeCallQuery);
                set({
                    isWaitingNextPage: false,
                    response,
                    responseUpdatedAt: Date.now(),
                    data: select(response, { key, data }),
                    pageParam: newPageParam,
                    pageParams: pageParams.concat(newPageParam),
                    hasNextPage: hasValue(newPageParam),
                });
                onSuccess(response, stateBeforeCallQuery);
            })
                .catch((error) => {
                const prevState = get();
                const { shouldRetry, delay } = getRetryProps(error, prevState.retryNextPageCount);
                set({
                    isWaitingNextPage: false,
                    isError: true,
                    error,
                    errorUpdatedAt: Date.now(),
                    isGoingToRetryNextPage: shouldRetry,
                });
                if (shouldRetry) {
                    retryNextPageTimeoutId.set(keyHash, window.setTimeout(() => {
                        set({ retryNextPageCount: prevState.retryNextPageCount + 1 });
                        fetchNextPage();
                    }, delay));
                }
                onError(error, stateBeforeCallQuery);
            })
                .finally(() => {
                onSettled(stateBeforeCallQuery);
                resolve(get());
            });
        });
        return {
            ...INITIAL_QUERY_STATE,
            key,
            keyHash,
            fetch,
            forceFetch,
            fetchNextPage,
            reset: () => {
                preventReplaceResponse.set(keyHash, true);
                clearTimeout(retryTimeoutId.get(keyHash));
                clearTimeout(retryNextPageTimeoutId.get(keyHash));
                set(INITIAL_QUERY_STATE);
            },
            optimisticUpdate: (response) => useQuery.optimisticUpdate({ key, response }),
        };
    }, (() => {
        const windowFocusHandler = () => {
            useQuery.getAllWithSubscriber().forEach((state) => {
                const result = getValueOrComputedValue(fetchOnWindowFocus, state.key);
                if (result === 'always')
                    state.forceFetch();
                else if (result)
                    state.fetch();
            });
        };
        const reconnectHandler = () => {
            useQuery.getAllWithSubscriber().forEach((state) => {
                const result = getValueOrComputedValue(fetchOnReconnect, state.key);
                if (result === 'always')
                    state.forceFetch();
                else if (result)
                    state.fetch();
            });
        };
        return {
            ...createStoresOptions,
            defaultDeps,
            onFirstSubscribe: (state) => {
                if (state.isSuccess) {
                    const refetchIntervalValue = isClient && getValueOrComputedValue(refetchInterval, state);
                    if (refetchIntervalValue) {
                        refetchIntervalTimeoutId.set(state.keyHash, window.setTimeout(() => {
                            state.forceFetch();
                        }, refetchIntervalValue));
                    }
                }
                if (isClient) {
                    if (fetchOnWindowFocus)
                        window.addEventListener('focus', windowFocusHandler);
                    if (fetchOnReconnect)
                        window.addEventListener('online', reconnectHandler);
                }
                clearTimeout(resetTimeoutId.get(state.keyHash));
                onFirstSubscribe(state);
            },
            onSubscribe: (state) => {
                const result = getValueOrComputedValue(fetchOnMount, state.key);
                if (result === 'always')
                    state.forceFetch();
                else if (result)
                    state.fetch();
                onSubscribe(state);
            },
            onLastUnsubscribe: (state) => {
                const totalSubs = useQuery.getAllWithSubscriber().length;
                if (isClient && totalSubs === 0) {
                    if (fetchOnWindowFocus)
                        window.removeEventListener('focus', windowFocusHandler);
                    if (fetchOnReconnect)
                        window.removeEventListener('online', reconnectHandler);
                }
                useQuery.set(state.key, { retryCount: 0, retryNextPageCount: 0 }, true);
                clearTimeout(retryTimeoutId.get(state.keyHash));
                clearTimeout(retryNextPageTimeoutId.get(state.keyHash));
                clearTimeout(refetchIntervalTimeoutId.get(state.keyHash));
                if (isClient && cacheTime !== Infinity) {
                    resetTimeoutId.set(state.keyHash, window.setTimeout(() => {
                        useQuery.set(state.key, INITIAL_QUERY_STATE);
                    }, cacheTime));
                }
                onLastUnsubscribe(state);
            },
            onBeforeChangeKey: (nextKey, prevKey) => {
                if (keepPreviousData) {
                    const nextData = useQuery.get(nextKey);
                    if (!nextData.data) {
                        const prevData = useQuery.get(prevKey);
                        if (prevData.data) {
                            useQuery.set(nextKey, {
                                status: 'success',
                                isLoading: false,
                                isSuccess: true,
                                isError: false,
                                data: prevData.data,
                                response: prevData.response,
                                isPreviousData: true,
                            }, true);
                        }
                    }
                }
                onBeforeChangeKey(nextKey, prevKey);
            },
        };
    })());
    useQuery.setInitialResponse = ({ key, response, skipRevalidation }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useState(() => {
            const state = useQuery.get(key);
            if (response === undefined || state.isSuccess)
                return;
            const newPageParam = getNextPageParam(response, 1, state);
            useQuery.set(key, {
                status: 'success',
                isLoading: false,
                isSuccess: true,
                isError: false,
                response,
                responseUpdatedAt: skipRevalidation ? Date.now() : undefined,
                data: select(response, { key: key, data: undefined }),
                pageParam: newPageParam,
                pageParams: [undefined, newPageParam],
                hasNextPage: hasValue(newPageParam),
            });
        });
    };
    useQuery.reset = () => {
        useQuery.getStores().forEach((store, keyHash) => {
            preventReplaceResponse.set(keyHash, true);
            clearTimeout(retryTimeoutId.get(keyHash));
            clearTimeout(retryNextPageTimeoutId.get(keyHash));
            store.set(INITIAL_QUERY_STATE);
        });
    };
    useQuery.resetSpecificKey = (key) => useQuery.get(key).reset();
    useQuery.invalidate = () => {
        useQuery.getStores().forEach((store) => {
            const { get, set, getSubscribers } = store;
            set({ responseUpdatedAt: undefined });
            if (getSubscribers().size > 0)
                get().forceFetch();
        });
    };
    useQuery.invalidateSpecificKey = (key) => {
        const { get, set, getSubscribers } = useQuery.getStore(key);
        set({ responseUpdatedAt: undefined });
        if (getSubscribers().size > 0)
            get().forceFetch();
    };
    useQuery.optimisticUpdate = ({ key, response }) => {
        const prevState = useQuery.get(key);
        const optimisticResponse = getValueOrComputedValue(response, prevState);
        useQuery.set(key, {
            isOptimisticData: true,
            response: optimisticResponse,
            data: select(optimisticResponse, { key: key, data: undefined }),
        });
        preventReplaceResponse.set(prevState.keyHash, true);
        const revert = () => {
            useQuery.set(key, {
                isOptimisticData: false,
                response: prevState.response,
                data: prevState.data,
            });
        };
        const invalidate = () => useQuery.invalidateSpecificKey(key);
        return { revert, invalidate };
    };
    useQuery.suspend = (key) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const state = useQuery(key);
        if (state.isLoading)
            throw state.forceFetch();
        if (state.isError)
            throw state.error;
        return state;
    };
    const defaultElement = () => null;
    useQuery.Render = (props) => {
        const { queryKey, loading = defaultElement, success = defaultElement, error = defaultElement, } = props;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const state = useQuery(queryKey);
        if (state.data)
            return createElement(success, state.key);
        return createElement(state.isLoading ? loading : error, state.key);
    };
    return useQuery;
};
