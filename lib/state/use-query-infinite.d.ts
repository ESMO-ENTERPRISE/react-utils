import { DataQueryKeyType, FetcherType, ReasonType, UseDataQueryOptionsType } from "./types";
export { FetcherType, ReasonType };
type DefaultFunctionsType<T> = {
    /**
     * Use to provide param for the next network request
     * @param lastPage
     * @param pages
     * @returns
     */
    getNextPageParam?: (lastPage: T, pages: T[]) => any | undefined;
    /**
     * Use to provide param for the next network request
     * @param firstPage
     * @param pages
     * @returns
     */
    getPrevPageParam?: (firstPage: T, pages: T[]) => any | undefined;
    onReset?: (fetcher: (pageParams: any) => void) => void;
};
export type InfiniteDataQueryOptionsType<T> = DefaultFunctionsType<T[] | []> & Omit<UseDataQueryOptionsType<Array<Array<T>> | []>, "autoFetchEnabled" | "refetchOnWindowFocus">;
/**
 * Fetch data infinitely. Unlike other Hooks, will not synchronize data across multiple Hooks with the same queryKey
 * @param {*} queryKey to help keep the query in queue and cache
 * @param {function} fetcher function to fetch the data
 * @param {*} options to override the functionalities
 * @returns infiniteDataQuery instance
 */
export declare const useInfiniteQuery: <T = any>(queryKey: DataQueryKeyType, fetcher: FetcherType, options: InfiniteDataQueryOptionsType<T>) => Readonly<{
    isError: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    fetchPage: (pageParam: any) => void;
    fetchNextPage: () => void;
    fetchPrevPage: () => void;
    reset: () => void;
    hasNextPage: boolean;
    hasPreviousPage: boolean | undefined;
    isLoading: boolean;
    isFetchingNextPage: boolean;
    isFetchingPreviousPage: boolean;
    data: [] | T[][];
    error: ReasonType;
}>;
