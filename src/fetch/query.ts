import { QueryFunction, QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

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

export const useEsmoQuery =
    <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
        queryKey: TQueryKey,
        queryFn: QueryFunction<TQueryFnData, TQueryKey>,
    ) => <SelectType = TData>(
        options?: Omit<UseQueryOptions<TQueryFnData, TError, SelectType, TQueryKey>, 'queryKey' | 'queryFn'>
    ) => {
            return useQuery(
                queryKey,
                queryFn,
                options
            );
        };
