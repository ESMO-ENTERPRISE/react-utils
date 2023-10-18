export const getQueryKeyAsArray = (queryKey) => {
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
export const getRaceHelper = (initialQueryKey) => {
    let queryKeyInOperation = initialQueryKey;
    return {
        cancelOperation: () => {
            queryKeyInOperation = null;
        },
        setActiveOperation: (newQueryKey) => {
            queryKeyInOperation = newQueryKey;
        },
        isActiveOperation: (queryKey) => queryKey === queryKeyInOperation,
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
export const staleTimeElapsed = (staleTime, beforeStaleTime) => {
    // const current = Date.now();
    // const timeDifferent = current - beforeStaleTime;
    // console.log({ current, beforeStaleTime, timeDifferent, staleTime });
    return Date.now() - beforeStaleTime >= staleTime;
};
export const getFromCache = (key) => {
    return cacheProvider.get(key);
};
/**
 *  Initialize state when the component mounts or when queryKey changed
 * @param {string} key is used to get data from cache
 * @returns {any | null} object, or expectType if cache doesn't exist
 */
export const stateInitializer = ({ key, cacheTime, keepCacheAlways = false, }) => {
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
export const cacheData = ({ key, data, }) => {
    if (!key) {
        throw new Error("Falsy values are not allowed!");
    }
    const cacheObj = { data, cachedDateTimestamp: Date.now() };
    cacheProvider.set(key.toString(), cacheObj);
};
export const clearCache = (key) => {
    if (!key)
        throw new TypeError("Don't provide falsy value");
    cacheProvider.delete(key.toString());
};
export const clearAllCache = () => {
    cacheProvider.clear();
};
const callbacks = {};
const ongoingRequestQueue = new Map();
export const subscribed = (hookId, queryKey) => {
    if (!callbacks[queryKey]) {
        return false;
    }
    return !!callbacks[queryKey][hookId];
};
export const subscribeChanges = (hookId, queryKey, onQueryChanges, onInvalidate, onCancelQuery) => {
    if (!subscribed(hookId, queryKey)) {
        if (!callbacks[queryKey]) {
            callbacks[queryKey] = {};
        }
        callbacks[queryKey][hookId] = [onQueryChanges, onInvalidate, onCancelQuery];
        // console.log("subscribed", callbacks[queryKey]);
    }
};
export const unsubscribeChanges = (hookId, queryKey) => {
    if (!callbacks[queryKey])
        return;
    delete callbacks[queryKey][hookId];
    // console.log("unsubscribed", callbacks[queryKey]);
    if (Object.keys(callbacks[queryKey]).length === 0) {
        delete callbacks[queryKey];
    }
};
const getCallbacks = (queryKey, index) => {
    if (!callbacks[queryKey]) {
        return null;
    }
    return Object.values(callbacks[queryKey]).map((c) => c[index]);
};
export const getQueryChangesCallbacks = (queryKey) => {
    return getCallbacks(queryKey, 0);
};
export const getInvalidationCallbacks = (queryKey) => {
    return getCallbacks(queryKey, 1);
};
export const getCancelQueryCallbacks = (queryKey) => {
    return getCallbacks(queryKey, 2);
};
export const addToOngoingRequestQueue = (queryKey, requestID) => {
    // console.log("added ongoing queue", { queryKey, requestID });
    // We need to store requestID too. Because when the user cancels query or queryKey changes, we need to check requestID inside "then" callback function of promise who initiated network request. So that there will not be race conditions
    ongoingRequestQueue.set(queryKey, requestID);
};
export const removeFromOngoingRequestQueue = (queryKey) => {
    const removed = ongoingRequestQueue.delete(queryKey.toString());
    // console.log("remove ongoing queue", { queryKey, removed });
    return removed;
};
export const isInOngoingRequestQueue = (queryKey) => {
    return ongoingRequestQueue.has(queryKey);
};
export const isActualOngoingRequest = (queryKey, requestID) => {
    return (ongoingRequestQueue.has(queryKey) &&
        ongoingRequestQueue.get(queryKey) === requestID);
};
