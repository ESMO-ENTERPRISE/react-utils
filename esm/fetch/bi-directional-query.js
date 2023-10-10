import { hasValue } from './utils';
import { createQuery } from './query';
export const createBiDirectionQuery = (queryFn, options) => {
    const { getPrevPageParam, getNextPageParam, select, ...restOptions } = options;
    const usePrevPagesQuery = createQuery((key, state) => queryFn(key, state, 'prev'), {
        defaultDeps: (state) => [
            state.isWaiting,
            state.data,
            state.error,
            state.isWaitingNextPage,
            state.hasNextPage,
        ],
        fetchOnMount: false,
        getNextPageParam: getPrevPageParam,
        select: (response, state) => select(response, state, 'prev'),
        ...restOptions,
    });
    const useNextPagesQuery = createQuery(async (key, state) => {
        const isInitialPage = state.pageParam === undefined;
        const pQuery = usePrevPagesQuery.get(key);
        try {
            const response = await queryFn(key, state, 'next');
            if (isInitialPage) {
                const prevPageParam = getPrevPageParam(response, 1, pQuery);
                usePrevPagesQuery.set(key, (prev) => ({
                    pageParams: [prevPageParam, ...prev.pageParams.slice(1)],
                    hasNextPage: prev.isLoading ? hasValue(prevPageParam) : prev.hasNextPage,
                }));
                if (!pQuery.isLoading)
                    pQuery.forceFetch();
            }
            return response;
        }
        catch (error) {
            if (isInitialPage && !pQuery.isLoading)
                pQuery.reset();
            throw error;
        }
    }, {
        getNextPageParam: getNextPageParam,
        select: (response, state) => select(response, state, 'next'),
        ...restOptions,
    });
    const useBiDirectionQuery = (...args) => {
        const pQuery = usePrevPagesQuery(...args);
        const nQuery = useNextPagesQuery(...args);
        return {
            ...nQuery,
            data: [...(pQuery.data || []), ...(nQuery.data || [])],
            fetchPrevPage: pQuery.fetchNextPage,
            hasPrevPage: pQuery.hasNextPage,
            isWaitingPrevPage: pQuery.isWaitingNextPage || (pQuery.isLoading && pQuery.isWaiting),
        };
    };
    useBiDirectionQuery.get = () => {
        return {
            prev: usePrevPagesQuery.get(),
            next: useNextPagesQuery.get(),
        };
    };
    useBiDirectionQuery.setInitialResponse = useNextPagesQuery.setInitialResponse;
    useBiDirectionQuery.reset = () => {
        usePrevPagesQuery.reset();
        useNextPagesQuery.reset();
    };
    useBiDirectionQuery.resetSpecificKey = (key) => {
        usePrevPagesQuery.resetSpecificKey(key);
        useNextPagesQuery.resetSpecificKey(key);
    };
    useBiDirectionQuery.invalidate = useNextPagesQuery.invalidate;
    useBiDirectionQuery.invalidateSpecificKey = useNextPagesQuery.invalidateSpecificKey;
    useBiDirectionQuery.suspend = useNextPagesQuery.suspend;
    return useBiDirectionQuery;
};
