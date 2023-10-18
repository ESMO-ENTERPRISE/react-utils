"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActualOngoingRequest = exports.isInOngoingRequestQueue = exports.removeFromOngoingRequestQueue = exports.addToOngoingRequestQueue = exports.getCancelQueryCallbacks = exports.getInvalidationCallbacks = exports.getQueryChangesCallbacks = exports.unsubscribeChanges = exports.subscribeChanges = exports.subscribed = exports.clearAllCache = exports.clearCache = exports.cacheData = exports.stateInitializer = exports.getFromCache = exports.staleTimeElapsed = exports.status = exports.getRaceHelper = exports.getRandomID = exports.getQueryKeyAsArray = void 0;
const getQueryKeyAsArray = (queryKey) => {
    return queryKey.split(",");
};
exports.getQueryKeyAsArray = getQueryKeyAsArray;
const keys = "abcdEFGhHiKjkL0m214832nN";
const getRandomID = () => {
    let length = keys.length;
    let randomId = "";
    for (let i = 0; i < length; i++) {
        randomId += keys[Math.floor(Math.random() * length)];
    }
    return randomId;
};
exports.getRandomID = getRandomID;
/**
 * Utility function for avoiding race condition within single Hook
 * @param {string} initialQueryKey used to set initial value
 * @returns helper object
 */
const getRaceHelper = (initialQueryKey) => {
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
exports.getRaceHelper = getRaceHelper;
exports.status = Object.freeze({
    success: "success",
    fail: "fail",
    mutate: "mutate",
});
/**
 * Cache utils
 */
const cacheProvider = new Map();
const staleTimeElapsed = (staleTime, beforeStaleTime) => {
    // const current = Date.now();
    // const timeDifferent = current - beforeStaleTime;
    // console.log({ current, beforeStaleTime, timeDifferent, staleTime });
    return Date.now() - beforeStaleTime >= staleTime;
};
exports.staleTimeElapsed = staleTimeElapsed;
const getFromCache = (key) => {
    return cacheProvider.get(key);
};
exports.getFromCache = getFromCache;
/**
 *  Initialize state when the component mounts or when queryKey changed
 * @param {string} key is used to get data from cache
 * @returns {any | null} object, or expectType if cache doesn't exist
 */
const stateInitializer = ({ key, cacheTime, keepCacheAlways = false, }) => {
    // console.log("Initializing state...", key);
    // console.log(expectType);
    const cacheData = (0, exports.getFromCache)(key.toString());
    if (!cacheData) {
        // console.log("cache not exist for " + key.toString());
        return null;
    }
    const { cachedDateTimestamp, data } = cacheData;
    const isStale = (0, exports.staleTimeElapsed)(cacheTime, cachedDateTimestamp);
    let res = data;
    if (cacheTime !== Infinity && isStale && !keepCacheAlways) {
        res = null;
    }
    return res;
};
exports.stateInitializer = stateInitializer;
/**
 *
 * Cache data along with key so that we can retreat it later
 * @param {*} param an object in which must contain key, data and cachedDateTimestamp
 */
const cacheData = ({ key, data, }) => {
    if (!key) {
        throw new Error("Falsy values are not allowed!");
    }
    const cacheObj = { data, cachedDateTimestamp: Date.now() };
    cacheProvider.set(key.toString(), cacheObj);
};
exports.cacheData = cacheData;
const clearCache = (key) => {
    if (!key)
        throw new TypeError("Don't provide falsy value");
    cacheProvider.delete(key.toString());
};
exports.clearCache = clearCache;
const clearAllCache = () => {
    cacheProvider.clear();
};
exports.clearAllCache = clearAllCache;
const callbacks = {};
const ongoingRequestQueue = new Map();
const subscribed = (hookId, queryKey) => {
    if (!callbacks[queryKey]) {
        return false;
    }
    return !!callbacks[queryKey][hookId];
};
exports.subscribed = subscribed;
const subscribeChanges = (hookId, queryKey, onQueryChanges, onInvalidate, onCancelQuery) => {
    if (!(0, exports.subscribed)(hookId, queryKey)) {
        if (!callbacks[queryKey]) {
            callbacks[queryKey] = {};
        }
        callbacks[queryKey][hookId] = [onQueryChanges, onInvalidate, onCancelQuery];
        // console.log("subscribed", callbacks[queryKey]);
    }
};
exports.subscribeChanges = subscribeChanges;
const unsubscribeChanges = (hookId, queryKey) => {
    if (!callbacks[queryKey])
        return;
    delete callbacks[queryKey][hookId];
    // console.log("unsubscribed", callbacks[queryKey]);
    if (Object.keys(callbacks[queryKey]).length === 0) {
        delete callbacks[queryKey];
    }
};
exports.unsubscribeChanges = unsubscribeChanges;
const getCallbacks = (queryKey, index) => {
    if (!callbacks[queryKey]) {
        return null;
    }
    return Object.values(callbacks[queryKey]).map((c) => c[index]);
};
const getQueryChangesCallbacks = (queryKey) => {
    return getCallbacks(queryKey, 0);
};
exports.getQueryChangesCallbacks = getQueryChangesCallbacks;
const getInvalidationCallbacks = (queryKey) => {
    return getCallbacks(queryKey, 1);
};
exports.getInvalidationCallbacks = getInvalidationCallbacks;
const getCancelQueryCallbacks = (queryKey) => {
    return getCallbacks(queryKey, 2);
};
exports.getCancelQueryCallbacks = getCancelQueryCallbacks;
const addToOngoingRequestQueue = (queryKey, requestID) => {
    // console.log("added ongoing queue", { queryKey, requestID });
    // We need to store requestID too. Because when the user cancels query or queryKey changes, we need to check requestID inside "then" callback function of promise who initiated network request. So that there will not be race conditions
    ongoingRequestQueue.set(queryKey, requestID);
};
exports.addToOngoingRequestQueue = addToOngoingRequestQueue;
const removeFromOngoingRequestQueue = (queryKey) => {
    const removed = ongoingRequestQueue.delete(queryKey.toString());
    // console.log("remove ongoing queue", { queryKey, removed });
    return removed;
};
exports.removeFromOngoingRequestQueue = removeFromOngoingRequestQueue;
const isInOngoingRequestQueue = (queryKey) => {
    return ongoingRequestQueue.has(queryKey);
};
exports.isInOngoingRequestQueue = isInOngoingRequestQueue;
const isActualOngoingRequest = (queryKey, requestID) => {
    return (ongoingRequestQueue.has(queryKey) &&
        ongoingRequestQueue.get(queryKey) === requestID);
};
exports.isActualOngoingRequest = isActualOngoingRequest;
