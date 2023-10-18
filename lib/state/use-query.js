"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
const react_1 = require("react");
const utils_1 = require("./utils");
const provider_1 = require("./provider");
const statuses = utils_1.status;
/**
 *
 * Utility Hook to make developer's life easier. This Hook will help you in fetching data and keep you away from handling caches. You don't need to implement imperative stuffs, just focus on business logic.
 *
 * @param {*} queryKey to help keep the query in queue and cache
 * @param {FetcherType} fetcher function to fetch the data
 * @param {*} options to override the functionalities
 * @returns data query instance
 */
const useQuery = (queryKey, fetcher, options = {}) => {
    if (typeof options !== "object")
        throw new TypeError("Please provide 'options' as an object!");
    const queryKeyString = queryKey.toString();
    const hookID = (0, react_1.useMemo)(utils_1.getRandomID, []);
    const { options: defaultOptions, notifyQueryChanges } = (0, provider_1.useQueryContext)();
    const { initialData = null, staleTime = defaultOptions.staleTime, cacheTime = defaultOptions.cacheTime, keepCacheAlways = defaultOptions.keepCacheAlways, keepValueOnKeyChanges = defaultOptions.keepValueOnKeyChanges, dataStayInSync = defaultOptions.dataStayInSync, autoFetchEnabled = defaultOptions.autoFetchEnabled, refetchOnWindowFocus = defaultOptions.refetchOnWindowFocus, markUpdatesAsTransitions = defaultOptions.markUpdatesAsTransitions, onSuccess = null, onError = null, onSettled = null, onMutated = null, } = options;
    if (typeof staleTime !== "number")
        throw new TypeError("Please provide staleTime as number type");
    if (typeof cacheTime !== "number")
        throw new TypeError("Please provide cacheTime as number type");
    if (typeof keepCacheAlways !== "boolean")
        throw new TypeError("Please provide keepCacheAlways as boolean type");
    if (typeof keepValueOnKeyChanges !== "boolean")
        throw new TypeError("Please provide keepValueOnKeyChanges as boolean type");
    if (typeof dataStayInSync !== "boolean")
        throw new TypeError("Please provide dataStayInSync as boolean type");
    if (typeof autoFetchEnabled !== "boolean")
        throw new TypeError("Please provide autoFetchEnabled as boolean type");
    if (typeof refetchOnWindowFocus !== "boolean")
        throw new TypeError("Please provide refetchOnWindowFocus as boolean type");
    if (typeof markUpdatesAsTransitions !== "boolean")
        throw new TypeError("Please provide markUpdatesAsTransitions as boolean type");
    const [data, setData] = (0, react_1.useState)(() => {
        const initialState = (0, utils_1.stateInitializer)({
            key: queryKeyString,
            cacheTime,
            keepCacheAlways,
        });
        return initialState != null ? initialState : initialData;
    });
    const [error, setError] = (0, react_1.useState)("");
    const initialStatus = {
        isFetching: autoFetchEnabled,
        isLoading: autoFetchEnabled && !data,
        isSuccess: false,
        isInvalidating: false,
        isError: false,
        isStale: false,
    };
    const [status, setStatus] = (0, react_1.useState)(initialStatus);
    // I know this breaks the rule. When we read reactive values, we need to put them in dependencies list.
    const memoizedOnSuccess = (0, react_1.useCallback)(onSuccess, [
        status,
    ]);
    const memoizedOnError = (0, react_1.useCallback)(onError, [status]);
    const memoizedOnSettled = (0, react_1.useCallback)(onSettled, [
        status,
    ]);
    const memoizedOnMutated = (0, react_1.useCallback)(onMutated, [
        status,
    ]);
    const metadata = (0, react_1.useRef)({
        isInitialCall: true,
        beforeStaleTime: Date.now(),
        staleTimeOutId: undefined,
        prevKey: queryKeyString,
        previouslyEnabledAutoFetch: autoFetchEnabled,
    });
    const operation = (0, react_1.useRef)((0, utils_1.getRaceHelper)(queryKeyString));
    const { isStale, isFetching, isInvalidating } = status;
    /**
     * Will be registered as a callback to notify cancellation. Cancel ongoing network request. Set all status to false
     */
    const onCancelQuery = (0, react_1.useCallback)(() => {
        if (isFetching) {
            setStatus({
                isLoading: false,
                isFetching: false,
                isSuccess: false,
                isInvalidating: false,
                isStale: false,
                isError: false,
            });
        }
        operation.current.cancelOperation();
    }, [isFetching]);
    /**
     *Will be registered as a callback to notify invalidation. Invalidate the data query i.e trigger new network request to get fresh data. When there is already ongoing network request, will wait for it.
     */
    const onInvalidate = (0, react_1.useCallback)(() => {
        const newStatus = {
            isLoading: false,
            isFetching: true,
            isSuccess: false,
            isInvalidating: true,
            isStale: false,
            isError: false,
        };
        if (markUpdatesAsTransitions) {
            // console.log("mark as transition");
            (0, react_1.startTransition)(() => {
                setStatus(newStatus);
                setError("");
            });
        }
        else {
            setStatus(newStatus);
            setError("");
        }
    }, [markUpdatesAsTransitions]);
    /**
     * Will be registered as a callback to notify query changes. When the new data receive due to network request or mutation, will be notified.
     */
    const onQueryChanges = (0, react_1.useCallback)((resData, status, reason) => {
        const isInitialCall = metadata.current.isInitialCall;
        if (isInitialCall) {
            metadata.current.isInitialCall = false;
        }
        // isStale1 is used to determine whether it's stale or not when the data was changed with same key
        const isStale1 = (0, utils_1.staleTimeElapsed)(staleTime, metadata.current.beforeStaleTime);
        if (isFetching || // If I don't put this, the new data will not received whenever the query key changed or refetch
            ((isStale || isStale1) && dataStayInSync) ||
            isInitialCall ||
            status === statuses.mutate) {
            // console.log("running callback");
            if (status === statuses.mutate) {
                if (markUpdatesAsTransitions) {
                    (0, react_1.startTransition)(() => {
                        setError("");
                        setData(resData);
                    });
                }
                else {
                    setError("");
                    setData(resData);
                }
                typeof memoizedOnMutated === "function" && memoizedOnMutated(resData);
            }
            else if (status === statuses.success) {
                const newStatus = {
                    isLoading: false,
                    isFetching: false,
                    isSuccess: true,
                    isInvalidating: false,
                    isStale: false,
                    isError: false,
                };
                if (markUpdatesAsTransitions) {
                    (0, react_1.startTransition)(() => {
                        setStatus(newStatus);
                        setError("");
                        setData(resData);
                    });
                }
                else {
                    setStatus(newStatus);
                    setError("");
                    setData(resData);
                }
                typeof memoizedOnSuccess === "function" && memoizedOnSuccess(resData);
                typeof memoizedOnSettled === "function" &&
                    memoizedOnSettled(resData, reason);
            }
            else if (status === statuses.fail) {
                // When network request fails, if the user is doing computative intensive task, will block the user from interacting
                setStatus({
                    isStale: isStale1 || isStale,
                    isLoading: false,
                    isSuccess: false,
                    isFetching: false,
                    isInvalidating: false,
                    isError: true,
                });
                setError(reason);
                typeof memoizedOnError === "function" && memoizedOnError(reason);
                typeof memoizedOnSettled === "function" &&
                    memoizedOnSettled(resData, reason);
                return;
            }
            // When we get fresh data, we need to reset beforeStaleTime
            metadata.current.beforeStaleTime = Date.now();
        }
    }, [
        isStale,
        dataStayInSync,
        staleTime,
        isFetching,
        markUpdatesAsTransitions,
        memoizedOnError,
        memoizedOnSuccess,
        memoizedOnSettled,
        memoizedOnMutated,
    ]);
    // subscribe changes on every queryKey changes
    (0, react_1.useEffect)(() => {
        (0, utils_1.subscribeChanges)(hookID, queryKeyString, onQueryChanges, onInvalidate, onCancelQuery);
        return () => {
            (0, utils_1.unsubscribeChanges)(hookID, queryKeyString);
        };
    }, [onQueryChanges, queryKeyString, hookID, onInvalidate, onCancelQuery]);
    /**
     * Function to initiate network request by calling user provided fetcher function
     * @param {string} queryKey
     * @param {*} params
     */
    function fetchData(queryKey, params) {
        if (!fetcher) {
            throw new Error("You need to provide fetcher function!");
        }
        clearTimeout(metadata.current.staleTimeOutId);
        if ((0, utils_1.isInOngoingRequestQueue)(queryKey))
            return;
        const requestID = (0, utils_1.getRandomID)();
        (0, utils_1.addToOngoingRequestQueue)(queryKey, requestID);
        operation.current.setActiveOperation(queryKey);
        fetcher(params)
            .then((response) => {
            // Will notify changes if this network request is still active and in ongoing queue
            // If we don't prevent this, there will be race conditions.
            if (operation.current.isActiveOperation(queryKey) &&
                (0, utils_1.isActualOngoingRequest)(queryKey, requestID)) {
                if (typeof notifyQueryChanges === "function") {
                    notifyQueryChanges({
                        queryKey: queryKey,
                        data: response,
                        status: statuses.success,
                        reason: "Network request successfully completed",
                    });
                }
                operation.current.cancelOperation();
            }
        })
            .catch((err) => {
            operation.current.cancelOperation();
            if (err.name === "AbortError") {
                console.log("Fetch aborted");
                return;
            }
            if (typeof notifyQueryChanges === "function") {
                notifyQueryChanges({
                    queryKey: queryKey,
                    data,
                    status: statuses.fail,
                    reason: err,
                });
            }
        });
    }
    /**
     * Force refetch. Will invalidate the ongoing request and restart fetching i.e if there is already ongoing request, that request will be cancelled
     * @param {*} param  provide context to fetcher function
     */
    function forceRefetch(param) {
        setStatus({
            isLoading: false,
            isFetching: true,
            isSuccess: false,
            isInvalidating: false,
            isStale: false,
            isError: false,
        });
        setError("");
        // When we need to force refetch, we need to remove from ongoing request queue
        (0, utils_1.removeFromOngoingRequestQueue)(queryKeyString);
        // Cancel previous fetch
        operation.current.cancelOperation();
        fetchData(queryKeyString, { queryKey: queryKey, param });
    }
    /**
     * Useful if you set autoFetchEnabled to false. You can manually fetch data by using this function. It won't initiate new network request if there is already one exist
     * @param {any} param Pass param object if you want to provide context to fetcher function
     */
    function refetch(param) {
        // console.log("refetch", { param });
        setStatus({
            isLoading: false,
            isFetching: true,
            isSuccess: false,
            isInvalidating: false,
            isStale: false,
            isError: false,
        });
        setError("");
        fetchData(queryKeyString, { queryKey: queryKey, param });
    }
    // Register callback that will be invoked when window gain focus after losing it
    const isWindowFocused = (0, react_1.useRef)(typeof document !== "undefined" && document.hasFocus());
    (0, react_1.useEffect)(() => {
        const handleFocus = () => {
            if (!isWindowFocused.current) {
                if (refetchOnWindowFocus) {
                    refetch();
                }
            }
            isWindowFocused.current = true;
        };
        const handleBlur = () => {
            isWindowFocused.current = false;
        };
        if (typeof window !== "undefined" && autoFetchEnabled) {
            window.addEventListener("focus", handleFocus);
            window.addEventListener("blur", handleBlur);
        }
        return () => {
            if (typeof window !== "undefined" && autoFetchEnabled) {
                window.removeEventListener("focus", handleFocus);
                window.removeEventListener("blur", handleBlur);
            }
        };
    });
    (0, react_1.useEffect)(() => {
        metadata.current.staleTimeOutId = setTimeout(() => {
            setStatus((prevStatus) => ({ ...prevStatus, isStale: true }));
        }, staleTime);
        return () => {
            clearTimeout(metadata.current.staleTimeOutId);
        };
    }, [data, error, staleTime]);
    // Effect will run on every queryKey changes
    (0, react_1.useEffect)(() => {
        // During subsequent renders not initial render, if the queryKey changed, Effect logic will run
        if (metadata.current.prevKey !== queryKeyString &&
            typeof window !== "undefined" &&
            !metadata.current.isInitialCall &&
            autoFetchEnabled // Even if the query key was changed, the new network request will not be initiated if we've disabled autoFetchEnable
        ) {
            setStatus({
                isLoading: !keepValueOnKeyChanges,
                isFetching: true,
                isSuccess: false,
                isStale: false,
                isError: false,
                isInvalidating: false,
            });
            // we need to cancel previous fetch operation, because queryKey was changed.
            // we need to start new fetch operation
            operation.current.cancelOperation();
            metadata.current.prevKey = queryKeyString;
            if (!keepValueOnKeyChanges) {
                setData((0, utils_1.stateInitializer)({
                    key: queryKeyString,
                    cacheTime,
                    keepCacheAlways,
                }));
            }
            fetchData(queryKeyString, { queryKey: (0, utils_1.getQueryKeyAsArray)(queryKeyString) });
        }
    });
    (0, react_1.useEffect)(() => {
        // Decide whether we should store initial data in cache
        // If the data is already exists in the cache, I don't want to override it.
        // But if it doesn't, cache the data and will not notify to other Hooks with the same queryKey. That means it will cache the data in silent.
        if (!(0, utils_1.stateInitializer)({
            key: queryKeyString,
            cacheTime,
            keepCacheAlways,
        }) &&
            initialData) {
            (0, utils_1.cacheData)({ key: queryKeyString, data: initialData });
        }
    }, []);
    (0, react_1.useEffect)(() => {
        const isInitialCall = metadata.current.isInitialCall;
        if (typeof window !== "undefined") {
            if (!autoFetchEnabled) {
                if (isInitialCall) {
                    metadata.current.isInitialCall = false;
                }
                metadata.current.previouslyEnabledAutoFetch = false;
            }
            if (autoFetchEnabled) {
                const previouslyEnabledAutoFetch = metadata.current.previouslyEnabledAutoFetch;
                if (isInitialCall ||
                    isInvalidating ||
                    previouslyEnabledAutoFetch === false) {
                    if (previouslyEnabledAutoFetch === false) {
                        metadata.current.previouslyEnabledAutoFetch = true;
                    }
                    fetchData(queryKeyString, { queryKey: (0, utils_1.getQueryKeyAsArray)(queryKeyString) });
                }
            }
        }
    });
    // [fetchData, queryKey, isInvalidating, autoFetchEnabled]
    return Object.freeze({
        queryKey: queryKey,
        data,
        isFetching: status.isFetching,
        isLoading: status.isLoading && !data,
        isSuccess: status.isSuccess,
        isError: status.isError,
        isStale: status.isStale,
        error,
        refetch,
        forceRefetch,
    });
};
exports.useQuery = useQuery;
