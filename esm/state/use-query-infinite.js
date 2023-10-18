import { useEffect, useRef, useState } from "react";
import { useQuery } from "./use-query";
import { useQueryMagic } from "./use-query-magic";
import { cacheData, clearCache, stateInitializer } from "./utils";
import { useQueryContext } from "./provider";
/**
 * Fetch data infinitely. Unlike other Hooks, will not synchronize data across multiple Hooks with the same queryKey
 * @param {*} queryKey to help keep the query in queue and cache
 * @param {function} fetcher function to fetch the data
 * @param {*} options to override the functionalities
 * @returns infiniteDataQuery instance
 */
export const useInfiniteQuery = (queryKey, fetcher, options) => {
    if (!queryKey) {
        throw new TypeError("Provided queryKey as any type except types that don't have toString method, especially falsy value");
    }
    if (typeof options !== "object")
        throw new TypeError("Please provide 'options' as an object!");
    if (typeof fetcher !== "function")
        throw new TypeError("Provide fetcher as a function!");
    const { options: defaultOptions } = useQueryContext();
    const cacheKey = [queryKey, "infinite"];
    const [data, setData] = useState(stateInitializer({
        key: cacheKey,
        cacheTime: options.cacheTime ?? defaultOptions.cacheTime,
        keepCacheAlways: options.keepCacheAlways ?? defaultOptions.keepCacheAlways,
    }) || []);
    const [status, setStatus] = useState(() => ({
        isLoading: false,
        isFetchingNextPage: false,
        isFetchingPreviousPage: false,
        hasNextPage: false,
        hasPreviousPage: false,
    }));
    const [error, setError] = useState(null);
    const hasNext = (nextPageParam) => {
        return (nextPageParam !== undefined &&
            nextPageParam !== null &&
            !Number.isNaN(nextPageParam));
    };
    const hasPrev = (prevPageParam) => {
        return (prevPageParam !== undefined &&
            prevPageParam !== null &&
            Number.isNaN(prevPageParam));
    };
    const setNecessaryStatus = (data) => {
        const nextPageParam = getNextPageParam && getNextPageParam(data[data.length - 1], data);
        const prevPageParam = getPrevPageParam && getPrevPageParam(data[0], data);
        // console.log({ nextPageParam, prevPageParam });
        setStatus({
            isLoading: false,
            isFetchingNextPage: false,
            isFetchingPreviousPage: false,
            hasNextPage: hasNext(nextPageParam),
            hasPreviousPage: hasPrev(prevPageParam),
        });
    };
    const filteredOptions = {
        ...options,
        autoFetchEnabled: false,
        refetchOnWindowFocus: false,
        onSuccess: (d) => {
            clearCache(queryKey);
            const newData = Array.from(data);
            newData.push(d);
            setData(newData);
            setNecessaryStatus(newData);
            cacheData({
                key: cacheKey,
                data: newData,
            });
            if (typeof options.onSuccess === "function") {
                options.onSuccess(newData);
            }
        },
        onError: (err) => {
            setError(err);
            setNecessaryStatus(data);
            if (typeof options.onError === "function") {
                options.onError(err);
            }
        },
        onMutated: (d) => {
            clearCache(queryKey);
            const newData = Array.from(data);
            newData.push(d);
            setData(newData);
            setNecessaryStatus(newData);
            cacheData({
                key: cacheKey,
                data: newData,
            });
            if (typeof options.onMutated === "function") {
                options.onMutated(newData);
            }
        },
    };
    const { getNextPageParam, getPrevPageParam, onReset, ...otherOptions } = filteredOptions;
    const { isFetching, isError, isSuccess, refetch } = useQuery(queryKey, fetcher, otherOptions);
    const queryMagic = useQueryMagic();
    if (getNextPageParam && typeof getNextPageParam !== "function")
        throw new TypeError("Please provide getNextPageParam as a function");
    if (getPrevPageParam && typeof getPrevPageParam !== "function")
        throw new TypeError("Please provide getPrevPageParam as a function");
    /**
     *Manually fetch data using pageParam
     * @param {*} pageParam
     */
    const fetchPage = (pageParam) => {
        refetch({ pageParam });
    };
    /**
     * Fetch next page.
     */
    const fetchNextPage = () => {
        if (!getNextPageParam) {
            throw new Error("Please provide getNextPageParam function to fetch the next page");
        }
        const nextPageParam = getNextPageParam(data[data.length - 1], data);
        // console.log({ nextPageParam });
        if (hasNext(nextPageParam)) {
            // console.log("fetching");
            refetch({ pageParam: nextPageParam });
            setStatus((s) => ({
                ...s,
                isLoading: data.length === 0,
                isFetchingNextPage: true,
            }));
        }
    };
    /**
     * Fetch previous page. This function is not stable yet
     */
    const fetchPrevPage = () => {
        if (!getPrevPageParam) {
            throw new Error("Please provide getPrevPageParam function to fetch the next page");
        }
        const prevPageParam = getPrevPageParam(data[0], data);
        if (hasPrev(prevPageParam)) {
            refetch({ pageParam: prevPageParam });
            setStatus((s) => ({
                ...s,
                isLoading: data.length === 0,
                isFetchingPreviousPage: true,
            }));
        }
    };
    /**
     * Clear cache and reset data
     */
    const reset = () => {
        clearCache(cacheKey);
        clearCache(queryKey);
        setData([]);
        setStatus((s) => ({
            ...s,
            isFetchingNextPage: false,
            isFetchingPreviousPage: false,
            isLoading: false,
        }));
        queryMagic.invalidateQuery(queryKey);
        typeof onReset === "function" && onReset(fetchPage);
    };
    const initialCall = useRef(true);
    useEffect(() => {
        if (data.length === 0 && initialCall.current) {
            // console.log("initial call");
            fetchNextPage();
            initialCall.current = false;
        }
    });
    return Object.freeze({
        data,
        error,
        ...{
            ...status,
            hasNextPage: status.hasNextPage ||
                !!(getNextPageParam &&
                    hasNext(getNextPageParam(data[data.length - 1], data))),
            hasPreviousPage: status.hasPreviousPage ||
                (getPrevPageParam && hasPrev(getPrevPageParam(data[0], data))),
        },
        isError,
        isFetching,
        isSuccess,
        fetchPage,
        fetchNextPage,
        fetchPrevPage,
        reset,
    });
};
