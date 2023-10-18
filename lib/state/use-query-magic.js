"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQueryMagic = void 0;
const react_1 = require("react");
const provider_1 = require("./provider");
const utils_1 = require("./utils");
/**
 * Controls cache and network requests
 * @returns {Object} queryMagic instance
 */
const useQueryMagic = () => {
    const { mutateQuery, notifyInvalidation, notifyCancellationOfQuery } = (0, provider_1.useQueryContext)();
    /**
     * When we invalidate query, the components who use Hooks with the same queryKey will initiate a new network request. Not multiple requests. But every components with the same queryKey will get isFetching and isValidating indicators as true i.e. Every components with the same queryKey will be re-rendered
     * @param {*} queryKey
     */
    const invalidateQuery = (0, react_1.useCallback)((queryKey) => {
        if (!queryKey)
            throw new TypeError("Falsy values are not allowed");
        if (notifyInvalidation) {
            notifyInvalidation(queryKey.toString());
        }
    }, [notifyInvalidation]);
    /**
     * Invalidate all data queries with the same data queries. All components in which Hooks with the same queryKeys will be re-rendered
     * @param {*} queryKeys an array of queryKey
     */
    const invalidateQueries = (0, react_1.useCallback)((queryKeys) => {
        if (!Array.isArray(queryKeys))
            throw new TypeError("Please provide an array of queryKeys!");
        for (const queryKey of queryKeys) {
            invalidateQuery(queryKey);
        }
    }, [invalidateQuery]);
    /**
     * Set data query without triggering new network request.
     *
     * @param {*} queryKey is used to set data query. Data type that don't have toString method is not allowed
     * @param {*} querySetter is used to set new data. function or any value are allowed
     */
    const setQueryData = (0, react_1.useCallback)((queryKey, querySetter) => {
        if (!queryKey)
            throw new TypeError("Don't provide falsy value as queryKey");
        let data = null;
        if (typeof querySetter === "function") {
            const cache = (0, utils_1.getFromCache)(queryKey.toString());
            let cacheObj = data;
            if (cache && cache.data) {
                cacheObj = cache.data;
            }
            data = querySetter(cacheObj);
        }
        else
            data = querySetter;
        if (mutateQuery)
            mutateQuery(queryKey.toString(), data);
    }, [mutateQuery]);
    /**
     * Set data queries without triggering new network requests.
     * @param {object} dataQueries an array of dataQuery objects in which must contain queryKey, querySetter.
     */
    const setQueriesData = (0, react_1.useCallback)((dataQueries) => {
        if (!Array.isArray(dataQueries))
            throw new TypeError("Please provide an array of dataQuery objects in which must contain queryKey and querySetter!");
        for (const dataQuery of dataQueries) {
            const { queryKey: queryKey, querySetter } = dataQuery;
            setQueryData(queryKey, querySetter);
        }
    }, [setQueryData]);
    /**
     * Retrieve data from cache
     * @param {*} queryKey
     * @returns {Object | undefined}
     */
    const getQueryData = (0, react_1.useCallback)((queryKey) => {
        if (!queryKey)
            throw new TypeError("Don't provide queryKey as falsy value!");
        let data = null;
        const cache = (0, utils_1.getFromCache)(queryKey.toString());
        if (cache && cache.data) {
            data = cache.data;
        }
        return data;
    }, []);
    /**
     * Retrieve more than one data from cache
     * @param {*} queryKeys must be an array
     * @returns {Array<Object> | Array<undefined>} array of data from the cache
     */
    const getQueriesData = (0, react_1.useCallback)((queryKeys) => {
        if (!Array.isArray(queryKeys))
            throw new TypeError("queryKeys must be an array!");
        const dataArr = [];
        for (const queryKey of queryKeys) {
            dataArr.push(getQueryData(queryKey));
        }
        return dataArr;
    }, [getQueryData]);
    /**
     * Cancel the ongoing network request
     * @param {*} queryKey
     * @returns {Promise<void>} promise which will be resolved when the function finish executing
     */
    const cancelQuery = (0, react_1.useCallback)(async (queryKey) => {
        if (!queryKey)
            throw new TypeError("Don't provide queryKey as falsy value!");
        if (notifyCancellationOfQuery)
            notifyCancellationOfQuery(queryKey.toString());
    }, [notifyCancellationOfQuery]);
    /**
     * Clear specific data from cache
     * @param {*} queryKey
     */
    const clearCacheData = (0, react_1.useCallback)((queryKey) => {
        if (!queryKey)
            throw new TypeError("Don't provide queryKey as falsy value!");
        (0, utils_1.clearCache)(queryKey.toString());
    }, []);
    /**
     * Clear all data from cache
     */
    const clearAllCachesData = (0, react_1.useCallback)(() => {
        (0, utils_1.clearAllCache)();
    }, []);
    const dataQueryMagicInstance = (0, react_1.useMemo)(() => Object.freeze({
        setQueryData,
        setQueriesData,
        getQueryData,
        getQueriesData,
        cancelQuery,
        clearAllCachesData,
        clearCacheData,
        invalidateQuery,
        invalidateQueries,
    }), [
        setQueryData,
        setQueriesData,
        invalidateQuery,
        invalidateQueries,
        getQueryData,
        getQueriesData,
        cancelQuery,
        clearAllCachesData,
        clearCacheData,
    ]);
    return dataQueryMagicInstance;
};
exports.useQueryMagic = useQueryMagic;
