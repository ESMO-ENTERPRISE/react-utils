import { DataQueryKeyType } from "./types";
export type QuerySetterType = (prevData: any) => void | any;
export { DataQueryKeyType };
/**
 * Controls cache and network requests
 * @returns {Object} queryMagic instance
 */
export declare const useQueryMagic: () => Readonly<{
    setQueryData: (queryKey: DataQueryKeyType, querySetter: QuerySetterType) => void;
    setQueriesData: (dataQueries: {
        queryKey: DataQueryKeyType;
        querySetter: QuerySetterType;
    }[]) => void;
    getQueryData: (queryKey: DataQueryKeyType) => any;
    getQueriesData: (queryKeys: DataQueryKeyType[]) => any[];
    cancelQuery: (queryKey: DataQueryKeyType) => Promise<void>;
    clearAllCachesData: () => void;
    clearCacheData: (queryKey: DataQueryKeyType) => void;
    invalidateQuery: (queryKey: DataQueryKeyType) => void;
    invalidateQueries: (queryKeys: DataQueryKeyType[]) => void;
}>;
