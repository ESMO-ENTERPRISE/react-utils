"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQueryContext = exports.QueryProvider = void 0;
const react_1 = require("react");
const utils_1 = require("./utils");
const defaultOptions = {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 10,
    keepCacheAlways: false,
    keepValueOnKeyChanges: true,
    dataStayInSync: true,
    autoFetchEnabled: true,
    refetchOnWindowFocus: true,
    markUpdatesAsTransitions: false,
    offsetBottom: 0, // set any value that can be converted to number. This option is useful when you want to fetch data before the scroll position reaches the bottom. Use with infinite scroll Hook.
};
const statuses = utils_1.status;
const DataQueryContext = (0, react_1.createContext)({
    options: defaultOptions,
});
const QueryProvider = ({ options = defaultOptions, children, }) => {
    const finalOptions = { ...defaultOptions, ...options };
    const { cacheTime, staleTime, keepCacheAlways, keepValueOnKeyChanges, dataStayInSync, autoFetchEnabled, refetchOnWindowFocus, markUpdatesAsTransitions, offsetBottom, } = finalOptions;
    if (typeof options !== "object")
        throw new TypeError("'options' must be an object!");
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
    if (offsetBottom < 0 || Number.isNaN(offsetBottom))
        throw new TypeError("'offsetBottom' options must be number type which is greater than or equal to zero");
    /**
     * This function will also set status state in every subscription callbacks
     */
    const notifyInvalidation = (0, react_1.useCallback)((queryKey) => {
        (0, utils_1.getInvalidationCallbacks)(queryKey.toString())?.forEach((callback) => callback());
    }, []);
    /**
     *  Cancel ongoing network request
     * @param {*} queryKey
     */
    const notifyCancellationOfQuery = (0, react_1.useCallback)((queryKey) => {
        (0, utils_1.getCancelQueryCallbacks)(queryKey.toString())?.forEach((callback) => callback());
        (0, utils_1.removeFromOngoingRequestQueue)(queryKey.toString());
    }, []);
    const notifyQueryChanges = (0, react_1.useCallback)(({ queryKey: queryKey, data, status, reason }) => {
        if (status !== statuses.fail) {
            (0, utils_1.cacheData)({
                key: queryKey.toString(),
                data,
            });
        }
        (0, utils_1.getQueryChangesCallbacks)(queryKey.toString())?.forEach((callback) => callback(data, status, reason));
        if (status !== statuses.mutate) {
            // We need to remove it from request queue when the data has arrived
            (0, utils_1.removeFromOngoingRequestQueue)(queryKey.toString());
        }
    }, []);
    const mutateQuery = (0, react_1.useCallback)((queryKey, data) => {
        notifyQueryChanges({
            queryKey: queryKey,
            data,
            status: statuses.mutate,
            reason: "Mutate",
        });
    }, [notifyQueryChanges]);
    //   return (
    //     <DataQueryContext.Provider
    //       value={{
    //         options: finalOptions,
    //         notifyQueryChanges,
    //         notifyInvalidation,
    //         notifyCancellationOfQuery,
    //         mutateQuery,
    //       }}
    //     >
    //       {children}
    //     </DataQueryContext.Provider>
    //   );
    return (0, react_1.createElement)(DataQueryContext.Provider, {
        value: {
            options: finalOptions,
            notifyQueryChanges,
            notifyInvalidation,
            notifyCancellationOfQuery,
            mutateQuery,
        }
    }, [children]);
};
exports.QueryProvider = QueryProvider;
const useQueryContext = () => (0, react_1.useContext)(DataQueryContext);
exports.useQueryContext = useQueryContext;
