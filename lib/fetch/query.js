"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEsmoQuery = void 0;
const react_query_1 = require("@tanstack/react-query");
// export const useEsmoQuery = <TQueryKey extends [string, Record<string, unknown>?], TQueryFnData, TError, TData = TQueryFnData>(
//     queryKey: TQueryKey,
//     fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
//     options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
//     "queryKey" | "queryFn">
// ) => {
//     const { getToken } =  useAuth();
//     return useQuery({
//         queryKey,
//         queryFn: async () => {
//             const token = await getToken();
//             return fetcher(queryKey[1], token);
//         },
//         ...options
//     })
// }
const useEsmoQuery = (queryKey, queryFn) => (options) => {
    return (0, react_query_1.useQuery)(queryKey, queryFn, options);
};
exports.useEsmoQuery = useEsmoQuery;
