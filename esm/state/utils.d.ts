import { DataQueryKeyType } from "./types";
export declare const getQueryKeyAsArray: (queryKey: string) => string[];
export declare const getRandomID: () => string;
/**
 * Utility function for avoiding race condition within single Hook
 * @param {string} initialQueryKey used to set initial value
 * @returns helper object
 */
export declare const getRaceHelper: (initialQueryKey?: string) => {
    cancelOperation: () => void;
    setActiveOperation: (newQueryKey: string) => void;
    isActiveOperation: (queryKey: string) => boolean;
};
export declare const status: Readonly<{
    success: "success";
    fail: "fail";
    mutate: "mutate";
}>;
export declare const staleTimeElapsed: (staleTime: number, beforeStaleTime: number) => boolean;
export declare const getFromCache: (key: string) => any;
export type StateInitializerProps = {
    key: DataQueryKeyType;
    cacheTime: number;
    keepCacheAlways?: boolean;
};
/**
 *  Initialize state when the component mounts or when queryKey changed
 * @param {string} key is used to get data from cache
 * @returns {any | null} object, or expectType if cache doesn't exist
 */
export declare const stateInitializer: ({ key, cacheTime, keepCacheAlways, }: StateInitializerProps) => any | null;
/**
 *
 * Cache data along with key so that we can retreat it later
 * @param {*} param an object in which must contain key, data and cachedDateTimestamp
 */
export declare const cacheData: ({ key, data, }: {
    key: DataQueryKeyType;
    data: any;
}) => void;
export declare const clearCache: (key: DataQueryKeyType) => void;
export declare const clearAllCache: () => void;
/**
 * Queue utils
 */
type OnInvalidateFunctionType = () => void;
type OnQueryChangesFunctionType = (data: any, status: string, reason: string | Error) => void;
type OnCancelQueryFunctionType = () => void;
export declare const subscribed: (hookId: string, queryKey: string) => boolean;
export declare const subscribeChanges: (hookId: string, queryKey: string, onQueryChanges: OnQueryChangesFunctionType, onInvalidate: OnInvalidateFunctionType, onCancelQuery: OnCancelQueryFunctionType) => void;
export declare const unsubscribeChanges: (hookId: string, queryKey: string) => void;
export declare const getQueryChangesCallbacks: (queryKey: string) => OnQueryChangesFunctionType[] | null;
export declare const getInvalidationCallbacks: (queryKey: string) => OnInvalidateFunctionType[] | null;
export declare const getCancelQueryCallbacks: (queryKey: string) => OnCancelQueryFunctionType[] | null;
export declare const addToOngoingRequestQueue: (queryKey: string, requestID: string) => void;
export declare const removeFromOngoingRequestQueue: (queryKey: string) => boolean;
export declare const isInOngoingRequestQueue: (queryKey: string) => boolean;
export declare const isActualOngoingRequest: (queryKey: string, requestID: string) => boolean;
export {};
