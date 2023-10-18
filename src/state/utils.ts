import { DataQueryKeyType } from "./types";

export const getQueryKeyAsArray = (queryKey: string) => {
    return queryKey.split(",");
};

const keys = "abcdEFGhHiKjkL0m214832nN";
export const getRandomID = () => {
    let length = keys.length;
    let randomId = "";
    for (let i = 0; i < length; i++) {
        randomId += keys[Math.floor(Math.random() * length)];
    }
    return randomId;
};

/**
 * Utility function for avoiding race condition within single Hook
 * @param {string} initialQueryKey used to set initial value
 * @returns helper object
 */
export const getRaceHelper = (initialQueryKey?: string) => {
    let queryKeyInOperation: string | null | undefined = initialQueryKey;
    return {
        cancelOperation: () => {
            queryKeyInOperation = null;
        },
        setActiveOperation: (newQueryKey: string) => {
            queryKeyInOperation = newQueryKey;
        },
        isActiveOperation: (queryKey: string) => queryKey === queryKeyInOperation,
    };
};

export const status = Object.freeze({
    success: "success",
    fail: "fail",
    mutate: "mutate",
});

/**
 * Cache utils
 */
const cacheProvider = new Map();

export const staleTimeElapsed = (
    staleTime: number,
    beforeStaleTime: number
) => {
    // const current = Date.now();
    // const timeDifferent = current - beforeStaleTime;
    // console.log({ current, beforeStaleTime, timeDifferent, staleTime });
    return Date.now() - beforeStaleTime >= staleTime;
};

export const getFromCache = (key: string) => {
    return cacheProvider.get(key);
};

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
export const stateInitializer = ({
    key,
    cacheTime,
    keepCacheAlways = false,
}: StateInitializerProps): any | null => {
    // console.log("Initializing state...", key);
    // console.log(expectType);
    const cacheData = getFromCache(key.toString());
    if (!cacheData) {
        // console.log("cache not exist for " + key.toString());
        return null;
    }
    const { cachedDateTimestamp, data } = cacheData;
    const isStale = staleTimeElapsed(cacheTime, cachedDateTimestamp);
    let res = data;
    if (cacheTime !== Infinity && isStale && !keepCacheAlways) {
        res = null;
    }
    return res;
};

/**
 *
 * Cache data along with key so that we can retreat it later
 * @param {*} param an object in which must contain key, data and cachedDateTimestamp
 */
export const cacheData = ({
    key,
    data,
}: {
    key: DataQueryKeyType;
    data: any;
}) => {
    if (!key) {
        throw new Error("Falsy values are not allowed!");
    }
    const cacheObj = { data, cachedDateTimestamp: Date.now() };
    cacheProvider.set(key.toString(), cacheObj);
};

export const clearCache = (key: DataQueryKeyType) => {
    if (!key) throw new TypeError("Don't provide falsy value");
    cacheProvider.delete(key.toString());
};

export const clearAllCache = () => {
    cacheProvider.clear();
};

/**
 * Queue utils
 */

type OnInvalidateFunctionType = () => void;
type OnQueryChangesFunctionType = (
    data: any,
    status: string,
    reason: string | Error
) => void;
type OnCancelQueryFunctionType = () => void;

// type CBType = {
//   [hookID: string]: [
//     onQueryChanges: OnQueryChangesFunctionType,
//     onInvalidate: OnInvalidateFunctionType,
//     onCancelQuery: OnCancelQueryFunctionType
//   ];
// };

type CallbacksType = {
    [queryKey: string]: {
        [hookID: string]: [
            onQueryChanges: OnQueryChangesFunctionType,
            onInvalidate: OnInvalidateFunctionType,
            onCancelQuery: OnCancelQueryFunctionType
        ];
    };
};

const callbacks: CallbacksType = {};
const ongoingRequestQueue = new Map();

export const subscribed = (hookId: string, queryKey: string): boolean => {
    if (!callbacks[queryKey]) {
        return false;
    }
    return !!callbacks[queryKey][hookId];
};

export const subscribeChanges = (
    hookId: string,
    queryKey: string,
    onQueryChanges: OnQueryChangesFunctionType,
    onInvalidate: OnInvalidateFunctionType,
    onCancelQuery: OnCancelQueryFunctionType
) => {
    if (!subscribed(hookId, queryKey)) {
        if (!callbacks[queryKey]) {
            callbacks[queryKey] = {};
        }
        callbacks[queryKey][hookId] = [onQueryChanges, onInvalidate, onCancelQuery];
        // console.log("subscribed", callbacks[queryKey]);
    }
};

export const unsubscribeChanges = (hookId: string, queryKey: string) => {
    if (!callbacks[queryKey]) return;

    delete callbacks[queryKey][hookId];
    // console.log("unsubscribed", callbacks[queryKey]);
    if (Object.keys(callbacks[queryKey]).length === 0) {
        delete callbacks[queryKey];
    }
};

const getCallbacks = (queryKey: string, index: number) => {
    if (!callbacks[queryKey]) {
        return null;
    }
    return Object.values(callbacks[queryKey]).map((c) => c[index]);
};

export const getQueryChangesCallbacks = (queryKey: string) => {
    return getCallbacks(queryKey, 0) as OnQueryChangesFunctionType[] | null;
};

export const getInvalidationCallbacks = (queryKey: string) => {
    return getCallbacks(queryKey, 1) as OnInvalidateFunctionType[] | null;
};

export const getCancelQueryCallbacks = (queryKey: string) => {
    return getCallbacks(queryKey, 2) as OnCancelQueryFunctionType[] | null;
};

export const addToOngoingRequestQueue = (
    queryKey: string,
    requestID: string
): void => {
    // console.log("added ongoing queue", { queryKey, requestID });
    // We need to store requestID too. Because when the user cancels query or queryKey changes, we need to check requestID inside "then" callback function of promise who initiated network request. So that there will not be race conditions
    ongoingRequestQueue.set(queryKey, requestID);
};

export const removeFromOngoingRequestQueue = (queryKey: string): boolean => {
    const removed = ongoingRequestQueue.delete(queryKey.toString());
    // console.log("remove ongoing queue", { queryKey, removed });
    return removed;
};

export const isInOngoingRequestQueue = (queryKey: string): boolean => {
    return ongoingRequestQueue.has(queryKey);
};

export const isActualOngoingRequest = (
    queryKey: string,
    requestID: string
): boolean => {
    return (
        ongoingRequestQueue.has(queryKey) &&
        ongoingRequestQueue.get(queryKey) === requestID
    );
};