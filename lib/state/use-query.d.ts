import { DataQueryKeyType, FetcherType, OnErrorFunType, OnMutatedFunType, OnSettledFunType, OnSuccessFunType, ReasonType, UseDataQueryOptionsType, Context } from "./types";
export { Context, DataQueryKeyType, FetcherType, UseDataQueryOptionsType, OnErrorFunType, OnMutatedFunType, OnSettledFunType, OnSuccessFunType, ReasonType, };
/**
 *
 * Utility Hook to make developer's life easier. This Hook will help you in fetching data and keep you away from handling caches. You don't need to implement imperative stuffs, just focus on business logic.
 *
 * @param {*} queryKey to help keep the query in queue and cache
 * @param {FetcherType} fetcher function to fetch the data
 * @param {*} options to override the functionalities
 * @returns data query instance
 */
export declare const useQuery: <T = any>(queryKey: DataQueryKeyType, fetcher: FetcherType, options?: UseDataQueryOptionsType<T>) => Readonly<{
    queryKey: DataQueryKeyType;
    data: T | null | undefined;
    isFetching: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isStale: boolean;
    error: ReasonType;
    refetch: (param?: any) => void;
    forceRefetch: (param?: any) => void;
}>;
